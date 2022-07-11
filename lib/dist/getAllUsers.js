"use strict";
exports.__esModule = true;
var getAllUsers = function () {
    return fetch("https://xxm8-77n0-ua23.n7.xano.io/api:lSOVAmsS/users")
        .then(function (res) { return res.json(); });
};
exports["default"] = getAllUsers;
