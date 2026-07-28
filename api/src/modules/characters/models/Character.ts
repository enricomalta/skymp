export interface Character {

    id: string;

    accountId: string;

    name: string;

    race: string;

    sex: "male" | "female";

    level: number;

    createdAt: Date;

}