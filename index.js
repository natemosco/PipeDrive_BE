require("dotenv").config();

const server = require("./api/server.js")

const PORT = process.env.PORT || 3459;
server.listen(PORT, () => {
  console.log(`*************************************************\n server is running on port ${PORT} \n *************************************************`)
})

