import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import RestaurantsDAO from "./dao/restaurantsDAO.js";

dotenv.config();
const MongoClient = mongodb.MongoClient;
const port = process.env.PORT || 8000;

MongoClient.connect(
    process.env.RESTREVIEW_DB_URI,
    {
        maxPoolSize : 50,
        useNewUrlParser : true,
        wtimeoutMS : 2500
    })
    .catch(err =>{
        console.error(err.stack);
        process.exit(1);
    })
    .then(async client =>{
        await RestaurantsDAO.getConnection(client);
        app.listen(port, ()=>{console.log(`listing on ${port}`)})
    }
)