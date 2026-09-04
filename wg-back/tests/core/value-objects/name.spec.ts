import { Name } from './../../../src/core/domain/value-objects/name';

describe('Name Value Object', () => {
  it('deve criar um nome válido com sucesso e aplicar trim e toLowerCase', () => {
    const input = ' John Doe ';
    const name = new Name(input);

    expect(name.getValue()).toBe('john doe');
  });
});
