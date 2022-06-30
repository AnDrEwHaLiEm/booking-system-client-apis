const jwt = require('jsonwebtoken')
const userModel = require('../MongoSchema/User/userModel')
const bcrypt = require('bcryptjs')
const fs = require('fs')

class Authintication {

    constructor() {
        this.getPrivateKey = this.getPrivateKey.bind(this)
        this.logIn = this.logIn.bind(this)
        this.createMyToken = this.createMyToken.bind(this)
        this.authinticate = this.authinticate.bind(this)
    }

    getPrivateKey() {
        return fs.readFileSync(`${__dirname}/../../privateKey.key`, 'utf8')
    }

    createMyToken(decodedToken) {
        const token = jwt.sign(decodedToken, this.getPrivateKey());
        if (!token)
            throw new Error('internal server error');
        return token
    }

    async logIn(req, res) {
        const { email, password } = req.body
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).send('email or password is error');
        }
        const passwordIsCorrect = await bcrypt.compare(password, user.password);
        if (!passwordIsCorrect) {
            return res.status(400).send('email or password is error');
        }
        //await userModel.updateOne({ _id: user._id }, { resetPassword: "" });
        const token = this.createMyToken({ _id: user._id, email: user.email, phone: user.phone })
        return res.send({ token })
    }

    async authinticate(req, res, next) {
        try {
            const authorizationHeader = req.headers['authorization'];
            const token = authorizationHeader && authorizationHeader.split('=')[1]
            if (!token)
                return res.sendStatus(401)
            const privateKey = this.getPrivateKey()
            return jwt.verify(token, privateKey, async (error, decodedToken) => {
                if (error)
                    return res.status(401).send({ error });
                req.body.decodedToken = decodedToken
                return next()
            })
        } catch (error) {
            res.status(400).send(error)
        }
    }
}


const authintication = new Authintication()


module.exports = authintication;