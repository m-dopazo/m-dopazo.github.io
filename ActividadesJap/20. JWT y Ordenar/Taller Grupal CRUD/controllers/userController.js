const userModel = require("../models/userModel");

//Las funciones son asincronicas pues deben esperar a una peticion para continuar ejecutando.

const getUsers = async(req, res) => {
  let users = await userModel.getUsers();
  res.json(users);
};

const getUserById = async(req, res) => {
  //const user = userModel.getUserById(req.params.id);
  //Hacer un parseInt para tomar el id como entero:
  let id = parseInt(req.body.id);
  const user = await userModel.getUserById(id)
  //
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: "Usuario no encontrado" });
  }
};

const createUser = async(req, res) => {
  const createdUser = await userModel.createUser(req.body);
  if (createdUser) {
    res.status(200).json(createdUser);
  } else {
    res.status(500).json({ message: "Ha ocurrido un error" });
  }
};

const updateUser = async(req, res) => {
  //const updatedUser = userModel.updateUser(req.params.id, req.body);
  let id = parseInt(req.params.id);
  const updatedUser = await userModel.updateUser(id, req.body);
  //
  if (updatedUser) {
    //res.status(404).json(updatedUser);
    //En caso de actualizar tira status 404. Arreglamos:
    res.status(200).json(updatedUser)
    //
  } else {
    res.status(404).json({ message: "Usuario no encontrado" });
  }
};

const deleteUser = async(req, res) => {
  //const deletedUser = userModel.deleteUser(req.params.id);
  //para eliminar un usuario, como precondicion debe pertenecer a la db:
  let id = parseInt(req.params.id);
  let user = await userModel.getUserById(id);
  if (user) {
    const deletedUser = await userModel.deleteUser(id);
    if (deletedUser)
      res.status(200).json(deletedUser)
    else
      res.status(500).json({message: "Error"})
  } else {
    res.status(404).json({ message: "Usuario no encontrado" });
  }
};

module.exports = {
  getUsers,
  getUserById,
  updateUser,
  createUser,
  deleteUser,
};
