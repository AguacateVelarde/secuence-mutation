import {AppService} from './app.service';

describe("Test suite", () => {
  let appService: AppService;
  beforeAll(() => {
    appService = new AppService();
  })
  test("Should exist", (done) => {
    expect(new AppService()).toBeDefined();
    done();
  });

  test("Should no empty request", (done) => {
    try {
      appService.hashMutation(null);
    } catch (e) {
      expect(e.message).toBe("DNA is not empty");
    }

    done();
  });

  test("Should array request", (done) => {
    try {
      (appService as any).hashMutation("asda");
    } catch (e) {
      expect(e.message).toBe("DNA should be an array");
    }

    done();
  });

  test("Should catch bad char", (done) => {
    try {
      appService.hashMutation(["ADFS", "AGGG", "DCCA", "GTTG"]);
    } catch (e) {
      expect(e.message).toBe("DNA only accept valid chars like: A,T,G,C");
    }

    done();
  });

  test("Should response is false 'cause the array is empty", (done) => {
    const response = appService.hashMutation([]);
    expect(response).toBe(false);
    done();
  });

  test("Should return true cause send a mutation simple array ", (done) => {
    const response = appService.hashMutation([
      "ATTGT",
      "AATGT",
      "GTTGT",
      "ATTGT",
      "ATTGT",
    ]);
    expect(response).toBe(true);
    done();
  });

  test("Should return true cause send a mutation simple array ", (done) => {
    const response = appService.hashMutation([
      "ATTTT",
      "AATGT",
      "GTTGT",
      "ATTGT",
      "ATTGT",
    ]);
    expect(response).toBe(true);
    done();
  });
});
