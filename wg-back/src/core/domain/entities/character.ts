import { UUID } from 'crypto';
import { Name } from '../value-objects/name';
import { Bio } from '../value-objects/bio';
import { Attribute } from '../value-objects/attribute';
import { HitPoints } from '../value-objects/hitpoints';

export enum CharacterType {
  PC = 'PC',
  NPC = 'NPC',
  MONSTER = 'MONSTER',
}

export interface AttributeProps {
  strengh: Attribute;
  dexterity: Attribute;
  constitution: Attribute;
  intelligence: Attribute;
  wisdom: Attribute;
  charisma: Attribute;
}

export interface CharacterProps {
  id: UUID;
  ownerId: UUID;
  name: Name;
  type: CharacterType;
  level?: number;
  challengeRating?: number;
  alignment?: string;
  race?: string;
  characterClass?: string;
  attributes: AttributeProps;
  hitPoints: HitPoints;
  bio?: Bio;
  isPublic?: boolean;
  createdAt?: Date;
}

export class Character {
  public readonly id: UUID;
  public readonly ownerId: UUID;
  public name: Name;
  public type: CharacterType;
  public level: number;
  public challengeRating?: number;
  public alignment?: string;
  public race?: string;
  public characterClass?: string;
  public attributes: AttributeProps;
  public hitPoints: HitPoints;
  public bio?: Bio;
  public isPublic: boolean;
  public readonly createdAt: Date;

  constructor(props: CharacterProps) {
    this.validateTypeSpecificProps(props);

    this.id = props.id;
    this.ownerId = props.ownerId;
    this.name = props.name;
    this.type = props.type;
    this.level = props.level ?? 1;
    this.challengeRating = props.challengeRating;
    this.alignment = props.alignment;
    this.race = props.race;
    this.characterClass = props.characterClass;
    this.attributes = props.attributes;
    this.hitPoints = props.hitPoints;
    this.bio = props.bio;
    this.isPublic = props.isPublic ?? false;
    this.createdAt = props.createdAt || new Date();
  }

  /**
   * Valida regras de negócio específicas para o tipo de personagem
   * @param props
   */
  private validateTypeSpecificProps(props: CharacterProps): void {
    if (
      props.type === CharacterType.PC &&
      props.level !== undefined &&
      (props.level < 1 || props.level > 30)
    ) {
      throw new Error('O nível do Jogador (PC) deve estar entre 1 e 30.');
    }

    if (
      props.type === CharacterType.MONSTER &&
      props.challengeRating === undefined
    ) {
      throw new Error(
        'Monstros devem possuir um Grau de Desafio (Challenge Rating).',
      );
    }
  }

  public takeDamage(damageAmount: number): void {
    const newCurrentHp = Math.max(
      0,
      this.hitPoints.getCurrent() - damageAmount,
    );

    this.hitPoints = new HitPoints({
      max: this.hitPoints.getMax(),
      current: newCurrentHp,
      temporary: this.hitPoints.getTemporary(),
    });
  }
}
