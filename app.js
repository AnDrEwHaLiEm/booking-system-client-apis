const path = require('path');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./src/routes/User/userRoutes');
const ticketRouter = require('./src/routes/Ticket/ticketRoutes');
const {eventsRouter, eventsRouterPartner} = require('./src/routes/Events/eventsRoutes');
const authintication = require('./src/authintication/authintication');
const authRouter = require('./src/routes/authintication/authinticationRoutes');
const checkAuthorty = require('./src/authoroties/checkAuthory');
const hallsRouter = require('./src/routes/Halls/hallsRoutes')
const upload = require('./src/routes/upload/upload');
require('dotenv/config')

///////////////////////////// mongodb+srv://skill-counter-api:<password>@cluster0.figsh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

const app = express()


app.use(express.json())
app.use(cors())

/////////////////////////////////

app.use('/static', express.static(path.join(__dirname, 'public')))
//app.use('/static', express.static('public'))
app.use("/upload", upload);
//////////////////withpit authinticate ///////////////////////
app.use("/event", eventsRouter);
/////////////////////////////////////////////////////
app.use('/authintication', authRouter)
/////////////////////////////////////////////////////

app.use(authintication.authinticate)
app.use(checkAuthorty)
////////////////////////////////////////////////////
app.use("/halls", hallsRouter);
app.use("/user", userRouter);
app.use("/event", eventsRouterPartner);
app.use("/ticket", ticketRouter);
/////////////////////////////////////////////////



app.get('/', (req, res) => res.send('yes iam working on host 4000'))


mongoose.connect(
    process.env.DB_CONECTION, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true },
    (err) => err ? console.log(err) : console.log("db is conected")
);

app.listen(process.env.PORT || 4000)