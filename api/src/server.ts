import dotenv from "dotenv";

dotenv.config();

import { Application } from "./core/Application";

async function bootstrap() {

    const app = new Application();

    await app.start();

}

bootstrap();