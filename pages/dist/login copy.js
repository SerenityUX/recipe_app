"use strict";
exports.__esModule = true;
var login_signup_module_css_1 = require("../styles/login_signup.module.css");
var react_1 = require("react");
var link_1 = require("next/link");
var router_1 = require("next/router");
var Landing = function () {
    var router = router_1.useRouter();
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement("div", { className: login_signup_module_css_1["default"].top_bar },
            react_1["default"].createElement("div", { className: login_signup_module_css_1["default"].navcontainer },
                react_1["default"].createElement(link_1["default"], { href: "/login" },
                    react_1["default"].createElement("p", { className: login_signup_module_css_1["default"].selected_nav }, "Login")),
                react_1["default"].createElement(link_1["default"], { href: "/signup" },
                    react_1["default"].createElement("p", { className: login_signup_module_css_1["default"].unselected_nav }, "Sign Up")))),
        react_1["default"].createElement("h1", { className: login_signup_module_css_1["default"].title }, "Welcome Back")));
};
exports["default"] = Landing;
