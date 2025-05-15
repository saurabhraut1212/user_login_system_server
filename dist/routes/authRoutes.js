"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const validateRequest_1 = require("../middlewares/validateRequest");
const authValidation_1 = require("../validations/authValidation");
const router = express_1.default.Router();
router.post('/register', (0, validateRequest_1.validateRequest)(authValidation_1.registerSchema), authController_1.register);
router.post('/login', (0, validateRequest_1.validateRequest)(authValidation_1.loginSchema), authController_1.login);
exports.default = router;
