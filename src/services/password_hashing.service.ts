import argon2 from "argon2";

async function hashPassword(pin: string) {
  try {
    const hash = await argon2.hash(pin);
    return hash;
  } catch (err) {
    // throw err;
    return null
  }
}

async function verifyPassword(dbPIN: string, reqPIN: string) {
  try {
    const verify = await argon2.verify(dbPIN, reqPIN);
    return verify;
  } catch (e) {
    // console.error("Argon verify: ", e);
    return false;
  }
}

export { hashPassword, verifyPassword };