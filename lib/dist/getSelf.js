"use strict";
exports.__esModule = true;
var getSelf = function (token) {
    return fetch("https://xxm8-77n0-ua23.n7.xano.io/api:lSOVAmsS/auth/me", {
        headers: { "Authorization": "Bearer " + token }
    }).then(function (res) { return res.json(); });
};
exports["default"] = getSelf;
