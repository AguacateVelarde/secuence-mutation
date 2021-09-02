import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Mutation, MutationDocument } from './mutation.schema';

@Injectable()
export class MutationsService {
  constructor(
    @InjectModel(Mutation.name)
    private readonly mutationCollection: Model<MutationDocument>,
  ){}
  async createMutation(dna: string[], hasMutation: boolean): Promise<MutationDocument> {
    return this.mutationCollection.create({ dna, hasMutation });
  }

  async getSummary() {
    const countNoMutations = await this.mutationCollection
      .find({ hasMutation: false })
      .countDocuments();
    
    const countMutations = await this.mutationCollection
      .find({ hasMutation: true })
      .countDocuments();
    
    const totalSecuences = countNoMutations + countMutations;        
    const ratio = totalSecuences / countMutations;   

    return {
      totalSecuences,
      countNoMutations,
      countMutations,
      ratio
    }
  }
}
