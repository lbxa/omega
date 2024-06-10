/* eslint-disable @stylistic/js/max-len */
import { Injectable } from "@nestjs/common";
import * as argon2 from "argon2";

@Injectable()
export class PasswordService {
  /**
   * Argon2id automatically salts. Recommended settings from:
   * https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html#argon2id
   * For more documentation read: https://github.com/ranisalt/node-argon2/wiki/Options
   */
  async generatePasswordHash(password: string) {
    const hash = await argon2.hash(password, {
      type: argon2.argon2id,
      parallelism: 1,
      memoryCost: 12288,
      timeCost: 3,
    });

    return hash;
  }

  async verifyPasswordHash(hash: string, password: string) {
    return await argon2.verify(hash, password);
  }
}
