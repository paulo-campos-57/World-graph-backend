import { ExperienceLevel, UserRole } from '../../../domain/entities/user';

export interface ImageFile {
  buffer: Buffer;
  mimeType: string;
}

export interface CreateUserInput {
  name: string;
  email: string;
  password: string;
  nickname: string;
  bio?: string;
  profilePicPath?: ImageFile;
  role: UserRole;
  experienceLevel?: ExperienceLevel;
  preferredSystems?: string[];
}

export interface CreateUserOutput {
  id: string;
  name: string;
  email: string;
  nickname: string;
  bio?: string;
  profilePicPath?: string;
  role: UserRole;
  experienceLevel?: ExperienceLevel;
  preferredSystems?: string[];
  createdAt: Date;
}
