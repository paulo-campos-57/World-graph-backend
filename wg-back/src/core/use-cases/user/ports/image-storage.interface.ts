export interface SaveImageInput {
  directory: string;
  buffer: Buffer;
  mimetype: string;
}

export interface IImageStorage {
  save(input: SaveImageInput): Promise<string>;
}
