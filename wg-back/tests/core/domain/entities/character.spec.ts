import { randomUUID } from 'crypto';
import {
  Character,
  CharacterType,
  CharacterProps,
  AttributeProps,
} from '../../../../src/core/domain/entities/character';
import { Name } from '../../../../src/core/domain/value-objects/name';
import { Bio } from '../../../../src/core/domain/value-objects/bio';
import { Attribute } from '../../../../src/core/domain/value-objects/attribute';
import { HitPoints } from '../../../../src/core/domain/value-objects/hitpoints';

describe('Character Entity', () => {
  const createValidAttributes = (): AttributeProps => ({
    strengh: new Attribute(10),
    dexterity: new Attribute(14),
    constitution: new Attribute(12),
    intelligence: new Attribute(10),
    wisdom: new Attribute(13),
    charisma: new Attribute(8),
  });

  const createValidCharacterProps = (
    type: CharacterType = CharacterType.PC,
  ): CharacterProps => ({
    id: randomUUID(),
    ownerId: randomUUID(),
    name: new Name('Aragorn'),
    type,
    attributes: createValidAttributes(),
    hitPoints: new HitPoints({ max: 30, current: 30 }),
  });

  it('deve instanciar um personagem (PC) completo com sucesso', () => {
    const props: CharacterProps = {
      ...createValidCharacterProps(CharacterType.PC),
      level: 5,
      alignment: 'Leal e Bom',
      race: 'Humano',
      characterClass: 'Guardião',
      bio: new Bio('Um herdeiro do trono no norte.'),
      isPublic: true,
      createdAt: new Date('2026-01-01T00:00:00.000Z'),
    };

    const character = new Character(props);

    expect(character.id).toBe(props.id);
    expect(character.ownerId).toBe(props.ownerId);
    expect(character.name.getValue()).toBe('aragorn');
    expect(character.type).toBe(CharacterType.PC);
    expect(character.level).toBe(5);
    expect(character.alignment).toBe('Leal e Bom');
    expect(character.race).toBe('Humano');
    expect(character.characterClass).toBe('Guardião');
    expect(character.attributes.strengh.getValue()).toBe(10);
    expect(character.hitPoints.getCurrent()).toBe(30);
    expect(character.bio?.getValue()).toBe('Um herdeiro do trono no norte.');
    expect(character.isPublic).toBe(true);
    expect(character.createdAt).toEqual(props.createdAt);
  });

  it('deve aplicar os valores padrão para nível (1), público (false) e createdAt', () => {
    const props = createValidCharacterProps(CharacterType.PC);
    const beforeCreation = new Date();

    const character = new Character(props);

    expect(character.level).toBe(1);
    expect(character.isPublic).toBe(false);
    expect(character.createdAt.getTime()).toBeGreaterThanOrEqual(
      beforeCreation.getTime(),
    );
  });

  it('deve aplicar dano ao personagem e recalcular os pontos de vida imutavelmente', () => {
    const character = new Character(
      createValidCharacterProps(CharacterType.PC),
    );

    character.takeDamage(10);

    expect(character.hitPoints.getCurrent()).toBe(20);
    expect(character.hitPoints.getMax()).toBe(30);
  });

  it('não deve permitir que os pontos de vida fiquem negativos ao receber dano massivo', () => {
    const character = new Character(
      createValidCharacterProps(CharacterType.PC),
    );

    character.takeDamage(50);

    expect(character.hitPoints.getCurrent()).toBe(0);
  });

  describe('Validações de Regras por Tipo de Personagem', () => {
    it('deve lançar um erro se o nível de um PC for menor que 1 ou maior que 30', () => {
      const invalidLowProps = {
        ...createValidCharacterProps(CharacterType.PC),
        level: 0,
      };
      const invalidHighProps = {
        ...createValidCharacterProps(CharacterType.PC),
        level: 31,
      };

      expect(() => new Character(invalidLowProps)).toThrow(
        'O nível do Jogador (PC) deve estar entre 1 e 30.',
      );
      expect(() => new Character(invalidHighProps)).toThrow(
        'O nível do Jogador (PC) deve estar entre 1 e 30.',
      );
    });

    it('deve lançar um erro ao criar um MONSTER sem Challenge Rating', () => {
      const monsterProps = createValidCharacterProps(CharacterType.MONSTER);

      expect(() => new Character(monsterProps)).toThrow(
        'Monstros devem possuir um Grau de Desafio (Challenge Rating).',
      );
    });

    it('deve instanciar um MONSTER com sucesso caso possua Challenge Rating', () => {
      const monsterProps: CharacterProps = {
        ...createValidCharacterProps(CharacterType.MONSTER),
        challengeRating: 5,
      };

      const monster = new Character(monsterProps);

      expect(monster.type).toBe(CharacterType.MONSTER);
      expect(monster.challengeRating).toBe(5);
    });
  });
});
