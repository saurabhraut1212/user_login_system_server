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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = require("../models/User");
const token_1 = require("../utils/token");
const registerUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingUser = yield User_1.User.findOne({
            email: data.email,
        });
        if (existingUser)
            return { success: false, message: 'Email already registered' };
        const hashedPassword = yield bcryptjs_1.default.hash(data.password, 10);
        const user = new User_1.User({
            email: data.email,
            password: hashedPassword,
        });
        yield user.save();
        return {
            success: true,
            message: 'User registered successfully',
            data: user,
        };
    }
    catch (error) {
        return { success: false, message: 'Registration failed' };
    }
});
exports.registerUser = registerUser;
const loginUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.User.findOne({ email: data.email });
        if (!user) {
            return { success: false, message: 'Invalid email or password' };
        }
        const isMatch = yield bcryptjs_1.default.compare(data.password, user.password);
        if (!isMatch) {
            return { success: false, message: 'Invalid email or password' };
        }
        const token = (0, token_1.generateToken)(user._id.toString());
        return {
            success: true,
            message: 'Login successful',
            data: { id: user._id, email: user.email }, // avoid sending password
            token,
        };
    }
    catch (error) {
        return { success: false, message: 'Login failed' };
    }
});
exports.loginUser = loginUser;
