const express = require('express');
const { getAllUser, getRandomUser, saveRandomUser, updateUser, bulkUpdate, deleteUser } = require('../controllers/user.controller');

const router = express.Router();

router.get("/user/all", getAllUser);

router.get("/user/random", getRandomUser);

router.post("/user/save", saveRandomUser);

router.patch("/user/update", updateUser);

router.patch("/user/bulk-update", bulkUpdate);

router.delete("/user/delete", deleteUser);


module.exports = router;