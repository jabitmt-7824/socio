const express = require("express");
const port = 1000;

const app = express();



app.listen(port,function(err){
    if(err)
    {
        console.log("error: ${err}");
        return;
    }
    console.log("server is successfully setup and running on the port:", port);
});