import axios from "axios";
import getUserData from "./getUserData";

const refreshToken = async () => {
  if (window.localStorage.getItem("token")) {
    const userData = await getUserData();
    console.log(userData.data.data);
    const time = +userData.data.data.expire - 60000 - 654000;
    console.log(time);
    setInterval(async () => {
      try {
        const refreshTokenReq = await axios.post(
          `${process.env.API_URL}/users/refreshToken`,
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
