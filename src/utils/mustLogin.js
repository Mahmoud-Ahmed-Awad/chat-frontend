const mustLogin = (mustLogin) => {
  if (mustLogin) {
    if (!window.localStorage.getItem("token")) {
      window.location.href = "/";
    }
  } else {
    if (window.localStorage.getItem("token")) {
      window.location.href = "/chat";
    }
  }
};

export default mustLogin;
