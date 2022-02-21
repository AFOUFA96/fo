const express = require("express");

const app = express();

const cors = require("cors");
const corsOptions = {
    origin : ["http://localhost:3000"]
};
app.use(cors(corsOptions));
app.use(express.json()); 

const routers = require('./api/routers');
for(const route in routers){
    app.use(`/${route}`, new routers[route]().router);
}


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`); // ` : back tic
});