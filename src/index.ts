import express from "express";
import http from "http";
import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import router from './router';
dotenv.config();
const PORT = 8080;

const app = express();
app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is running successful at port: ${PORT}`);
});

mongoose.Promise = Promise;
// console.log(process.env.MONGODB_URI)
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
  try {
    console.log("Mongoose is connected ");
  } catch (err) {
    console.log(err);
  }
});


app.use('/', router());