import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/db';
import UserGameModel from './userGameModel';

class UserModel extends Model {
  public id!: number;
  public username!: string;
  public password!: string;
  public email!: string;
  public name!: string;
  public lastname?: string;
}

UserModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING(300),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'user',
    timestamps: false,
  }
);

UserModel.hasMany(UserGameModel, { foreignKey: 'user_id', onDelete: 'CASCADE' });

export default UserModel;