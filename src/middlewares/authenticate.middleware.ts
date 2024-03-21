import {
  basicAuthorization,
  getUnauthorizedResponse,
} from "./basic_authorization.middleware";
import basicAuth from "express-basic-auth";

const authenticateBasicAuth = basicAuth({
  authorizer: basicAuthorization,
  authorizeAsync: true,
  unauthorizedResponse: getUnauthorizedResponse,
});
export { authenticateBasicAuth };


