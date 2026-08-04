export interface ValidateTokenResponseDto {

    valid: boolean;

    account: {

        id: string;

        email: string;

        createdAt: Date;

    };

}