import jwt from "jsonwebtoken";

import { Account } from "./models/Account";

export class JwtService {

    private readonly secret: string;

    constructor() {

        this.secret = process.env.JWT_SECRET ?? "terras-alem-dev-secret";

    }

    public generate(
        account: Account
    ): string {

        return jwt.sign(

            {

                accountId: account.id,

                email: account.email

            },

            this.secret,

            {

                expiresIn: "7d"

            }

        );

    }

    public validate(
        token: string
    ): jwt.JwtPayload {

        return jwt.verify(

            token,

            this.secret

        ) as jwt.JwtPayload;

    }

}