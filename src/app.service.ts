import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { MutationsService } from './repositories/mutations/mutations.service';
const regexVerification = /(.)\1\1\1/;
const hash = {};
const validChars = ["A", "T", "G", "C"];

@Injectable()
export class AppService {
  constructor(private readonly mutationsService: MutationsService) { }
  
  public getSummary() {
    return this.mutationsService.getSummary();
  }

  private verifyValidChars(dna: string[]) {
    const handlerFilter = (current: string) => validChars.includes(current);
    return dna.join("").toUpperCase().split("").every(handlerFilter);
  }
  
  async hashMutation(dna: string[]): Promise<boolean> {    
    if (!this.verifyValidChars(dna)) {
      throw new UnprocessableEntityException(`DNA only accept valid chars like: ${validChars}`)
    }
  
    let hasMutation = false;
  
    for (const secuence of dna) {
      if (!hasMutation) {
        hasMutation = this.verifyRepiteMoreThanFourTimes(secuence);
      }
    }
  
    if (hasMutation) {
      await this.mutationsService.createMutation(dna, hasMutation);
      return hasMutation;
    }
  
    for (let i = 0; i < dna.length && !hasMutation; i++) {
      let _matrix = [];
      for (let j = 0; j < dna.length && !hasMutation; j++) {
        _matrix.push(dna[j][i]);
      }
      hasMutation = this.verifyRepiteMoreThanFourTimes(_matrix.join(""));
    }

    await this.mutationsService.createMutation(dna, hasMutation);  
    return hasMutation;
  }
  
  private isSeen(secuence: string) {
    return hash[secuence] !== undefined && hash[secuence] !== null;
  }
  
  private getSeenSecuence(secuence: string) {
    return hash[secuence];
  }
  
  private setSeenSecuence(secuence: string, value: boolean) {
    hash[secuence] = value;
  }
  
  private verifyRepiteMoreThanFourTimes(secuence: string) {
    if (this.isSeen(secuence)) {
      return this.getSeenSecuence(secuence);
    }
    const verifyResponse = regexVerification.test(secuence);
    this.setSeenSecuence(secuence, verifyResponse);
  
    return verifyResponse;
  }
}
