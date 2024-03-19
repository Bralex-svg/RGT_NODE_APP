import { DataTypes, Model, ModelAttributes } from "sequelize";
// Define a custom interface that extends Model
interface StudentModel extends Model {
  firstName: string;
  lastName: string;
  email: string;
}
// Define the attributes for the Student model
const studentSchema: ModelAttributes<StudentModel> = {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
};
export default studentSchema;