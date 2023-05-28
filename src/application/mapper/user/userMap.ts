import { IUserResponseDTO } from '@DTO/user/IUserResponseDTO';
import { User } from '@Entities/User';
import { instanceToInstance } from 'class-transformer';

export class UserMap {
    static toDTO({
        email,
        name, 
        id, 
        avatar,
        avatar_url,
        driver_license
    }: User): IUserResponseDTO {
        return instanceToInstance({
            email,
            name, 
            id, 
            avatar,
            driver_license,
            avatar_url
        });
    }
}