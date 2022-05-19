"use strict";
exports.__esModule = true;
var react_1 = require("react");
var _id_1 = require("../pages/group_page/[id]");
var cook_group_module_css_1 = require("../styles/cook_group.module.css");
var JoinButton = function (_a) {
    var value = _a.value, onClick = _a.onClick;
    console.log(value);
    return (react_1["default"].createElement("button", { onClick: onClick, className: cook_group_module_css_1["default"]["" + value] },
        value == _id_1.JoinState.Default && "Join Group",
        value == _id_1.JoinState.Joining && "Joining",
        value == _id_1.JoinState.Joined && "Joined",
        value == _id_1.JoinState.Failed && "Failed"));
};
exports["default"] = JoinButton;
