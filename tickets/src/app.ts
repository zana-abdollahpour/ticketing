import express from "express";
import cookieSession from "cookie-session";
import { json } from "body-parser";

import { NotFoundError, errorHandler } from "@chcode/common";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  }),
);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
