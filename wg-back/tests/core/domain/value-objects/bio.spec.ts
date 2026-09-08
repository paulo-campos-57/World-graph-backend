import { Bio } from './../../../../src/core/domain/value-objects/bio';

describe('Bio Value Object', () => {
  const ERROR_MESSAGE =
    'A bio não pode exceder o limite máximo de 2000 caracteres.';

  it('deve criar uma bio válida e aplicar o trim no texto', () => {
    const input = '  Aventureiro veterano em busca de mesas de RPG.  ';
    const bio = new Bio(input);

    expect(bio.getValue()).toBe(
      'Aventureiro veterano em busca de mesas de RPG.',
    );
    expect(bio.isEmpty()).toBe(false);
  });

  it('deve criar uma bio vazia caso nenhum valor seja fornecido', () => {
    const bio = new Bio();

    expect(bio.getValue()).toBe('');
    expect(bio.isEmpty()).toBe(true);
  });

  it('deve aceitar uma bio com exatamente o limite padrão (2000 caracteres)', () => {
    const limitInput = 'a'.repeat(2000);
    const bio = new Bio(limitInput);

    expect(bio.getValue()).toBe(limitInput);
  });

  it('deve aceitar um limite máximo customizado via parâmetro', () => {
    const customLimitInput = 'a'.repeat(50);
    const bio = new Bio(customLimitInput, 50);

    expect(bio.getValue()).toBe(customLimitInput);
  });

  it('deve lançar um erro ao exceder o limite padrão de caracteres', () => {
    const overflowInput = 'a'.repeat(2001);

    expect(() => new Bio(overflowInput)).toThrow(ERROR_MESSAGE);
  });

  it('deve lançar um erro ao exceder um limite customizado de caracteres', () => {
    const overflowInput = 'a'.repeat(51);

    expect(() => new Bio(overflowInput, 50)).toThrow(
      'A bio não pode exceder o limite máximo de 50 caracteres.',
    );
  });

  describe('getSummary', () => {
    it('deve retornar o texto completo se o tamanho for menor ou igual ao limite do resumo', () => {
      const input = 'Texto curto de bio';
      const bio = new Bio(input);

      expect(bio.getSummary(50)).toBe(input);
    });

    it('deve cortar o texto e adicionar reticências quando exceder o limite do resumo', () => {
      const input =
        'Esta é uma bio bem longa para testar o método de resumo da classe.';
      const bio = new Bio(input);

      const summary = bio.getSummary(20);

      expect(summary).toBe('Esta é uma bio bem l...');
      expect(summary.length).toBe(23);
    });

    it('deve usar o limite padrão de 100 caracteres se nenhum for informado em getSummary', () => {
      const input = 'a'.repeat(150);
      const bio = new Bio(input);

      const summary = bio.getSummary();

      expect(summary).toBe(`${'a'.repeat(100)}...`);
    });
  });
});
