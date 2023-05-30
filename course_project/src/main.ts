import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {ValidationPipe} from "./pipes/validation.pipe";
import * as express from 'express';
import {join} from "path";
import * as cookieParser from 'cookie-parser';
import * as process from "process";

async function start(){
    const PORT=process.env.PORT || 3000;
    const app=await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
        .setTitle('MyFullStackProject')
        .setDescription('Documentation REST API')
        .setVersion('1.0.0')
        .addTag('Antoha_Man')
        .build()
    const documet = SwaggerModule.createDocument(app,config);
    SwaggerModule.setup('/api/docs',app,documet);
    app.useGlobalPipes(new ValidationPipe())
    app.setGlobalPrefix('api')
    app.enableCors({credentials:true,origin:process.env.CLIENT_URL});
    app.use(cookieParser())


    await app.listen(PORT,()=>console.log(`Server started on PORT = ${PORT}`));
}
start();