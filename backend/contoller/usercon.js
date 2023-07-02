const userModel = require("../models/usermod");
const jwt = require("jsonwebtoken");
const forMail = require('../forMail')




const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "1d" });
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

  // const salt=bycryt.salt(10)
  // const hash=bycryt.hash(password,salt)

  try {
    const user = await userModel.signup(email, password);
    return res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const forgetPassword = async (req, res) => {
  const { email } = req.body;
  console.log(email);
  const user = await userModel.findOne({ email })
  if (!user) {
    // res.status(400).json('User not found')
    throw Error('User not found')
  }
  try {
    const resetCryptoToken = await user.createTokenCrypto();
    const resetLink = `http://localhost:3000/users/forget/${resetCryptoToken}`
    await forMail(email, resetLink)
    return res.status(200).json({ resetLink, resetCryptoToken });
  } catch (error) {
    console.log(error);
  }
}

const updatePassword = async (req, res) => {
  try {
    const { token } = req.params
    // console.log(token);
    const { password } = req.body;
    const user = await userModel.findOne({ cryptoToken: token })
    if (!user) {
      throw Error('Invalid token')
    }
    await user.updatePassword(password);
    return res.status(200).send(password);
  } catch (error) {
    console.log(error);
  }
}

module.exports = { forLogin, forSignup, forgetPassword, updatePassword };
