const router = require("express").Router()
const lib = require("pipedrive")
lib.Configuration.apiToken = process.env.API_KEY

router.get("/all", async (req, res) => {

  const users = await lib.PersonsController.getAllPersons(input = [])

  res.status(200).json(users)
});


module.exports = router;