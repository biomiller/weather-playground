import express from "express";
import bodyParser from "body-parser";
import routes from "./routes/weather"

const port = 3001;
const app = express();
app.use(bodyParser.json());
app.use('/', routes);

export const server = app.listen(port, () => console.log(`App running on port ${port}`));

export default app;