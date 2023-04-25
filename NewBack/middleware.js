const jwt = require("jsonwebtoken");
const todoSchema = require("./models/usermod");

const protectRoute = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: "Authorization token required" });
  }
  const token = authorization.split(" ")[1];
  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    req.user = await todoSchema.findOne({ _id }).select("_id");
    console.log(req.user);
    next();
  } catch (error) {
    res.status(401).json({ message: "Require is not authorzation" });
  }
};

module.exports = protectRoute;
