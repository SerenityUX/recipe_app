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
var getImage_1 = require("../lib/getImage");
var requestSignUp_1 = require("../lib/requestSignUp");
var router_1 = require("next/router");
var sign_up_button_1 = require("../components/sign_up_button");
var UploadState;
(function (UploadState) {
    UploadState["Default"] = "Default";
    UploadState["Uploading"] = "Uploading";
    UploadState["Uploaded"] = "Uploaded";
    UploadState["Failed"] = "Failed";
})(UploadState = exports.UploadState || (exports.UploadState = {}));
var Signup = function () {
    var _a = react_1.useState(UploadState.Default), isUploading = _a[0], setIsUploading = _a[1];
    var router = router_1.useRouter();
    var _b = react_1.useState([]), images = _b[0], setImages = _b[1];
    var _c = react_1.useState([]), imageURLs = _c[0], setImageURLs = _c[1];
    var textArea = react_1.useRef();
    var _d = react_1.useState(""), email = _d[0], setEmail = _d[1];
    var _e = react_1.useState(""), password = _e[0], setPassword = _e[1];
    var _f = react_1.useState(""), nameInput = _f[0], setNameInput = _f[1];
    var _g = react_1.useState(""), phoneInput = _g[0], setPhoneInput = _g[1];
    var onTextAreaChange = function () {
        var value = textArea.current.value;
        textArea.current.style.height = "5px";
        textArea.current.style.height = textArea.current.scrollHeight + "px";
        setNameInput(value.replaceAll("\n", ""));
    };
    react_1.useEffect(function () {
        if (images.length < 1)
            return;
        var newImagesUrls = [];
        images.forEach(function (image) { return newImagesUrls.push(URL.createObjectURL(image)); });
        setImageURLs(newImagesUrls);
    }, [images]);
    var handleProfileChange = function (event) {
        setImages(Array.from(event.target.files));
    };
    var attemptSignup = function () { return __awaiter(void 0, void 0, void 0, function () {
        var formData, _a, image, imageError, _b, token, userError;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    setIsUploading(UploadState.Uploading);
                    formData = new FormData();
                    formData.append("image_url", images[0]);
                    return [4 /*yield*/, getImage_1["default"](formData)];
                case 1:
                    _a = _c.sent(), image = _a[0], imageError = _a[1];
                    if (imageError) {
                        setIsUploading(UploadState.Failed);
                    }
                    if (imageError)
                        return [2 /*return*/, alert("Error - Missing Profile Picture. Upload a profile picture and try again")];
                    return [4 /*yield*/, requestSignUp_1["default"]({
                            email: email,
                            password: password,
                            phone_number: phoneInput,
                            name: nameInput,
                            profile_picture: image
                        })];
                case 2:
                    _b = (_c.sent()), token = _b[0], userError = _b[1];
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
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement("div", { className: login_signup_module_css_1["default"].top_bar },
            react_1["default"].createElement("div", { className: login_signup_module_css_1["default"].navcontainer },
                react_1["default"].createElement(link_1["default"], { href: "/login" },
                    react_1["default"].createElement("p", { className: login_signup_module_css_1["default"].unselected_nav }, "Login")),
                react_1["default"].createElement(link_1["default"], { href: "/signup" },
                    react_1["default"].createElement("p", { className: login_signup_module_css_1["default"].selected_nav }, "Sign Up")))),
        react_1["default"].createElement("h1", { className: login_signup_module_css_1["default"].title }, "Create Your Meal Pack"),
        react_1["default"].createElement("div", { className: login_signup_module_css_1["default"].profile },
            react_1["default"].createElement("label", { className: login_signup_module_css_1["default"].profile },
                react_1["default"].createElement("div", { className: login_signup_module_css_1["default"].upload_container },
                    react_1["default"].createElement("img", { src: imageURLs[0], className: login_signup_module_css_1["default"].profile_preview }),
                    react_1["default"].createElement("img", { src: "https://i.ibb.co/TRYVf5F/icon.png", className: login_signup_module_css_1["default"].upload_button }),
                    ""),
                react_1["default"].createElement("input", { type: "file", accept: "image/*", className: login_signup_module_css_1["default"].upload_image, onChange: handleProfileChange })),
            react_1["default"].createElement("div", { className: login_signup_module_css_1["default"].stack },
                react_1["default"].createElement("textarea", { value: nameInput, ref: textArea, onChange: onTextAreaChange, className: login_signup_module_css_1["default"].nameInput, placeholder: "First and last name", name: "", id: "" }),
                react_1["default"].createElement("input", { type: "tel", placeholder: "Phone Number (optional)", value: phoneInput, onChange: function (event) { return setPhoneInput(event.target.value); }, className: login_signup_module_css_1["default"].phoneInput }))),
        react_1["default"].createElement("div", { className: login_signup_module_css_1["default"].inputgroup },
            react_1["default"].createElement("label", { htmlFor: "email", className: login_signup_module_css_1["default"].inputlabel }, "Email Address"),
            react_1["default"].createElement("input", { value: email, onChange: function (event) { return setEmail(event.target.value); }, type: "email", id: "email", name: "email" })),
        react_1["default"].createElement("div", { className: login_signup_module_css_1["default"].inputgroup },
            react_1["default"].createElement("label", { htmlFor: "password", className: login_signup_module_css_1["default"].inputlabel }, "Password"),
            react_1["default"].createElement("input", { className: login_signup_module_css_1["default"].inputcreds, value: password, onChange: function (event) {
                    setPassword(event.target.value);
                    setIsUploading(UploadState.Default);
                }, type: "password", id: "password", name: "password" }),
            react_1["default"].createElement(sign_up_button_1["default"], { value: isUploading, onClick: function () {
                    attemptSignup();
                } }),
            react_1["default"].createElement("div", { className: login_signup_module_css_1["default"].bottomtextholder },
                react_1["default"].createElement("text", { className: login_signup_module_css_1["default"].bottomtext },
                    "By clicking Sign Up you agree to our ",
                    react_1["default"].createElement("a", { className: login_signup_module_css_1["default"].terms, href: "https://mealpack-terms.superhi.com" }, "Terms And Conditions"),
                    ".")))));
};
exports["default"] = Signup;
