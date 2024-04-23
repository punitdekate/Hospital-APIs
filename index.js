import server from "./server.js";
import session from "session";
import bodyParser from "body-parser";

server.use(bodyParser.json());

server.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);
