const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const handleResponse = require('../utils/handleResponse');
const errorHandler = require('../middlewares/errorHandler');

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return handleResponse(res, 400, 'All fields are required');
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return handleResponse(res, 409, 'User with this email already exists');
        }

        const encodedPassword = await bcrypt.hash(password, 10)

        const newUser = new User({ name, email, password: encodedPassword });
        await newUser.save();

        return handleResponse(res, 201, 'User registered', { loggedUser: name });
    } catch (error) {
        errorHandler(res, error);
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return handleResponse(res, 400, 'Email and password are required');
        }

        const user = await User.findOne({ email });
        if (!user) {
            return handleResponse(res, 401, 'Invalid credentials');
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if (!isPasswordMatch) {
            return handleResponse(res, 401, 'Invalid credentials');
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

        return handleResponse(res, 200, "You've logged in successfully", { userId: user._id, loggedUser: user.name, token });

    } catch (error) {
        errorHandler(res, error);
    }
};

const settings = async (req, res) => {
    try {
        const { name, oldPassword, newPassword } = req.body;
        const userId = req.body.userId;

        if (!oldPassword || !newPassword) {
            return handleResponse(res, 400, 'Password fields are required');
        }

        const user = await User.findOne({ _id: userId });
        if (!user) {
            return handleResponse(res, 404, 'User not found');
        }

        user.name = name || user.name;

        // Compare the old password
        const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isPasswordMatch) {
            return handleResponse(res, 401, 'Incorrect old password');
        }

        // Check if the old password and new password are the same
        const isSamePassword = await bcrypt.compare(newPassword, user.password);
        if (isSamePassword) {
            return handleResponse(res, 400, 'New password must be different from old password');
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedNewPassword;
        await user.save();

        return handleResponse(res, 200, 'Details updated');
    } catch (error) {
        errorHandler(res, error);
    }
};

module.exports = { register, login, settings };
