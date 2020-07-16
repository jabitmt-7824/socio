const fs = require("fs");
const rfs = require("rotating-file-stream");
const path = require("path");

const logDirectory = path.join(__dirname, "../production_logs");
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accesLogStream = rfs.createStream("access.log",{
    interval: "1d",
    path: logDirectory
});

const development = {
    name: "development",
    asset_path: "./assets",
    session_cookie_key: "blahsomething",
    db: "socio_development",
    smtp: {
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: "jabirmt7824@gmail.com",
          pass: ""
        }
    },
    google_client_id: "672051795843-at82juahq1i8i0i6kgnqpq92vdplvd8l.apps.googleusercontent.com",
    google_client_secret: "",
    google_callback_URL: "http://localhost:1000/user/auth/google/callback",
    jwt_secret: "socio",
    morgan: {
        mode: "dev",
        options: {stream: accesLogStream}
    }
}

const production = {
    name: "production",
    asset_path: process.env.asset_path,
    session_cookie_key: process.env.session_cookie_key,
    db: process.env.db,
    smtp: {
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: "jabirmt7824@gmail.com",
          pass: ""
        }
    },
    google_client_id: process.env.google_client_id,
    google_client_secret: process.env.google_client_secret,
    google_callback_URL: process.env.google_callback_URL,
    jwt_secret: process.env.jwt_secret,
    morgan: {
        mode: "combined",
        options: {stream: accesLogStream}
    }
}

module.exports = eval(process.env.socio_environment) == undefined ? development : eval(process.env.socio_environment);