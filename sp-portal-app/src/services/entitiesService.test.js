import axios from 'axios';
import { getUserInfo } from './entitiesService';
import { ENDPOINTS } from '../config/config.env';

jest.mock('axios');

describe('getUserInfo', () => {
  it('should fetch user info', async () => {
    const data = { name: 'John Doe', email: 'johndoe@example.com' };
    axios.get.mockResolvedValue({ data });

    const result = await getUserInfo();

    expect(axios.get).toHaveBeenCalledWith(ENDPOINTS.GET_USER_INFO);
    expect(result).toEqual(data);
  });

  it('should handle errors', async () => {
    const error = new Error('Network Error');
    axios.get.mockRejectedValue(error);

    await expect(getUserInfo()).rejects.toThrow(error);
  });
});
