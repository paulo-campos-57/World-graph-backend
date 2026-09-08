import { Password } from '../../../../src/core/domain/value-objects/passworrd';

describe('Password Value Object', () => {
  const ERROR_MESSAGE =
    'A senha deve ter no mínimo 8 caracteres, incluindo pelo menos uma letra, número e caracter especial';

  it('deve criar uma senha válida em texto puro com sucesso', () => {
    const validPassword = 'Password123!';
    const password = new Password(validPassword);

    expect(password.getValue()).toBe(validPassword);
  });

  it('deve permitir criar uma senha que já está em hash sem aplicar validação', () => {
    const hashedPassword =
      '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6L6532gE';
    const password = new Password(hashedPassword, true);

    expect(password.getValue()).toBe(hashedPassword);
  });

  it('deve lançar um erro se a senha tiver menos de 8 caracteres', () => {
    const shortPassword = 'Pass1!';

    expect(() => new Password(shortPassword)).toThrow(ERROR_MESSAGE);
  });

  it('deve lançar um erro se a senha não contiver nenhuma letra', () => {
    const noLetterPassword = '12345678!';

    expect(() => new Password(noLetterPassword)).toThrow(ERROR_MESSAGE);
  });

  it('deve lançar um erro se a senha não contiver nenhum número', () => {
    const noNumberPassword = 'Password!';

    expect(() => new Password(noNumberPassword)).toThrow(ERROR_MESSAGE);
  });

  it('deve lançar um erro se a senha não contiver nenhum caractere especial', () => {
    const noSpecialCharPassword = 'Password123';

    expect(() => new Password(noSpecialCharPassword)).toThrow(ERROR_MESSAGE);
  });

  it('deve aceitar diferentes tipos de caracteres especiais', () => {
    const specialChars = [
      '!',
      '@',
      '#',
      '$',
      '%',
      '^',
      '&',
      '*',
      '(',
      ')',
      '_',
      '-',
      '+',
      '=',
    ];

    specialChars.forEach((char) => {
      const passwordStr = `Senha123${char}`;
      const password = new Password(passwordStr);
      expect(password.getValue()).toBe(passwordStr);
    });
  });
});
