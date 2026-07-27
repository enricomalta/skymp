import { Environment } from "./Environment";

export class Config {

    public static readonly server = {

        port: Environment.PORT,

        environment: Environment.NODE_ENV

    };

    public static readonly database = {

        uri: Environment.MONGO_URI

    };

    public static readonly jwt = {

        secret: Environment.JWT_SECRET

    };

}