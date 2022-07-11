"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.UploadState = void 0;
var login_signup_module_css_1 = require("../styles/login_signup.module.css");
var react_1 = require("react");
var link_1 = require("next/link");
var router_1 = require("next/router");
var requestLogin_1 = require("../lib/requestLogin");
var login_button_1 = require("../components/login_button");
var UploadState;
(function (UploadState) {
    UploadState["Default"] = "Default";
    UploadState["Uploading"] = "Uploading";
    UploadState["Uploaded"] = "Uploaded";
    UploadState["Failed"] = "Failed";
})(UploadState = exports.UploadState || (exports.UploadState = {}));
var Login = function () {
    var _a = react_1.useState(UploadState.Default), isUploading = _a[0], setIsUploading = _a[1];
    var router = router_1.useRouter();
    var email = react_1.useRef(null);
    var password = react_1.useRef(null);
    var attemptLogin = function () { return __awaiter(void 0, void 0, void 0, function () {
        var formData, _a, token, userError;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    formData = new FormData();
                    setIsUploading(UploadState.Uploading);
                    return [4 /*yield*/, requestLogin_1["default"]({
                            email: email.current.value,
                            password: password.current.value
                        })];
                case 1:
                    _a = (_b.sent()), token = _a[0], userError = _a[1];
                    if (userError) {
                        setIsUploading(UploadState.Failed);
                    }
                    else {
                        setIsUploading(UploadState.Uploaded);
                    }
                    if (userError)
                        return [2 /*return*/, alert(userError)];
                    document.cookie = "token=" + token + "; expires=Wed, 05 Aug 2035 23:00:00 UTC\""; // fix this, this really bad --Yofou
                    router.push("/");
                    return [2 /*return*/];
            }
        });
    }); };
    /*     fetch("https://xxm8-77n0-ua23.n7.xano.io/api:lSOVAmsS/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.current.value,
          password: password.current.value,
        }),
      })
        .then(async function (response) {
          return response.json();
        })
        .then(async function (total) {
          document.cookie = `token=${
            total.authToken
          }; expires=Wed, 05 Aug 2035 23:00:00 UTC"`
          return total.authToken;
        })
        router.push("/")
    }; */
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement("div", { className: login_signup_module_css_1["default"].top_bar },
            react_1["default"].createElement("div", { className: login_signup_module_css_1["default"].navcontainer },
                react_1["default"].createElement(link_1["default"], { href: "/login" },
                    react_1["default"].createElement("p", { className: login_signup_module_css_1["default"].selected_nav }, "Login")),
                react_1["default"].createElement(link_1["default"], { href: "/signup" },
                    react_1["default"].createElement("p", { className: login_signup_module_css_1["default"].unselected_nav }, "Sign Up")))),
        react_1["default"].createElement("h1", { className: login_signup_module_css_1["default"].title }, "Welcome Back"),
        react_1["default"].createElement("div", { className: login_signup_module_css_1["default"].inputgroup },
            react_1["default"].createElement("label", { className: login_signup_module_css_1["default"].inputlabel }, "Email Address"),
            react_1["default"].createElement("input", { ref: email, type: "email", id: "email", name: "email" })),
        react_1["default"].createElement("div", { className: login_signup_module_css_1["default"].inputgroup },
            react_1["default"].createElement("label", { className: login_signup_module_css_1["default"].inputlabel }, "Password"),
            react_1["default"].createElement("input", { ref: password, className: login_signup_module_css_1["default"].inputcreds, type: "password", id: "password", name: "password" }),
            react_1["default"].createElement(login_button_1["default"], { value: isUploading, onClick: function () {
                    attemptLogin();
                } }))));
};
exports["default"] = Login;
