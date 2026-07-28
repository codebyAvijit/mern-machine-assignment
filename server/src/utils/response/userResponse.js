const userResponse = (user) => {
  if (!user) return null;

  const userObject =
    typeof user.toObject === "function" ? user.toObject() : user;

  const { password, __v, updatedAt, ...safeUser } = userObject;

  return safeUser;
};

module.exports = userResponse;
