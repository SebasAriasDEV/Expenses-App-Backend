import jwt from "jsonwebtoken";

const generateJWT = (uid: string) => {
  return new Promise<string>((resolve, rejects) => {
    const payload = { uid };

    jwt.sign(
      payload,
      process.env.SECRET_JWT_KEY,
      {
        expiresIn: "300d",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          rejects("JWT was not generated");
        } else {
          resolve(token as string);
        }
      }
    );
  });
};

//Exports
export { generateJWT }