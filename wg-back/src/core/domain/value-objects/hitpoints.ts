export interface HitPointsProps {
  max: number;
  current: number;
  temporary?: number;
}

export class HitPoints {
  private readonly max: number;
  private readonly current: number;
  private readonly temporary: number;

  constructor(props: HitPointsProps) {
    const temporary = props.temporary ?? 0;

    if (!this.validate(props.max, props.current, temporary)) {
      throw new Error('Pontos de vida atuais inválidos');
    }

    this.max = props.max;
    this.current = props.current;
    this.temporary = temporary;
  }

  /**
   * Valida a consistência dos pontos de vida.
   *
   * Garante que o valor máximo seja maior que zero e que a vida atual
   * não seja negativa nem exceda a soma do máximo com os pontos temporários.
   *
   * @param max - O valor máximo de pontos de vida.
   * @param current - O valor atual de pontos de vida.
   * @param temporary - Os pontos de vida temporários.
   * @returns `true` se os valores forem válidos, caso contrário `false`.
   */
  private validate(max: number, current: number, temporary: number): boolean {
    if (max <= 0) return false;
    if (current < 0) return false;
    if (temporary < 0) return false;

    return current <= max + temporary;
  }

  public getValue(): HitPointsProps {
    return {
      max: this.max,
      current: this.current,
      temporary: this.temporary,
    };
  }

  public getMax(): number {
    return this.max;
  }

  public getCurrent(): number {
    return this.current;
  }

  public getTemporary(): number {
    return this.temporary;
  }
}
