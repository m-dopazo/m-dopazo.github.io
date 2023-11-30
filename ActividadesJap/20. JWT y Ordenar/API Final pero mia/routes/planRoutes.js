const express = require("express");
const planRouter = express.Router();
const planController = require("../controllers/planControllers");

planRouter.get("/", planController.getUsers);

planRouter.get("/:id", planController.getUserById);

planRouter.post("/",planController.createUser);

planRouter.put("/:id", planController.updateUser);

planRouter.delete("/:id", planController.deleteUser);

module.exports = planRouter