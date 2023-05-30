import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException
} from "@nestjs/common";
import {Observable} from "rxjs";
import {JwtService} from "@nestjs/jwt";
import {Roles, ROLES_KEY} from "./roles-auth.decorator";
import {Reflector} from "@nestjs/core";
import {Role} from "../roles/roles.model";
import {eRole} from "../roles/role.enum";

@Injectable()
export class RolesGuard implements CanActivate{
    constructor(private jwtService:JwtService,
                private reflector:Reflector) {
    }
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

        try{
            const requiredRoles=this.reflector.getAllAndOverride<eRole[]>(ROLES_KEY,[
                context.getHandler(),
                context.getClass(),
            ])
            if(!requiredRoles){
                return true;
            }
            const req=context.switchToHttp().getRequest();
            console.log(req.user.roles)
            const rolesValue = req.user.roles.map((role: Role) => role.value)
            return requiredRoles.some((role) => rolesValue.includes(role));
        }
        catch (e){
            throw new HttpException("No access",HttpStatus.FORBIDDEN);
        }
    }

}