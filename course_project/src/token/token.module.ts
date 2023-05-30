import {forwardRef, Module} from "@nestjs/common";
import {TokenService} from "./token.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Token} from "./token-model";
import {UsersService} from "../users/users.service";
import {UsersModule} from "../users/users.module";


@Module({
    providers:[TokenService],
    imports:[TypeOrmModule.forFeature([Token]),UsersModule],
    exports:[TokenService]
})
export class TokenModule{}