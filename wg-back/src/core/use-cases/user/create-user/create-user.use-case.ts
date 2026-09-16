import { randomUUID } from 'node:crypto';

import { User } from '../../../domain/entities/user';
import { Bio } from '../../../domain/value-objects/bio';
import { Email } from '../../../domain/value-objects/email';
import { Name } from '../../../domain/value-objects/name';
import { NickName } from '../../../domain/value-objects/nickname';
import { Password } from '../../../domain/value-objects/password';

import { IImageStorage } from '../ports/image-storage.interface';
import { PasswordHasher } from '../ports/password-hasher';
import { IUserRepository } from '../ports/user-repository.interface';

import { CreateUserInput, CreateUserOutput } from './create-user.dto';

export class CreateUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly passwordHasher: PasswordHasher,
    private readonly imageStorage: IImageStorage,
  ) {}

  async execute(input: CreateUserInput): Promise<CreateUserOutput> {
    const plainPassword = new Password(input.password);

    const passwordHash = await this.passwordHasher.hash(
      plainPassword.getValue(),
    );

    const userId = randomUUID();

    let profilePicPath: string | undefined;

    if (input.profilePicPath) {
      profilePicPath = await this.imageStorage.save({
        directory: `users/${userId}`,
        buffer: input.profilePicPath.buffer,
        mimetype: input.profilePicPath.mimeType,
      });
    }

    const user = new User({
      id: userId,
      name: new Name(input.name),
      email: new Email(input.email),
      password: new Password(passwordHash, true),
      nickname: new NickName(input.nickname),
      bio: input.bio ? new Bio(input.bio) : undefined,
      profilePicPath,
      role: input.role,
      experienceLevel: input.experienceLevel,
      preferedSystems: input.preferredSystems,
    });

    await this.userRepository.create(user);

    return {
      id: user.id,
      name: user.name.getValue(),
      email: user.email.getValue(),
      nickname: user.nickname.getValue(),
      bio: user.bio?.getValue(),
      profilePicPath: user.profilePicPath,
      role: user.role,
      experienceLevel: user.experienceLevel,
      preferredSystems: user.preferedSystems,
      createdAt: user.createdAt,
    };
  }
}
