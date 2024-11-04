import { DataTypes, Model, ForeignKey } from 'sequelize';
import sequelize from '../database/db';
import UserModel from './userModel';
import GameModel from './gameModel';

class UserGameModel extends Model {
    public id!: number;
    public user_id!: ForeignKey<UserModel['id']>;
    public game_id!: ForeignKey<GameModel['id']>;
    public wins?: number;
    public losses?: number;
    public draws?: number;
    public score?: number;
}

UserGameModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: UserModel,
                key: 'id',
            },
        },
        game_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: GameModel,
                key: 'id',
            },
        },
        wins: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
        },
        losses: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
        },
        draws: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
        },
        score: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
        },
    },
    {
        sequelize,
        modelName: 'UserGame',
        tableName: 'user_game',
        timestamps: false,
    }
);

export default UserGameModel;