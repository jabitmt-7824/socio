const express = require("express");
const port = 1000;
const db = require("./config/mongoose");
const loger = require("morgan");
const env = require("./config/environment");
const expressLayouts = require("express-ejs-layouts");
const cookieParser = require("cookie-parser");
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');
const mongoStore = require("connect-mongo")(session);
const sassMiddleware = require("node-sass-middleware");
const flash = require("connect-flash");
const customMware = require("./config/middleware");
const passportJwt = require("./config/passport-jwt-strategy");
const path = require("path");

const app = express();
require("./config/view-helper")(app); 

// setting up chatbox server and socket.io
const chatServer = require("http").Server(app);
const chatSocket = require("./config/chat_socket").chatSocket(chatServer);
chatServer.listen(80, ()=>{
    console.log("chat server is running successsfully on port 70");
});
if(env.name == "development"){
    app.use(sassMiddleware({
        /* Options */
        src: path.join(__dirname,env.asset_path,"/scss"),
        dest: path.join(__dirname,env.asset_path,"/css"),
        debug: true,
        outputStyle: 'extended',
        prefix:  '/css'  // Where prefix is at <link rel="stylesheets" href="prefix/style.css"/>
    }));
}

app.use(express.static(env.asset_path));
app.use("/uploads", express.static(__dirname+"/uploads"));

app.use(loger(env.morgan.mode, env.morgan.options));
 
app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.use(express.urlencoded({extended: true}));

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(session({
    name: 'codeial',
    // TODO change the secret before deployment in production mode
    secret: env.session_cookie_key,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new mongoStore(
        {
            mongooseConnection : db,
            autoRemove: 'disabled'
        
        },
        function(err){
            console.log(err ||  'connect-mongodb setup ok');
        }
    )
    
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

app.use("/", require("./routes/index"));

app.listen(port,function(err){
    if(err)
    {
        console.log(`error: ${err}`);
        return;
    }
    console.log("server is successfully setup and running on the port:", port);
});
