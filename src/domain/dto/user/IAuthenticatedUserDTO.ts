export interface IAuthenticatedUserDTO {
    user: {
        name: string;
        email: string;
    },
    token: string;
}