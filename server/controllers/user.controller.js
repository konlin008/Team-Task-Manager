export const register = async (req, res) => {
  try {
    return res.status(200).json({ message: "returning from register" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
