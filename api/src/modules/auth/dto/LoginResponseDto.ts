export interface LoginResponseDto {

    token: string;

    account: {

        id: string;

        email: string;

        createdAt: Date;

    };

}