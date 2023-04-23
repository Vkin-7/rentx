export interface IAuthenticatedUserDTO {
    user: {
        name: string;
        email: string;
    },
    token: string;
    refresh_token: string;
}