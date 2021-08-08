import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
const port = 3001;

const app = express();
app.use(bodyParser.json());

export const server = app.listen(port, () => console.log(`App running on port ${port}`));