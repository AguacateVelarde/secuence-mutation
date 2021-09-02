import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MutationDocument = Mutation & Document;

@Schema({ autoCreate: true })
export class Mutation {
  @Prop({ type: [String] })
  dna: string[];
  
  @Prop({ type: Boolean })
  hasMutation: boolean;  
}

export const MutationSchema = SchemaFactory.createForClass(Mutation);
