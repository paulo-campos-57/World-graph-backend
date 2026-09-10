import { randomUUID } from 'node:crypto';

import { User } from '../../../domain/entities/user';
import { Bio } from '../../../domain/value-objects/bio';
import { Email } from '../../../domain/value-objects/email';
import { Name } from '../../../domain/value-objects/name';
import { NickName } from '../../../domain/value-objects/nickname';
import { Password } from '../../../domain/value-objects/password';

import { PasswordHasher } from '../ports/password-hasher';
import { IUserRepository } from '../ports/user-repository.interface';

import { CreateUserInput, CreateUserOutput } from './create-user.dto';

export class CreateUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly passwordHasher: PasswordHasher,
  ) {}

  async execute(input: CreateUserInput): Promise<CreateUserOutput> {
    const plainPassword = new Password(input.password);

    const passwordHash = await this.passwordHasher.hash(
      plainPassword.getValue(),
    );

    const user = new User({
      id: randomUUID(),
      name: new Name(input.name),
      email: new Email(input.email),
      password: new Password(passwordHash, true),
      nickname: new NickName(input.nickname),
      bio: input.bio ? new Bio(input.bio) : undefined,
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
      role: user.role,
      experienceLevel: user.experienceLevel,
      preferredSystems: user.preferedSystems,
      createdAt: user.createdAt,
    };
  }
}
