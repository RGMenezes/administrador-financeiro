const Response = require("./Response");

module.exports = function UserAuthenticated(req, res, next) {
    console.log(req.session)
    if (req.isAuthenticated()) {
        return next();
    };
    res.json(Response("error", "Usuário não autenticado!", "/"));
};