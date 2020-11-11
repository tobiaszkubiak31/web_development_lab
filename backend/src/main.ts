import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

dotenv.config();
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //SWAGGER INIT
  const options = new DocumentBuilder()
    .setTitle('Trello example')
    .setDescription('The trello API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  //ENABLE CORS
  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Accept,Authorization,authorization',
    credentials: false,
  });
  //ENABLE HOT RELOAD
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
  //RUN APP
  await app.listen(process.env.PORT);
}
bootstrap();
