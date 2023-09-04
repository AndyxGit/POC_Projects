import { HEADER } from "config/config.env";
import moment from "moment";
export const generateRandomString = (length) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  const randomValues = new Uint32Array(length);
  window.crypto.getRandomValues(randomValues);
  let result = '';
  for (let i = 0; i < length; i++) {
      result += characters.charAt(randomValues[i] % charactersLength);
  }
  return result;
}

export const createSessionId = () => {
  const channelAndDate = HEADER.CHANNEL_ID + moment(new Date()).format('YYYYMMDDHHmmss');
  let result = channelAndDate.toString();
  result += generateRandomString(32 - result.length);
  return result;
}

