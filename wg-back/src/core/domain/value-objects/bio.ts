export class Bio {
  private readonly value: string;

  private static readonly MAX_LENGTH = 2000;

  constructor(bio?: string, maxLength = Bio.MAX_LENGTH) {}

  /**
   * Valida se a bio está dentro do limite de tamanho máximo
   *
   * @param bio - A string contendo a bio.
   * @param maxLength - O limite (2000) de caracteres máximo para a bio;
   */
  private validate(bio: string, maxLength: number): void {
    if (bio.length > maxLength)
      throw new Error(
        `A bio não pode exceder o limite máximo de ${maxLength} caracteres.`,
      );
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
