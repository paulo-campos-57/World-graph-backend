export class NickName {
  private readonly value: string;

  constructor(nickname: string) {
    const cleanNick = nickname.trim().toLowerCase();

    if (!this.validate(cleanNick))
      throw new Error(
        `O nickname deve conter entre 3 e 20 caracteres, ` +
          `e conter apenas letras, números, '-' ou '_'.`,
      );

    this.value = cleanNick;
  }

  /**
   * Valida se o nickname está dentro dos padrões da plataforma
   *
   * @param nickname - A string com o nickname
   * @returns - Retorna true, caso esteja dentro dos padrões (caracteres e comprimento), e false, caso não esteja.
   */
  private validate(nickname: string): boolean {
    const nickRegex = /^[a-z0-9_-]{3,20}$/;
    const isValid =
      nickRegex.test(nickname) && nickname.length >= 2 && nickname.length <= 50;
    return isValid;
  }

  public getValue(): string {
    return this.value;
  }
}
