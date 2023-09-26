import * as express from "express";
import { AppDataSource } from "./data-source";
import routes from "./routes";
import * as cors from "cors";

//Se crea la constante PORT para el puerto del servidor y se inicializa el servidor con el puerto 3000
const PORT = process.env.PORT || 3000;
AppDataSource.initialize()
  .then(async () => {
    // create express app
    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use("/", routes);
    app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
  })
  .catch((error) => console.log(error));
