import { ExperienceLevel, UserRole } from '../../../domain/entities/user';

export interface CreateUserInput {
  name: string;
  email: string;
  password: string;
  nickname: string;
  bio?: string;
  role: UserRole;
  experienceLevel?: ExperienceLevel;
  preferedSystems?: string[];
}

export interface CreateUserOutput {
  id: string;
  name: string;
  email: string;
  nickname: string;
  bio?: string;
  role: UserRole;
  experienceLevel?: ExperienceLevel;
  preferredSystems?: string[];
  createdAt: Date;
}
