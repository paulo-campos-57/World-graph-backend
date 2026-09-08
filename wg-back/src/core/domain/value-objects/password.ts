export class Password {
  private readonly value: string;

  constructor(password: string, isHashed = false) {
    if (!isHashed && !this.validate(password))
      throw new Error(
        `A senha deve ter no mínimo 8 caracteres, incluindo pelo menos uma letra, número e caracter especial`,
      );

    this.value = password;
  }

  /**
   * Valida a senha verificando os critérios mínimos de segurança.
   *
   * Requisitos:
   * - Mínimo de 8 caracteres
   * - Pelo menos uma letra
   * - Pelo menos um número
   * - Pelo menos um caractere especial (!@#$%^&*...)
   *
   * @param password - A senha a ser validada.
   * @returns `true` se a senha atender a todos os critérios, `false` caso contrário.
   */
  private validate(password: string): boolean {
    const hasLength = password.length >= 8;
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[^a-zA-Z0-9]/.test(password);

    return hasLength && hasLetter && hasNumber && hasSpecialChar;
  }

  public getValue(): string {
    return this.value;
  }
}
