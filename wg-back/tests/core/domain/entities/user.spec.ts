import { randomUUID } from 'crypto';
import {
  User,
  UserRole,
  ExperienceLevel,
  UserProps,
} from './../../../../src/core/domain/entities/user';
import { Name } from '../../../../src/core/domain/value-objects/name';
import { Email } from '../../../../src/core/domain/value-objects/email';
import { Password } from '../../../../src/core/domain/value-objects/password';
import { NickName } from '../../../../src/core/domain/value-objects/nickname';
import { Bio } from '../../../../src/core/domain/value-objects/bio';

describe('User Entity', () => {
  const createValidUserProps = (): UserProps => ({
    id: randomUUID(),
    name: new Name('John Doe'),
    email: new Email('john.doe@example.com'),
    password: new Password('Password123!'),
    nickname: new NickName('johndoe'),
    role: UserRole.PLAYER,
  });

  it('deve instanciar um usuário completo com sucesso', () => {
    const props: UserProps = {
      ...createValidUserProps(),
      bio: new Bio('Jogador experiente de D&D 5e'),
      experienceLevel: ExperienceLevel.VETERAN,
      preferedSystems: ['D&D 5e', 'Tormenta20'],
      createdAt: new Date('2026-01-01T00:00:00.000Z'),
    };

    const user = new User(props);

    expect(user.id).toBe(props.id);
    expect(user.name.getValue()).toBe('john doe');
    expect(user.email.getValue()).toBe('john.doe@example.com');
    expect(user.password.getValue()).toBe('Password123!');
    expect(user.nickname.getValue()).toBe('johndoe');
    expect(user.bio?.getValue()).toBe('Jogador experiente de D&D 5e');
    expect(user.role).toBe(UserRole.PLAYER);
    expect(user.experienceLevel).toBe(ExperienceLevel.VETERAN);
    expect(user.preferedSystems).toEqual(['D&D 5e', 'Tormenta20']);
    expect(user.createdAt).toEqual(props.createdAt);
  });

  it('deve definir a data de criação padrão (createdAt) caso não seja fornecida', () => {
    const props = createValidUserProps();
    const beforeCreation = new Date();

    const user = new User(props);

    expect(user.createdAt).toBeInstanceOf(Date);
    expect(user.createdAt.getTime()).toBeGreaterThanOrEqual(
      beforeCreation.getTime(),
    );
  });

  it('deve criar um usuário com os papéis DUNGEON_MASTER e BOTH', () => {
    const propsDm = {
      ...createValidUserProps(),
      role: UserRole.DUNGEON_MASTER,
    };
    const propsBoth = { ...createValidUserProps(), role: UserRole.BOTH };

    const dmUser = new User(propsDm);
    const bothUser = new User(propsBoth);

    expect(dmUser.role).toBe(UserRole.DUNGEON_MASTER);
    expect(bothUser.role).toBe(UserRole.BOTH);
  });

  it('deve permitir criar um usuário sem campos opcionais (bio, experienceLevel, preferedSystems)', () => {
    const props = createValidUserProps();

    const user = new User(props);

    expect(user.bio).toBeUndefined();
    expect(user.experienceLevel).toBeUndefined();
    expect(user.preferedSystems).toBeUndefined();
  });
});
