import * as express from "express"
import { AppDataSource } from "./data-source"
import routes from "./routes"


AppDataSource.initialize().then(async () => {

    // create express app
    const app = express()
    app.use(express.json())
    app.use('/', routes)
    app.listen(3000, () => console.log("Server OK"))


}).catch(error => console.log(error))
