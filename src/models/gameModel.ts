import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/db';

class GameModel extends Model {
    public id!: number;
    public name!: string;
    public genre?: string;
}

GameModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(300),
            allowNull: false,
        },
        genre: {
            type: DataTypes.STRING(200),
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: 'Game',
        tableName: 'game',
        timestamps: false,
    }
);

export default GameModel;