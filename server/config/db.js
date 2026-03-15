import mongoose from "mongoose";
import chalk from "chalk";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(chalk.bgGreen("Database Connected"));
  } catch (error) {
    console.error(chalk.bgRed("DB connection failed:", error.message));
    process.exit(1);
  }
};
export default connectDb;
