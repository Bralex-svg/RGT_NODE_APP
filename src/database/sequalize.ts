           //@BRA_LEX😙
import { Dialect, Sequelize, DataTypes } from 'sequelize';

class Database {
  sequelize: Sequelize;
  ParentModel: any;
  ChildModel: any;

  constructor(
    databaseName: string = 'alexdb',
    userName: string = 'alex',
    password: string = 'alexadam269',
    host: string = 'localhost',
    dialect: Dialect = 'postgres'
  ) {
    this.sequelize = new Sequelize(databaseName, userName, password, {
      host,
      dialect,
    });
    
    // This is the Parent Model definition
    this.ParentModel = this.sequelize.define('ParentModel', {
        
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    });

    // Child model is defined by extending parent model
    this.ChildModel = this.sequelize.define('ChildModel', {
      additionalProperty: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    }, {
      // Additional options specific to ChildModel
    });

    // Establish the association between ParentModel and ChildModel
    this.ParentModel.hasMany(this.ChildModel);
    this.ChildModel.belongsTo(this.ParentModel);
  }

  // Example method to create records
  async createRecords() {
    
    await this.sequelize.sync({ force: true }); // This will create the tables in the database

    // Create a record using ParentModel
    const parentInstance = await this.ParentModel.create({ name: 'John', age: 30 });

    // Create a record using ChildModel
    const childInstance = await this.ChildModel.create({
      name: 'Alice',
      age: 25,
      additionalProperty: 'Some value',
    });

    console.log(parentInstance.toJSON());
    console.log(childInstance.toJSON());
  }
}

// Example usage:
const database = new Database();
database.createRecords();
