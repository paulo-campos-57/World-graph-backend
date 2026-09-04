import { Name } from './../../../src/core/domain/value-objects/name';

describe('Name Value Object', () => {
  it('deve criar um nome válido com sucesso e aplicar trim e toLowerCase', () => {
    const input = ' John Doe ';
    const name = new Name(input);

    expect(name.getValue()).toBe('john doe');
  });

  it('deve aceitar um nome com exatamente 2 caracteres (limite mínimo)', () => {
    const input = ' Yz ';
    const name = new Name(input);

    expect(name.getValue()).toBe('yz');
  });

  it('deve aceitar um nome com exatamente 50 caracteres', () => {
    const input = 'a'.repeat(50);
    const name = new Name(input);

    expect(name.getValue()).toBe('a'.repeat(50));
  });

  it('deve lançar um erro ao tentar criar um nome com menos de 2 caracters', () => {
    const invalidInput = ' a ';

    expect(() => new Name(invalidInput)).toThrow(
      'O nome deve ter entre 2 e 50 caracteres',
    );
  });

  it('deve lançar um erro ao tentar criar um nome com mais de 50 caracteres', () => {
    const invalidInput = 'a'.repeat(51);

    expect(() => new Name(invalidInput)).toThrow(
      'O nome deve ter entre 2 e 50 caracteres',
    );
  });

  it('deve lançar um erro se a string for composta apenas por espaços', () => {
    const invalidInput = '      ';

    expect(() => new Name(invalidInput)).toThrow(
      'O nome deve ter entre 2 e 50 caracteres',
    );
  });
});
