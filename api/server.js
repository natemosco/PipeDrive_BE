const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const lib = require("pipedrive")
const personsRouter = require("./persons/personsRouter")

const globalMiddleware = [helmet(), cors(), express.json()];

const server = express();
server.use(globalMiddleware);
server.use("/api/persons", personsRouter)


server.get("/", (req, res) => {
  res.status(200).json({ message: "Base server is up and running" });
});


module.exports = server;
