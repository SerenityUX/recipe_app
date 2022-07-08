"use strict";
exports.__esModule = true;
var react_1 = require("react");
var login_1 = require("../pages/login");
var createrecipe_module_css_1 = require("../styles/createrecipe.module.css");
var LoginButton = function (_a) {
    var value = _a.value, onClick = _a.onClick;
    console.log(value);
    return (react_1["default"].createElement("button", { onClick: onClick, className: createrecipe_module_css_1["default"]["" + value] },
        value == login_1.UploadState.Default && "Login",
        value == login_1.UploadState.Uploading && "Checking Credentials",
        value == login_1.UploadState.Uploaded && "Access Granted",
        value == login_1.UploadState.Failed && "Try Again"));
};
exports["default"] = LoginButton;
