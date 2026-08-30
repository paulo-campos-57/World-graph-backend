export class Attribute {
  private readonly value: number;

  constructor(attribute: number) {
    if (!this.validate(attribute))
      throw new Error(`O atributo deve ser um valor entre 0 e 30`);

    this.value = attribute;
  }

  /**
   * Valida o valor passado para um atributo.
   *
   * @param attribute - O valor do atributo a ser validado.
   * @returns `isValid` se o atributo for válido, essa variável é retornada true
   */
  private validate(attribute: number): boolean {
    const isValid = attribute >= 0 && attribute <= 30;
    return isValid;
  }

  private getValue(): number {
    return this.value;
  }
}
