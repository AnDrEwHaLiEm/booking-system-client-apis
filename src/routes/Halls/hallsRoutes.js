const halls = require('../../BusinessLogic/Halls/Halls');
const express = require('express');
const hallsRouter = express.Router();

hallsRouter.get('/showOne/:_id', async (req, res) => {
    try {
        return halls.getOneHalls(req, res, true);
    } catch (error) {
        return res.sendStatus(400);
    }
})


hallsRouter.get('/showMany/:limit', async (req, res) => {
    try {
        return halls.getAllHalls(req, res, true)
    } catch (error) {
        return res.sendStatus(400);
    }
})


module.exports = hallsRouter;
