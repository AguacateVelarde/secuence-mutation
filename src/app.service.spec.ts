import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';


describe("Test suite", () => {
  let service: AppService;
  
  beforeAll(async () => {
    const mutationServiceMock = {
      getSummary: () => Promise.resolve({}),
      createMutation: () => Promise.resolve({ message: "success created" })
    }
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService,
        { provide: 'MutationsService', useValue: mutationServiceMock },
      ],
    }).compile();

    service = module.get<AppService>(AppService);

  })
  test("Should exist", (done) => {
    expect(service).toBeDefined();
    done();
  });


  test("Should catch bad char", async (done) => {
    try {
      await service.hashMutation(["ADFS", "AGGG", "DCCA", "GTTG"]);
    } catch (e) {
      expect(e.message).toBe("DNA only accept valid chars like: A,T,G,C");
    }

    done();
  });

 

  test("Should return true cause send a mutation simple array ", async (done) => {
    const response = await service.hashMutation([
      "ATTGT",
      "AATGT",
      "GTTGT",
      "ATTGT", 
      "ATTGT",
    ]);

    expect(response).toBe(true);
    done();
  });

  test("Should return true cause send a mutation simple array ", async (done) => {
    const response = await service.hashMutation([
      "ATTTT",
      "AATGT",
      "GTTGT",
      "ATTGT",
      "ATTGT",
    ]);
    expect(response).toBe(true);
    done();
  });

  test("Should return true cause send a mutation simple array ", async (done) => {
    const response = await service.hashMutation([
      "ATTAT",
      "AATGA",
      "GTAAT",
      "ATTGT",
      "ATTGT",
    ]);
    expect(response).toBe(false);
    done();
  });

});
