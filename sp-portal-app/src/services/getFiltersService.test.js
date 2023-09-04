import { ENDPOINTS } from 'config/config.env';
import { getFiltersService } from '../services/getFiltersService';

describe('getFiltersService function', () => {
    it('should throw an error when called with an invalid country', async () => {
        const country = '';
        await expect(getFiltersService(country)).rejects.toThrow();
    });

    it('should call fetch with the correct endpoint and headers', async () => {
        const mockWindow = {
            crypto: {
                getRandomValues: jest.fn()
            }
          };
        
          jest.spyOn(global, 'window', 'get').mockReturnValue(mockWindow);

        const mockResponse = { data: 'mock data' };
        const mockJsonPromise = Promise.resolve(mockResponse);
        const mockFetchPromise = Promise.resolve({
            json: () => mockJsonPromise,
        });
        const country = 'ar';

        jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
        window.crypto.getRandomValues = jest.fn().mockImplementation((array) => {
            for (let i = 0; i < array.length; i++) {
                array[i] = Math.floor(Math.random() * 256);
            }
        });

        const result = await getFiltersService(country);

        expect(global.fetch).toHaveBeenCalledWith(ENDPOINTS.GET_FILTERS_AR, expect.any(Object));
        expect(result).toEqual(mockResponse);

        global.fetch.mockRestore();
    });
});
