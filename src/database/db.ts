import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME as string,
    process.env.DB_USER as string,
    process.env.DB_PASSWORD as string,
    {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        dialect: 'mysql',
        logging: false,
    }
);

export async function connectToDatabase() {
    try {
        await sequelize.authenticate();
        console.log('Connected to the database');
        await sequelize.sync({ force: false });
        console.log('Models sincronized');
        return sequelize;
    } catch (error) {
        console.error('Error connecting to the database:', error);
        throw error;
    }
};
connectToDatabase();

export default sequelize;