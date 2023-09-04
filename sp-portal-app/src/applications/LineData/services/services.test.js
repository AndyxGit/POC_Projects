import { LineDataService, LineCheckService } from ".";
import { axiosInstance } from "../../../services/interceptor";

jest.mock("../../../services/interceptor", () => ({
  axiosInstance: {
    get: jest.fn(),
  },
}));

describe("LineDataService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const responseLineData = {
    serviceDetails: {
      error: "OK",
      result: "0",
      level: "SUCCESS",
    },
    format: {
      date: "yyyy-MM-dd HH:mm:ss.SS Z",
      currency: "$",
    },
    balance: {
      availablePayment: {
        amount: 0.0,
      },
      rechargePayment: {
        amount: 0.0,
        expiration: "2023-05-04 11:31:00.00 -0300",
      },
      promotionPayment: {
        amount: 0.0,
        expiration: "2023-05-04 11:31:00.00 -0300",
      },
      frozenPayment: {
        amount: 0.0,
        expiration: "",
      },
      monthlyPayment: {
        amount: 20.0,
        expiration: "2023-06-01 00:00:00.00 -0300",
        available: 0.0,
        consumed: 20.0,
      },
    },
    condition: {
      currentStatus: {
        id: "AC",
        description: "ACTIVO",
      },
      lastStatus: {
        id: "AC",
        description: "ACTIVO",
      },
      accountStatus: {
        id: "2",
        description: "ACTIVO",
      },
      pcePcsActual: {
        id: "AC",
        description: "ACTIVO",
      },
      serviceStatus: {
        id: "1",
        description: "ACTIVO",
        firstWordDescription: "ACTIVO",
      },
      profileId: {
        id: "1048",
        description: "ACI55",
        concat: "1048 - ACI55",
      },
      change: "2023-05-04 11:31:39.00 -0300",
      promoPlus: true,
      lastUsed: "2023-05-04 11:31:39.00 -0300",
    },
    registers: {
      creation: "2023-05-04 11:31:39.00 -0300",
      lastRecharge: "",
      suspended: "2024-02-28 00:00:00.00 -0300",
      cancelled: "2024-02-28 00:00:00.00 -0300",
      expiration: "2023-05-04 11:31:00.00 -0300",
    },
  };

  const country = "ar";
  const cellularNumber = "123456789";
  const userId = "user123";
  const rplId = "rpl123";
  const msisdn = "msisdn123";

  it("debe llamar a axiosInstance.get con los parámetros correctos", async () => {
     axiosInstance.get.mockResolvedValueOnce({
      data: responseLineData,
    });

    const responseService = await LineDataService({
      cellularNumber,
      userId,
      rplId,
      msisdn,
      country,
    });

    expect(responseService).toEqual(responseLineData);
  });

  it("debe lanzar un error si axiosInstance.get falla", async () => {
    const error = new Error("Error de red");
    axiosInstance.get.mockRejectedValueOnce(error);

    await expect(
      LineDataService({ country, cellularNumber, userId, rplId, msisdn })
    ).rejects.toThrow(error);
  });
});

describe("LineCheckService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const responseLineCheck = {
    serviceDetails: {
      error: "OK",
      result: "0",
      level: "SUCCESS",
    },
    billNumber: "3512072757",
    cellularNumber: "3512072757",
    stgId: "AH",
    cbtId: "CR",
    cluType: "CPP",
    msisdn: "5493512072757",
    prefix: "549",
    rplId: "ACI55",
  };

  const country = "ur";
  const lineNumber = "987654321";
  const userId = "user123";

  it("debe llamar a axiosInstance.get con los parámetros correctos", async () => {
    axiosInstance.get.mockResolvedValueOnce({
      data: responseLineCheck,
    });

    const responseService = await LineCheckService({
      lineNumber,
      userId,
      country,
    });

    expect(responseService).toEqual(responseLineCheck);
  });

  it("debe lanzar un error si axiosInstance.get falla", async () => {
    axiosInstance.get.mockRejectedValueOnce(new Error("Error de red"));

    await expect(
      LineCheckService({
        lineNumber,
        userId,
        country,
      })
    ).rejects.toThrowError("Error de red");
  });
});
