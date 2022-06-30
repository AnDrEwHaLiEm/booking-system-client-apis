const ticket = require('../../BusinessLogic/Ticket/Ticket');
const express = require('express');
const ticketRouter = express.Router();


ticketRouter.post('/new', async (req, res) => {
    try {
        return ticket.createModel(req, res);
    } catch (error) {
        return res.sendStatus(400);;
    }
})

ticketRouter.get('/showMany/:_id', async (req, res) => {
    try {
        // get all ticket for one user
    } catch (error) {
        return res.sendStatus(400);
    }
})

ticketRouter.get("showOne/:user_id/:ticket_id", async (req, res) => {
    try {
        // get One ticket for one user
    } catch (error) {
        return res.sendStatus(400);
    }
})


module.exports = ticketRouter;
