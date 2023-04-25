const userModel = require("../models/usermod");
const jwt = require("jsonwebtoken");
const forMail = require('../forMail')




const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

const forLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.login(email, password);
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const forSignup = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.signup(email, password);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const forgetPassword = async (req, res) => {
  const { email } = req.body;
  const user = await userModel.findOne({ email })
  if (!user) {
    // res.status(400).json('User not found')
    throw Error('User not found')
  }
  try {
    const resetCryptoToken = await user.createTokenCrypto();
    const resetLink = `http://localhost:3000/users/forget/${resetCryptoToken}`
    forMail(email, resetLink)
    return res.status(200).json(resetLink);
  } catch (error) {
    console.log(error);
  }
}

const updatePassword = async (req, res) => {
  try {
    // const {token}=req.params
    // console.log(token);
    const { password,token } = req.body;
    console.log(password);
    const user = await userModel.findOne({ resetPassword: token })
    console.log(user);
    if (!user) {
      // res.status(400).json('Invalid token')
      throw Error('Invalid token')
    }
    await user.updatePassword(password);
    return res.status(200).send(password);
  } catch (error) {
    console.log(error);
  }
}

module.exports = { forLogin, forSignup, forgetPassword,updatePassword };
