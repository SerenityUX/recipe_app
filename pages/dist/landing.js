"use strict";
exports.__esModule = true;
var landing_module_css_1 = require("../styles/landing.module.css");
var react_1 = require("react");
var main_image_png_1 = require("../assets/main_image.png");
var image_1 = require("next/image");
var link_1 = require("next/link");
var router_1 = require("next/router");
var Landing = function () {
    var router = router_1.useRouter();
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement("div", { className: landing_module_css_1["default"].top_bar },
            react_1["default"].createElement("div", { className: landing_module_css_1["default"].navcontainer },
                react_1["default"].createElement("div", { className: landing_module_css_1["default"].left },
                    react_1["default"].createElement(link_1["default"], { href: "/landing" },
                        react_1["default"].createElement("p", { className: landing_module_css_1["default"].home_nav }, "Meal Pack"))),
                react_1["default"].createElement("div", { className: landing_module_css_1["default"].right },
                    react_1["default"].createElement(link_1["default"], { href: "/login" },
                        react_1["default"].createElement("p", { className: landing_module_css_1["default"].selected_nav }, "Login")),
                    react_1["default"].createElement(link_1["default"], { href: "/signup" },
                        react_1["default"].createElement("p", { className: landing_module_css_1["default"].unselected_nav }, "Sign Up"))))),
        react_1["default"].createElement("div", { className: landing_module_css_1["default"].contentsectionfirst },
            react_1["default"].createElement(image_1["default"], { src: main_image_png_1["default"], className: landing_module_css_1["default"].majorthumbnail }),
            react_1["default"].createElement("h1", { className: landing_module_css_1["default"].smallertitle }, "Empowering Home Chefs to Create, Store, and Share Intimate Recipes"),
            react_1["default"].createElement("p", { className: landing_module_css_1["default"].paragraph_text }, "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit."),
            react_1["default"].createElement(link_1["default"], { href: "/signup" },
                react_1["default"].createElement("button", { className: landing_module_css_1["default"].sign_up_button }, "Create my Meal Pack")))));
};
exports["default"] = Landing;
