import { User } from '../../../domain/entities/user';
import { Email } from '../../../domain/value-objects/email';

export interface IUserRepository {
  create(user: User): Promise<boolean>;
  findByEmail(email: Email): Promise<User>;
}
