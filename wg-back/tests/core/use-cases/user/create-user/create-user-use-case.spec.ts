import { CreateUserUseCase } from './../../../../../src/core/use-cases/user/create-user/create-user.use-case';
import { CreateUserInput } from './../../../../../src/core/use-cases/user/create-user/create-user.dto';
import {
  UserRole,
  ExperienceLevel,
  User,
} from './../../../../../src/core/domain/entities/user';

class MockUserRepository {
  create = jest.fn();
}

class MockPasswordHasher {
  hash = jest.fn();
}

class MockImageStorage {
  save = jest.fn();
}

describe('CreateUserUseCase', () => {
  const makeValidInput = (
    overrides: Partial<CreateUserInput> = {},
  ): CreateUserInput => ({
    name: 'John',
    email: 'john@email.com',
    password: 'Password@123',
    nickname: 'john_doe',
    bio: 'Dungeon Lover',
    role: UserRole.DUNGEON_MASTER,
    experienceLevel: ExperienceLevel.INTERMEDIATE,
    preferredSystems: ['D&D 5e', 'Pathfinder'],
    ...overrides,
  });

  const makeProfilePic = () => ({
    buffer: Buffer.from('fake-image-content'),
    mimeType: 'image/png',
  });

  it('deve criar um usuário com sucesso sem imagem de perfil', async () => {
    const repository = new MockUserRepository();
    const passwordHasher = new MockPasswordHasher();
    const imageStorage = new MockImageStorage();

    const hashedPassword = 'hashed-password-123';

    passwordHasher.hash.mockResolvedValue(hashedPassword);
    repository.create.mockImplementation(async (user: User) => user);

    const sut = new CreateUserUseCase(
      repository as any,
      passwordHasher as any,
      imageStorage as any,
    );

    const input = makeValidInput();

    const result = await sut.execute(input);

    expect(passwordHasher.hash).toHaveBeenCalledTimes(1);
    expect(passwordHasher.hash).toHaveBeenCalledWith(input.password);

    expect(imageStorage.save).not.toHaveBeenCalled();

    expect(repository.create).toHaveBeenCalledTimes(1);

    const createdUser = repository.create.mock.calls[0][0] as User;

    expect(createdUser).toBeInstanceOf(User);
    expect(createdUser.id).toEqual(expect.any(String));
    expect(createdUser.password.getValue()).toBe(hashedPassword);
    expect(createdUser.name.getValue()).toBe(createdUser.name.getValue());
    expect(createdUser.email.getValue()).toBe(input.email);
    expect(createdUser.nickname.getValue()).toBe(input.nickname);
    expect(createdUser.bio?.getValue()).toBe(input.bio);
    expect(createdUser.role).toBe(input.role);
    expect(createdUser.experienceLevel).toBe(input.experienceLevel);
    expect(createdUser.preferedSystems).toEqual(input.preferredSystems);

    expect(result).toMatchObject({
      id: createdUser.id,
      name: createdUser.name.getValue(),
      email: createdUser.email.getValue(),
      nickname: createdUser.nickname.getValue(),
      bio: createdUser.bio?.getValue(),
      role: createdUser.role,
      experienceLevel: createdUser.experienceLevel,
      preferredSystems: createdUser.preferedSystems,
      createdAt: createdUser.createdAt,
    });
  });

  it('deve salvar a imagem de perfil e persistir o caminho retornado pelo storage', async () => {
    const repository = new MockUserRepository();
    const passwordHasher = new MockPasswordHasher();
    const imageStorage = new MockImageStorage();

    const hashedPassword = 'hashed-password-456';
    const profilePic = makeProfilePic();
    const savedPath = 'users/abc123/profile.png';

    passwordHasher.hash.mockResolvedValue(hashedPassword);
    imageStorage.save.mockResolvedValue(savedPath);
    repository.create.mockImplementation(async (user: User) => user);

    const sut = new CreateUserUseCase(
      repository as any,
      passwordHasher as any,
      imageStorage as any,
    );

    const input = makeValidInput({
      profilePicPath: profilePic,
    });

    const result = await sut.execute(input);

    expect(imageStorage.save).toHaveBeenCalledTimes(1);
    expect(imageStorage.save).toHaveBeenCalledWith({
      directory: expect.stringContaining('users/'),
      buffer: profilePic.buffer,
      mimetype: profilePic.mimeType,
    });

    const createdUser = repository.create.mock.calls[0][0] as User;

    expect(createdUser.profilePicPath).toBe(savedPath);
    expect(result.profilePicPath).toBe(savedPath);
    expect(result.id).toBe(createdUser.id);
  });

  it('deve lançar erro quando o repositório não conseguir criar o usuário', async () => {
    const repository = new MockUserRepository();
    const passwordHasher = new MockPasswordHasher();
    const imageStorage = new MockImageStorage();

    passwordHasher.hash.mockResolvedValue('hashed-password-789');
    repository.create.mockResolvedValue(false);

    const sut = new CreateUserUseCase(
      repository as any,
      passwordHasher as any,
      imageStorage as any,
    );

    const input = makeValidInput();

    await expect(sut.execute(input)).rejects.toThrow(
      'Não foi possível criar o usuário.',
    );
  });
});
