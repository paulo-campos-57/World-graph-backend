export class Bio {
  private readonly value: string;

  private static readonly MAX_LENGTH = 2000;

  constructor(bio?: string, maxLength = Bio.MAX_LENGTH) {
    const rawBio = bio ? bio.trim() : '';

    if (!this.validate(rawBio, maxLength))
      throw new Error(
        `A bio não pode exceder o limite máximo de ${maxLength} caracteres.`,
      );

    this.value = rawBio;
  }

  /**
   * Verifica se a bio excede o limite de valor de caracteres
   *
   * @param bio - A string contendo a bio do usuário
   * @param maxLength - O limite máximo de caracteres permitido (2000)
   * @returns - Retorna true, caso esteja dentro do limite, e false caso não esteja
   */
  private validate(bio: string, maxLength: number): boolean {
    return bio.length < maxLength;
  }

  public getValue(): string {
    return this.value;
  }

  public isEmpty(): boolean {
    return this.validate.length === 0;
  }

  public getSummary(length = 100): string {
    if (this.value.length <= length) return this.value;
    return `${this.value.substring(0, length)}...`;
  }
}
