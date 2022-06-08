"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_modal_1 = require("react-modal");
var recipeview_module_css_1 = require("../styles/recipeview.module.css");
var SmartText = function (_a) {
    var value = _a.value, onClick = _a.onClick;
    var _b = react_1.useState(false), conversionmodalIsOpen = _b[0], setConversionModalIsOpen = _b[1];
    var _c = react_1.useState(0), conversionmodalXPosition = _c[0], setConversionModalXPosition = _c[1];
    var _d = react_1.useState(0), conversionmodalYPosition = _d[0], setConversionModalYPosition = _d[1];
    var _e = react_1.useState(0), conversionmodalAmount = _e[0], setConversionModalAmount = _e[1];
    var _f = react_1.useState("cups"), conversionmodalUnit = _f[0], setConversionModalUnit = _f[1];
    var onScroll = function (e) {
        setConversionModalIsOpen(false);
    };
    react_1.useEffect(function () {
        window.addEventListener('scroll', onScroll);
    }, []);
    return (react_1["default"].createElement("text", { onClick: onClick },
        react_1["default"].createElement(react_modal_1["default"], { className: recipeview_module_css_1["default"].shareModal, isOpen: conversionmodalIsOpen, onRequestClose: function () { return setConversionModalIsOpen(false); }, preventScroll: true, style: {
                overlay: {
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgba(255, 255, 255, 0.0)"
                },
                content: {
                    "border-radius": "12px",
                    position: "absolute",
                    top: conversionmodalYPosition,
                    right: "0px",
                    left: conversionmodalXPosition,
                    bottom: "0px",
                    border: "none",
                    background: "#F1F3F4",
                    width: "fit-content",
                    "box-shadow": "4px 5px 20px rgba(0, 0, 0, 0.25)",
                    overflow: "none",
                    WebkitOverflowScrolling: "touch",
                    outline: "none",
                    padding: "12px",
                    height: "136px",
                    "z-index": "150",
                    cursor: "pointer"
                }
            } },
            react_1["default"].createElement("div", { className: recipeview_module_css_1["default"].conversionModalContent },
                react_1["default"].createElement("p", null,
                    conversionmodalAmount,
                    " ",
                    conversionmodalUnit,
                    " ",
                    react_1["default"].createElement("text", { className: recipeview_module_css_1["default"].lessImportant }, " is equal to")),
                react_1["default"].createElement("p", null,
                    conversionmodalAmount * 8,
                    " Ounces"),
                react_1["default"].createElement("p", null,
                    conversionmodalAmount * 16,
                    " Tablespoons"),
                react_1["default"].createElement("p", null,
                    conversionmodalAmount * 250,
                    " Milileters"))),
        value.split(" ").map(function (item, index) {
            if (item == "cups" || item == "cup") {
                if (Number.parseFloat(value.split(" ")[index - 1]) != 0) {
                    return (react_1["default"].createElement("text", null));
                }
            }
            if (Number.parseFloat(value.split(" ")[index - 1]) != 0) {
                if (value.split(" ")[index + 1] == "cups" || value.split(" ")[index + 1] == "cup") {
                    var unit_1 = value.split(" ")[index + 1];
                    var amount_1 = value.split(" ")[index];
                    return (react_1["default"].createElement("text", { className: recipeview_module_css_1["default"].clickablecontainer, onClick: function (context) {
                            console.log(context.pageX);
                            console.log(context.pageY);
                            if (unit_1 == "cup" || unit_1 == "cups") {
                                if (amount_1.includes("/")) {
                                    var fraction = amount_1.split("/");
                                    var first = Number(fraction[0]);
                                    var second = Number(fraction[1]);
                                    var cups = Number(first / second).toFixed(2);
                                    var ounces = Number(cups) * 8;
                                    var tablespoons = Number(ounces) * 2;
                                    var milileters = Number(cups) * 250;
                                    console.log(cups + " " + unit_1 + " is equal to " + ounces + " ounces, " + tablespoons + " tablespoons, and " + milileters + " Milileters");
                                    setConversionModalAmount(Number(cups));
                                    if (unit_1 == "cups") {
                                        setConversionModalUnit("Cups");
                                    }
                                    if (unit_1 == "cup") {
                                        setConversionModalUnit("Cup");
                                    }
                                    setConversionModalXPosition(context.clientX - 8);
                                    setConversionModalYPosition(context.clientY - 154);
                                    console.log(context.clientX);
                                    setConversionModalIsOpen(true);
                                    console.log(conversionmodalIsOpen);
                                    console.log(cups + " " + unit_1 + " is equal to " + ounces + " ounces, " + tablespoons + " tablespoons, and " + milileters + " Milileters");
                                }
                                else {
                                    var cups = Number(amount_1);
                                    var ounces = Number(cups) * 8;
                                    var tablespoons = Number(ounces) * 2;
                                    var milileters = Number(cups) * 250;
                                    console.log(cups + " " + unit_1 + " is equal to " + ounces + " ounces, " + tablespoons + " tablespoons, and " + milileters + " Milileters");
                                    setConversionModalAmount(Number(cups));
                                    if (unit_1 == "cups") {
                                        setConversionModalUnit("Cups");
                                    }
                                    if (unit_1 == "cup") {
                                        setConversionModalUnit("Cup");
                                    }
                                    setConversionModalXPosition(context.clientX - 8);
                                    setConversionModalYPosition(context.clientY - 154);
                                    console.log(context.clientX);
                                    setConversionModalIsOpen(true);
                                    console.log(conversionmodalIsOpen);
                                }
                            }
                        } },
                        react_1["default"].createElement("text", { className: recipeview_module_css_1["default"].clickable }, item),
                        react_1["default"].createElement("text", null, " "),
                        react_1["default"].createElement("text", { className: recipeview_module_css_1["default"].clickable }, value.split(" ")[index + 1]),
                        react_1["default"].createElement("text", null, " ")));
                }
                else {
                    return item + " ";
                }
            }
            else {
                return item + " ";
            }
        })));
};
exports["default"] = SmartText;
