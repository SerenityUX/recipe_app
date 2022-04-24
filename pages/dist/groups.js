"use strict";
exports.__esModule = true;
var Home_module_css_1 = require("../styles/Home.module.css");
var link_1 = require("next/link");
var react_1 = require("react");
var image_1 = require("next/image");
var recipesicon_unselected_svg_1 = require("../assets/recipesicon_unselected.svg");
var groups_svg_1 = require("../assets/groups.svg");
var animationvariants = {
    hidden: {
        opacity: 0.01
    },
    visible: { opacity: 1, x: 0 }
};
var animationvariantsbuttons = {
    hidden: {
        opacity: 0.01,
        scale: 0.0
    },
    visible: { opacity: 1, scale: 1 }
};
var Groups = function () {
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement("div", { className: Home_module_css_1["default"].fixedtopbar },
            react_1["default"].createElement("div", { className: Home_module_css_1["default"].topbar },
                react_1["default"].createElement("h1", { className: Home_module_css_1["default"].maintitle }, "Meal Pack")),
            react_1["default"].createElement("nav", { className: Home_module_css_1["default"].navbar },
                react_1["default"].createElement(link_1["default"], { href: "/" },
                    react_1["default"].createElement("div", { className: Home_module_css_1["default"].navoption },
                        react_1["default"].createElement(image_1["default"], { src: recipesicon_unselected_svg_1["default"], width: 24, height: 24 }),
                        react_1["default"].createElement("p", null, "Recipes"))),
                react_1["default"].createElement(link_1["default"], { href: "/grocery_list" },
                    react_1["default"].createElement("div", { className: Home_module_css_1["default"].navoption },
                        react_1["default"].createElement(image_1["default"], { src: groups_svg_1["default"], width: 24, height: 24 }),
                        react_1["default"].createElement("p", { className: Home_module_css_1["default"].selectednav }, "Groups"))),
                react_1["default"].createElement(link_1["default"], { href: "/grocery_list" },
                    react_1["default"].createElement("div", { className: Home_module_css_1["default"].navoption },
                        react_1["default"].createElement("p", null, "Profile"))))),
        react_1["default"].createElement("div", { className: Home_module_css_1["default"].spacer })));
};
exports["default"] = Groups;
