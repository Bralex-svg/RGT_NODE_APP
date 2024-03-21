import * as dotenv from "dotenv";
dotenv.config();

const env = process.env;
console.log("config check", process.env.AUTH_USERNAME);

export default {
  BASIC_AUTH_NAME: env.AUTH_USERNAME,
  BASIC_AUTH_PASSWORD: env.AUTH_PASSWORD,
}