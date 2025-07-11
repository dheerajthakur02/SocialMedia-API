import User from "../models/user.model.js";

const roleAuth = (roles) => async (req, res, next) => {
  try {
    const id = req.id;
    const person = await User.findById(id);

    const isRoleMatched = roles.includes(person.role);
    if (!isRoleMatched) {
      return res
        .status(400)
        .json({ message: "you are not authorised to access" });
    }
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
export default roleAuth;
