const planModel = require("../models/planModel");

async function getUsers (req, res){
    let users = await planModel.getUsers();
    res.json(users);
}

async function getUserById (req, res){
    let id = parseInt(req.params.id);
    let user = await planModel.getUserById(id);
    if (user)
        res.json(user);
    else
        res.status(404).json({message: `User ${id} not found`})  
}

async function createUser (req, res){
    let user = await planModel.createUser(req.body);
    if (user)
        res.json(user)
    else
        res.status(500).json({message: "Error creating user"})
}

async function updateUser (req, res){
    let id = parseInt(req.params.id);
    let user = await planModel.updateUser(id, req.body);
    if (user)
        res.json(user)
    else
        res.status(500).json(`Error updating user ${id}`)
}

async function deleteUser (req,res) {
    let id = parseInt(req.params.id);
    let user = await planModel.getUserById(id);
    if (user) {
        let deleted = await planModel.deleteUser(id);
        if (deleted)
            res.json("User deleted");
        else 
            res.status(500).json("Error deleting user")
    }else
        res.status(404).json({message: `User ${id} not found`})  
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}