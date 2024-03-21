import { DataTypes, Model, ModelAttributes } from "sequelize";
// Define a custom interface that extends Model
interface UserModel extends Model {
  email: string;
  password: string;
}
// Define the attributes for the Student model
const userSchema: ModelAttributes<UserModel> = {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
};
export default userSchema;