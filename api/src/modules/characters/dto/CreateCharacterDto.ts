export interface CreateCharacterDto {

    accountId: string;

    name: string;

    race: string;

    sex: "male" | "female";

}