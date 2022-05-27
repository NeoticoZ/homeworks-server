import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import { router } from "./routes";
import "express-async-errors";
import "reflect-metadata";

const app = express();

const port = process.env.PORT || 3333;

app.use(cors());
app.use(express.json());
app.use(router);
app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof Error) {
      return response.status(400).json({
        error: err.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
);

app.listen(port, () => console.log("Server started on port 3333"));
