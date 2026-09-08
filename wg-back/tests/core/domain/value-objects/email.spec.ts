import { Email } from '../../../../src/core/domain/value-objects/email';

describe('Email Value Object', () => {
  const ERROR_MESSAGE = 'Formato inválido para e-mail';

  it('deve criar um e-mail válido com sucesso e aplicar trim e toLowerCase', () => {
    const input = ' USER.TEST@EXAMPLE.COM ';
    const email = new Email(input);

    expect(email.getValue()).toBe('user.test@example.com');
  });

  it('deve aceitar e-mails com subdomínios e caracteres permitidos', () => {
    const validEmails = [
      'usuario@subdominio.dominio.com',
      'user.name+tag@domain.co.uk',
      '12345@domain.org',
    ];

    validEmails.forEach((validInput) => {
      const email = new Email(validInput);
      expect(email.getValue()).toBe(validInput.toLowerCase());
    });
  });

  it('deve lançar um erro ao tentar criar um e-mail com formato inválido', () => {
    const invalidEmails = [
      'email-sem-arroba.com',
      'usuario@',
      '@dominio.com',
      'usuario@dominio',
      'usuario@.com',
      'usuario @dominio.com',
      'usuario@ dominio.com',
    ];

    invalidEmails.forEach((invalidInput) => {
      expect(() => new Email(invalidInput)).toThrow(ERROR_MESSAGE);
    });
  });

  it('deve lançar um erro se o e-mail for uma string vazia ou conter apenas espaços', () => {
    const emptyInputs = ['', '   '];

    emptyInputs.forEach((invalidInput) => {
      expect(() => new Email(invalidInput)).toThrow(ERROR_MESSAGE);
    });
  });
});
