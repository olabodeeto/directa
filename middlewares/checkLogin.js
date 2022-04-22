import USER from "../class/userClass";
const jwt = require("jsonwebtoken");

export default async function checkLogin(router) {
  const response = await USER.auth();
  const useremail = localStorage.getItem("user");
  if (!response.auth) {
    localStorage.clear();
    return router.replace("/");
  } else {
    console.log(response);
    return response.auth;
  }
}
