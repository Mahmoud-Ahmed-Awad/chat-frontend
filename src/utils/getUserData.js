import axios from "axios";

async function getUserData() {
  if (window.localStorage.getItem("token")) {
    try {
      const user = await axios.get(`${window.env.API_URL}/users/userData`, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      });
      return user;
    } catch (error) {
      window.localStorage.removeItem("token");
      window.location.href = "/";
    }
  }
}

export default getUserData;
