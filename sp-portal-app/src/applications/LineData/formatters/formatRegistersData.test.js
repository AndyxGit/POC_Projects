import { formatRegistersData } from "./formatRegistersData";
import { formatDate } from "utils/formatters";

jest.mock("../../../utils/formatters", () => ({
  formatDate: jest.fn(),
}));

describe("formatRegistersData", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('formats the registers data correctly', () => {
    const registers = {
      creation: '2023-02-10 00:00:00.00 -0300',
      lastRecharge: '2021-06-01 00:00:00.00 -0300',
      suspended: '2023-09-22 00:00:00.00 -0300',
      cancelled: '2022-04-12 00:00:00.00 -0300',
      expiration: '2023-12-22 00:00:00.00 -0300',
    };

    formatDate.mockReturnValueOnce('10/02/2023');
    formatDate.mockReturnValueOnce('01/06/2021');
    formatDate.mockReturnValueOnce('22/09/2023');
    formatDate.mockReturnValueOnce('12/04/2022');
    formatDate.mockReturnValueOnce('22/12/2023');

    const expectedData = [
      {
        title: 'Creación',
        date: '10/02/2023',
      },
      {
        title: 'Última recarga',
        date: '01/06/2021',
      },
      {
        title: 'Suspensión',
        date: '22/09/2023',
      },
      {
        title: 'Cancelación',
        date: '12/04/2022',
      },
      {
        title: 'Caducidad',
        date: '22/12/2023',
      },
    ];

    const formattedData = formatRegistersData({ registers });

    expect(formattedData).toEqual(expectedData);
   
  });

  it("It should return an empty array since it is not supplied with any arguments.", () => {
    const result = formatRegistersData({ registers: {} });
    expect(result).toEqual([]);
  });
});
