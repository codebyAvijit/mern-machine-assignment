const authRepository = require("../repositories/auth.repository");
const userRepository = require("../repositories/user.repository");
const stateRepository = require("../repositories/state.repository");

const jwtService = require("../utils/jwt/jwt");

// Factory Functions
const createAuthService = require("../services/auth.service");
const createUserService = require("../services/user.service");

const createAuthController = require("../controllers/auth.controller");
const createUserController = require("../controllers/user.controller");

/*
|--------------------------------------------------------------------------
| Services
|--------------------------------------------------------------------------
*/

const authService = createAuthService({
  authRepository,
  jwtService,
});

const userService = createUserService({
  userRepository,
  stateRepository,
});

/*
|--------------------------------------------------------------------------
| Controllers
|--------------------------------------------------------------------------
*/

const authController = createAuthController({
  authService,
});

const userController = createUserController({
  userService,
});

module.exports = {
  authController,
  userController,
};
