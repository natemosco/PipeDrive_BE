const router = require("express").Router()
const lib = require("pipedrive")
lib.Configuration.apiToken = process.env.API_KEY
const Controller = lib.PersonsController

router.get("/", async (req, res) => {

  const users = await Controller.getAllPersons(input = [])
  res.status(200).json(users)
});


router.get("/:id", async (req, res) => {
  let input = []
  input["term"] = req.params.id
  input["fields"] = ["id"]
  const singlePerson = await Controller.searchPersons(input)
})

router.post("/person", async (req, res) => {
  const { name, email, phone } = req.body
  if (!name || !email || !phone) {
    res.status(400).json({
      "message": "requirement not met, must include valid name, email, and phone, current values posted below",
      "name": name,
      "email": email,
      "phone": phone,
    })
  } else {
    const user = await Controller.addAPerson([name, email, phone])

    res.status(201).json(user)
  }
});
router.delete("/:id", async (req, res) => {
  const id = req.params.id
  if (!id) {
    res.status(400).json({
      "message": "id required in url params in format DELETE at endpoint: /api/persons/:id See passed input below:",
      "id": req.params.id,
      "path": req.path
    })
  } else {
    const deletedPerson = await Controller.deleteAPerson(id)
    req.status(200).json({
      "message": "person successfully removed",
      "person removed": deletedPerson
    })
  }
})

module.exports = router;