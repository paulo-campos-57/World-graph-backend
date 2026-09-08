import { HitPoints } from './../../../../src/core/domain/value-objects/hitpoints';

describe('HitPoints Value Object', () => {
  const ERROR_MESSAGE = 'Pontos de vida atuais inválidos';

  it('deve criar pontos de vida válidos com sucesso', () => {
    const hp = new HitPoints({ max: 100, current: 80, temporary: 10 });

    expect(hp.getValue()).toEqual({ max: 100, current: 80, temporary: 10 });
    expect(hp.getMax()).toBe(100);
    expect(hp.getCurrent()).toBe(80);
    expect(hp.getTemporary()).toBe(10);
  });

  it('deve definir o valor padrão de temporary como 0 quando não informado', () => {
    const hp = new HitPoints({ max: 50, current: 50 });

    expect(hp.getTemporary()).toBe(0);
  });

  it('deve permitir que o valor de current seja igual ao max + temporary', () => {
    const hp = new HitPoints({ max: 50, current: 60, temporary: 10 });

    expect(hp.getCurrent()).toBe(60);
  });

  it('deve lançar um erro quando o max for menor ou igual a 0', () => {
    expect(() => new HitPoints({ max: 0, current: 0 })).toThrow(ERROR_MESSAGE);
    expect(() => new HitPoints({ max: -10, current: 0 })).toThrow(
      ERROR_MESSAGE,
    );
  });

  it('deve lançar um erro quando o current for negativo', () => {
    expect(() => new HitPoints({ max: 100, current: -1 })).toThrow(
      ERROR_MESSAGE,
    );
  });

  it('deve lançar um erro quando o temporary for negativo', () => {
    expect(
      () => new HitPoints({ max: 100, current: 50, temporary: -5 }),
    ).toThrow(ERROR_MESSAGE);
  });

  it('deve lançar um erro quando o current exceder o limite de max + temporary', () => {
    expect(
      () => new HitPoints({ max: 100, current: 101, temporary: 0 }),
    ).toThrow(ERROR_MESSAGE);
    expect(
      () => new HitPoints({ max: 100, current: 115, temporary: 10 }),
    ).toThrow(ERROR_MESSAGE);
  });
});
