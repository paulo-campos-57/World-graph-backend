export class Email {
  private readonly value: string;

  constructor(email: string) {
    const cleanEmail = email.trim().toLowerCase();

    if (!this.validate(cleanEmail))
      throw new Error(`Formato inválido para e-mail`);

    this.value = cleanEmail;
  }

  /**
   * Valida a estrutura de uma string de e-mail.
   *
   * Remove espaços nas extremidades e converte o e-mail para letras minúsculas
   * antes de testar a expressão regular.
   *
   * @param email - A string contendo o e-mail a ser validado.
   * @returns `true` se o e-mail tiver um formato válido, caso contrário `false`.
   */
  private validate(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(email);
  }

  public getValue(): string {
    return this.value;
  }
}
