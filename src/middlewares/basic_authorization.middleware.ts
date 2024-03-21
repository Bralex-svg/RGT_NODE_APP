import config from "../config";

const { BASIC_AUTH_NAME, BASIC_AUTH_PASSWORD } = config;


const user = BASIC_AUTH_NAME;
const pass = BASIC_AUTH_PASSWORD;
function basicAuthorization(username: string, password: string, cb: any) {
    console.info({user, pass, username, password})
  if (username === user && password === pass) return cb(null, true);
  else return cb(null, false);
}
function getUnauthorizedResponse(req: any) {
  return req.auth
    ? "Credentials " + req.auth.user + ":" + req.auth.password + " rejected"
    : "No credentials provided";
}
export { basicAuthorization, getUnauthorizedResponse };
