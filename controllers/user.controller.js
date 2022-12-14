const fs = require('fs');
const _ = require('underscore');
const usersModel = require("../models/user.model");

const getAllUser = async (req, res) => {
      try {
            res.status(200).json({
                  success: true,
                  data: usersModel
            })
      } catch (error) {
            res.status(500).send(error.message);
      }
}

const getRandomUser = async (req, res) => {
      try {
            const randomUser = usersModel[Math.floor(Math.random() * usersModel.length)];
            res.status(200).json({
                  success: true,
                  data: randomUser
            }); 
      } catch (error) {
            res.status(500).send(error.message);
      }
}

const saveRandomUser = async (req, res) => {
      try {
            const allUsers = usersModel;
            const newUser = req.body;
            allUsers.push(newUser);
            fs.writeFileSync(__dirname + "/../users.json", JSON.stringify(allUsers))
            res.status(200).json({
                  success: true,
                  data: allUsers
            });
      } catch (error) {
            res.status(500).send(error.message);
      }
}

const updateUser = async (req, res) => {
      try {
            const allUsers = usersModel;
            const {id, name, gender, email, phone, address, photoUrl } = req.body;           
            const selectedUser = allUsers.filter(data => data.id === id);
            selectedUser[0].id = id;
            selectedUser[0].name = name;
            selectedUser[0].gender = gender;
            selectedUser[0].email = email;
            selectedUser[0].phone = phone;
            selectedUser[0].address = address;
            selectedUser[0].photoUrl = photoUrl;
            fs.writeFileSync(__dirname + "/../users.json", JSON.stringify(allUsers))
            res.status(200).json(allUsers);
      } catch (error) {
            res.status(500).send(error.message);
      }
}

const bulkUpdate = async (req, res) => {
      try {
            const users = req.body

            if (_.isEmpty(req.body) == false) {

            const NewPersonsList = usersModel;

        users.map((user) => {
            const MatchedList = _.findWhere(NewPersonsList, { id: user.id });

            MatchedList.photoUrl = user.photoUrl
            MatchedList.name = user.name
            MatchedList.gender = user.gender
            MatchedList.email = user.email
            MatchedList.phone = user.phone
            MatchedList.address = user.address
        })

        fs.writeFileSync(__dirname + "/../Persons.json", JSON.stringify(NewPersonsList));
        res.status(200).json(NewPersonsList)
    }
    else {
        res.send({
            message: "Please Give a body with _id"
        })
    }
      } catch (error) {
            res.status(500).send(error.message); 
      }
}

const deleteUser = async (req, res) => {
      try {
            const allUsers = usersModel;
            const {id} = req.body;
            const selectedUser = allUsers.filter(data => data.id !== id);
            fs.writeFileSync(__dirname + "/../users.json", JSON.stringify(selectedUser))
            res.status(200).json({
                  success: true,
                  message: `The user no ${id} is successfully deleted`
            });
      } catch (error) {
            res.status(500).send(error.message);
      }
}

module.exports = {
      getAllUser,
      getRandomUser,
      saveRandomUser,
      updateUser,
      bulkUpdate,
      deleteUser
}