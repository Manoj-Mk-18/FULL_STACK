import express from "express";
import cors from "cors";
import router from "./routes/Employee.Route.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server is running on the port: ${port}`);
});
