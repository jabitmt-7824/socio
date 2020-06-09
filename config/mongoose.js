const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/socio_db', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on("error", console.error.bind("error in connecting to db"));

db.once("open", function(){
    console.log("successfully connected to database");
});

module.exports = db;