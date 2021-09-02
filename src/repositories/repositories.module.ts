import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MutationSchema, Mutation } from './mutations/mutation.schema';
import { MutationsService } from './mutations/mutations.service';

const schemas = [
  MongooseModule.forFeature([
    {
      name: Mutation.name,
      schema: MutationSchema,
    }    
  ]),
];

@Module({
  imports: [...schemas],
  providers: [MutationsService],
  exports: [MutationsService]
})
export class RepositoriesModule {}
