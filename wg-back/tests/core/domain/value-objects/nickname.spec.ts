import { NickName } from '../../../../src/core/domain/value-objects/nickname';

describe('Nickname Value Object', () => {
  it('deve criar um nickname válido e aplicar tirm e toLowerCase', () => {
    const input = ' VALID_NICKNAME ';
    const nickname = new NickName(input);

    expect(nickname.getValue()).toBe('valid_nickname');
  });

  it('deve lançar erro quando o nickname tiver menos de dois caracteres', () => {
    const invalidInput = 'a';

    expect(() => new NickName(invalidInput)).toThrow(
      `O nickname deve conter entre 3 e 20 caracteres, ` +
        `e conter apenas letras, números, '-' ou '_'.`,
    );
  });

  it('deve lançar erro quando o nickname tiver mais de 50 caracteres', () => {
    const invalidInput = 'a'.repeat(50);

    expect(() => new NickName(invalidInput)).toThrow(
      `O nickname deve conter entre 3 e 20 caracteres, ` +
        `e conter apenas letras, números, '-' ou '_'.`,
    );
  });

  it('deve lançar erro quando houver caracteres inválidos no nickname', () => {
    const invalidInput = 'nickN@me';

    expect(() => new NickName(invalidInput)).toThrow(
      `O nickname deve conter entre 3 e 20 caracteres, ` +
        `e conter apenas letras, números, '-' ou '_'.`,
    );
  });

  it('deve lançar erro quando o nickname for apenas espaços', () => {
    const invalidInput = '    ';

    expect(() => new NickName(invalidInput)).toThrow(
      `O nickname deve conter entre 3 e 20 caracteres, ` +
        `e conter apenas letras, números, '-' ou '_'.`,
    );
  });
});
