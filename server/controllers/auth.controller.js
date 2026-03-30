import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    if (!email || !password || !name) {
      return res.status(400).json({ message: "All Fields Are Required" });
    }
    const existingUser = await User.findOne({ email: email });
    if (existingUser)
      return res
        .status(202)
        .json({ message: "Email Already Registered !please Login" });
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = User.create({ email, password: hashedPassword, name });
    if (newUser) {
      return res
        .status(200)
        .json({ message: "Registered successfully !Please Login" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server Error",
    });
  }
};
export const login = async (req, res) => {
  try {
    console.log("hited");
    console.log(req.body);
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All Fields Are Required" });
    }
    const user = await User.findOne({ email: email });
    if (!user) return res.status(404).json({ message: "User Not Found" });
    const checkedPassword = bcrypt.compare(password, user.password);
    if (!checkedPassword)
      return res.status(401).json({ message: "Email or Password Invalid" });
    const token = generateToken(user._id);
    return res
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({
        message: "Login successful",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          avatar: user.avatar || "",
        },
      });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export const googleAuthCallback = async (req, res) => {
  try {
    const userId = req.user._id;
    const token = generateToken(userId);
    return res
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .redirect("http://localhost:5173/");
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
