import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const User = db.define(
  "employee",
  {
    name: DataTypes.STRING,
    license_no: DataTypes.STRING,
    age: DataTypes.INTEGER,
    salary: DataTypes.INTEGER,
  },
  {
    freezeTableName: true,
  }
);

export default User;

async () => {
  await db.sync();
};
