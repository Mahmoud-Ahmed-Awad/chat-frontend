import axios from "axios";
import getUserData from "./getUserData";

const refreshToken = async () => {
  if (window.localStorage.getItem("token")) {
    const userData = await getUserData();
    const time = +userData.data.data.expire - 60000 - 654000;
    setInterval(async () => {
      try {
        const refreshTokenReq = await axios.post(
          `${window.env.API_URL}/users/refreshToken`,
          {
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem("token")}`,
            },
          }
        );
        if (refreshTokenReq.data.data.token) {
          window.localStorage.setItem("token", refreshTokenReq.data.data.token);
        }
      } catch (error) {
        clearInterval();
        window.localStorage.removeItem("token");
        window.location.href = "/";
      }
    }, time);
  }
};

export default refreshToken;
