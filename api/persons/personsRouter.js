const router = require("express").Router()
const lib = require("pipedrive")
lib.Configuration.apiToken = process.env.API_KEY
const Controller = lib.PersonsController

router.get("/", async (req, res) => {

  const users = await Controller.getAllPersons(input = [])
  res.status(200).json(users)
});


router.get("/:id", async (req, res) => {
  const id = req.params.id
  let errorMessage
  const singlePerson = await Controller.getDetailsOfAPerson(id).catch(err => { errorMessage = err })
  if (singlePerson && singlePerson.success) {
    res.status(200).json(singlePerson)
  } else {
    res.status(errorMessage.errorCode).json(errorMessage)
  }
})

router.post("/person", async (req, res) => {
  const { name, email, phone } = req.body
  let errorMessage
  if (!name || !email || !phone) {
    res.status(400).json({
      "message": "requirement not met, must include valid name, email, and phone, current values posted below",
      "name": name,
      "email": email,
      "phone": phone,
    })
  } else {
    const user = await Controller.addAPerson([name, email, phone]).catch(err => { errorMessage = err })
    if (user && user.success) {
      res.status(201).json(user)
    } else {
      res.status(errorMessage.errorCode).json(errorMessage)
    }
  }
});
router.delete("/:id", async (req, res) => {
  const id = req.params.id
  let errorMessage
  if (!id) {
    res.status(400).json({
      "message": "id required in url params in format DELETE at endpoint: /api/persons/:id See passed input below:",
      "id": req.params.id,
      "path": req.path
    })
  } else {

    const deletedPerson = await Controller.deleteAPerson(id).catch(err => { errorMessage = err })

    if (deletedPerson && deletedPerson.success) {

      res.status(200).json({
        "message": "person successfully removed",
        ...deletedPerson
      },
      )
    } else {
      res.status(errorMessage.errorCode).json({ "message": "id of user not found, unable to be deleted", ...errorMessage })
    }
  }
})

module.exports = router;