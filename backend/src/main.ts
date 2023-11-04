import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import sequelize from './db/main';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    const db = await sequelize.sync({ alter: true });
    if (db) {
      console.log('Database setup completed');
    }
    await app.listen(3000);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}
bootstrap();
