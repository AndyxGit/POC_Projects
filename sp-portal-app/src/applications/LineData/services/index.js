import { PATH } from "config/config.env";
import { axiosInstance } from "services/interceptor";

export const LineDataService = async ({ cellularNumber, userId, rplId, msisdn, country }) => {
  try {
    const { data } = await axiosInstance.get(`/${country}${PATH.LINE_DATA}` , {
      headers: { "Cellular-Number": cellularNumber, "User-Id": userId, rplId, msisdn },
      data: {}
    });  
    return data;
  } catch (error) {
    throw error;
  }
};

export const LineCheckService = async ({ lineNumber, userId, country }) => {
  try {
    const { data } = await axiosInstance.get(`/${country}${PATH.LINE_CHECK}`, {
      headers: { "Line-Number": lineNumber, "User-Id": userId},
      data: {},
    });
    return data;
  } catch (error) {
      throw error;
  }
};
