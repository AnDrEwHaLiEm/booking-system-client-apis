const express = require('express');
const upload = express.Router();
const uploadWithStorage = require('../../uploadImages/multerSetup')

upload.post('/', uploadWithStorage.single("avatar"), async (req, res) => {
    try {
        return res.send();
    } catch (error) {
        return res.status(400).send({ error });
    }
})

module.exports = upload;