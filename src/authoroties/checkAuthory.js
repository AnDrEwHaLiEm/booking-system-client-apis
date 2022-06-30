const UserModel = require("../MongoSchema/User/userModel");
const authorities = {
    isPartner: {
        user: "*",
        event: "*",
        ticket: "*",
        halls:"*",
    },
    isNotPartner: {
        user: "*",
        ticket: "*",
        event: ["Get"],
        halls:null,
    }
}

async function checkAuthorty(req, res, next) {
    try {
        const modelName = req.url.split('/')[1];
        const { method } = req
        const { _id } = req.body.decodedToken
        const user = await UserModel.findById({ _id })
        if (!user) {
            return res.sendStatus(401);
        }
        const userAuthoritiesInAllModels = authorities[(user.isaPartner === true ? 'isPartner' : 'isNotPartner')];
        const userAuthoritiesInOneModel = userAuthoritiesInAllModels[modelName]
        console.log(userAuthoritiesInAllModels)
        if (!userAuthoritiesInOneModel)
            return res.sendStatus(401);
        if (userAuthoritiesInOneModel === "*" || userAuthoritiesInOneModel.includes(method))
            return next()
        else
            return res.sendStatus(401);
    } catch (error) {
        return res.status(400).send(error)
    }
}

module.exports = checkAuthorty;