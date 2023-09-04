import axios from "axios";
import { ENDPOINTS } from "../config/config.env";

export const getUserInfo = async () => {
        const res = await axios.get(ENDPOINTS.GET_USER_INFO);
        return res.data;
};
