import axios from "axios";
import { BASE_URL_PROXY, HEADER } from "config/config.env";
import { createSessionId } from "utils/session";

const axiosInstance = axios.create({
  baseURL: BASE_URL_PROXY,
  headers: {
    "Content-Type": "application/json",
    "Session-Id": createSessionId(),
    "Channel-Id": HEADER.CHANNEL_ID,
  },
});

export { axiosInstance };
