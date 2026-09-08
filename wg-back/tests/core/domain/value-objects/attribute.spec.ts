import { Attribute } from './../../../../src/core/domain/value-objects/attribute';

describe('Attribute Value Object', () => {
  const ERROR_MESSAGE = 'O atributo deve ser um valor entre 0 e 30';

  it('deve criar um atributo com valor válido dentro do intervalo', () => {
    const validValue = 15;
    const attribute = new Attribute(validValue);

    expect(attribute.getValue()).toBe(validValue);
  });

  it('deve aceitar 0 como limite mínimo permitido', () => {
    const minLimit = 0;
    const attribute = new Attribute(minLimit);

    expect(attribute.getValue()).toBe(minLimit);
  });

  it('deve aceitar 30 como limite máximo permitido', () => {
    const maxLimit = 30;
    const attribute = new Attribute(maxLimit);

    expect(attribute.getValue()).toBe(maxLimit);
  });

  it('deve lançar um erro para valores menores que 0', () => {
    const invalidValue = -1;

    expect(() => new Attribute(invalidValue)).toThrow(ERROR_MESSAGE);
  });

  it('deve lançar um erro para valores maiores que 30', () => {
    const invalidValue = 31;

    expect(() => new Attribute(invalidValue)).toThrow(ERROR_MESSAGE);
  });
});
