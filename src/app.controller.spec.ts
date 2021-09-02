import { Test, TestingModule,  } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CreateMutationDTO } from './dto/create-mutation.dto';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const appServiceMock = {
      hashMutation: () => Promise.resolve(true),
      getSummary: () => Promise.resolve({
        totalSecuences: 2,
        countNoMutations: 4,
        countMutations: 4,
        ratio: 2
      })
    }
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        { provide: 'AppService', useValue: appServiceMock },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return the same response than the summary', async (done) => {
      const response = await appController.getSummary()
      expect(response.totalSecuences).toEqual(2)
      expect(response.countNoMutations).toEqual(4)
      expect(response.countMutations).toEqual(4)
      expect(response.ratio).toEqual(2)
      done()
    });


    it('should return has mutation', async (done) => {
      const expressResponseMock = {        
        status: (num: Number) => ({
          send: (args) => args
        }),          
      }
      const response = await appController.calculateMutation({} as CreateMutationDTO, expressResponseMock)
      expect(response.hasMutation).toEqual(true)
      expect(response.code).toEqual(200)

      done()
    });

  });
});
