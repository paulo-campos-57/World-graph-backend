export class Name {
    private readonly value: string;

    constructor(name: string) {
        if (!this.validate(name))
            throw new Error(`O nome deve ter entre 2e 50 carcteres`);

        this.value = name.toLowerCase().trim();
    }

    private validate(name: string) {
        const trimmedName = name.trim();
        const isValid = trimmedName.length < 2 || trimmedName.length > 50;
        return isValid;
    }

    public getValue(): string {
        return this.value;
    }
}