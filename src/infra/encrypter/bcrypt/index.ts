import { compare, hash } from "bcrypt";
import { IEncrypter } from "../IEncrypter";

export class Encrypter implements IEncrypter {
  salt: number;

  constructor(salt: number = 12) {
    this.salt = salt;
  }

  public async encrypt(value: string): Promise<string> {
    return hash(value, this.salt);
  }

  public async compare(value: string, hash: string): Promise<boolean> {
    return compare(value, hash);
  }
}
