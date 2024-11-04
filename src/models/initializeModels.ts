import UserModel from './userModel';
import GameModel from './gameModel';
import UserGameModel from './userGameModel';

UserModel.hasMany(UserGameModel, { foreignKey: 'user_id', as: 'games', onDelete: 'CASCADE' });
GameModel.hasMany(UserGameModel, { foreignKey: 'game_id', as: 'users', onDelete: 'CASCADE' });
UserGameModel.belongsTo(UserModel, { foreignKey: 'user_id', as: 'user' });
UserGameModel.belongsTo(GameModel, { foreignKey: 'game_id', as: 'game' });

export { UserModel, GameModel, UserGameModel };