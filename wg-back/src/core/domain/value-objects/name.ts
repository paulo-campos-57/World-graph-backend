export class Name {
  private readonly value: string;

  constructor(name: string) {
    if (!this.validate(name))
      throw new Error(`O nome deve ter entre 2 e 50 carcteres`);

    this.value = name.toLowerCase().trim();
  }

  /**
   * Valida a estrutura de uma string de nome.
   *
   * Remove espaços nas extremidades antes de verificar o comprimento do nome.
   *
   * @param name - A string contendo o nome a ser validado.
   * @returns `isValid` se o nome for válido, essa variável é retornada como true, caso contrário, false.
   */
  private validate(name: string): boolean {
    const trimmedName = name.trim();
    const isValid = trimmedName.length < 2 || trimmedName.length > 50;
    return isValid;
  }

  public getValue(): string {
    return this.value;
  }
}
