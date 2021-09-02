import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Mutation } from './mutation.schema';
import { MutationsService } from './mutations.service';

class MutationMockModel {
  constructor(private data: any) {}
  save = jest.fn().mockResolvedValue(this.data);
  static find = jest.fn().mockImplementation(() => ({
    countDocuments: () => 2
  }));
  static findOne = jest.fn().mockResolvedValue({});
  static findOneAndUpdate = jest.fn().mockResolvedValue({});
  static deleteOne = jest.fn().mockResolvedValue(true);
}


describe('MutationsService', () => {
  let service: MutationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MutationsService,
        {
          provide: getModelToken(Mutation.name),
          useValue: MutationMockModel,
        },
      ],
    }).compile();

    service = module.get<MutationsService>(MutationsService);
  });

  it('should be defined', (done) => {
    expect(service).toBeDefined()
   done()
  });


  it('should be defined', async (done) => {
    const response = await service.getSummary();
    
    expect(response.countMutations).toEqual(2)
    expect(response.countNoMutations).toEqual(2)
    expect(response.ratio).toEqual(2)
    expect(response.totalSecuences).toEqual(4)

   done()
  });

  

});
