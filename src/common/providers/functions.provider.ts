import { Injectable } from '@nestjs/common';

@Injectable()
export class FunctionsProvider {
  extractUsernameByEmail(email) {
    return /^([^]+)@(\w+).(\w+)$/.exec(email)[1];
  }
}
