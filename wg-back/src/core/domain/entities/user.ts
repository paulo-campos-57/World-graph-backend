import { UUID } from 'crypto';
import { Name } from '../value-objects/name';
import { Email } from '../value-objects/email';
import { Password } from '../value-objects/passworrd';
import { NickName } from '../value-objects/nickname';
import { Bio } from '../value-objects/bio';

export enum UserRole {
  PLAYER = 'PLAYER',
  DUNGEON_MASTER = 'DUNGEON_MASTER',
  BOTH = 'BOTH',
}

export enum ExperienceLevel {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  VETERAN = 'VETERAN',
}

export interface UserProps {
  id: UUID;
  name: Name;
  email: Email;
  password: Password;
  nickname: NickName;
  bio?: Bio;
  role: UserRole;
  experienceLevel?: ExperienceLevel;
  preferedSystems?: string[];
  createdAt?: Date;
}

export class User {
  public readonly id: UUID;
  public name: Name;
  public email: Email;
  public password: Password;
  public nickname: NickName;
  public bio?: Bio;
  public role: UserRole;
  public experienceLevel?: ExperienceLevel;
  public preferedSystems?: string[];
  public readonly createdAt: Date;

  constructor(props: UserProps) {
    this.id = props.id;
    this.name = props.name;
    this.password = props.password;
    this.nickname = props.nickname;
    this.bio = props.bio;
    this.role = props.role;
    this.experienceLevel = props.experienceLevel;
    this.preferedSystems = props.preferedSystems;
    this.createdAt = props.createdAt || new Date();
  }
}
