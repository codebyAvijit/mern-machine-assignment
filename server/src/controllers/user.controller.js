const userService = require("../services/user.service");

const handleCreateUser = async (req, res, next) => {
    try {
        const userData = {
            ...req.body,
            picture: req.file ? req.file.filename : null,
        };

        const user = await userService.createUser(userData);

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: user,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    handleCreateUser,
};