import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { Injectable } from '@nestjs/common';
var cookieExtractor = function(req:any) {
    var token = null;
    if (req && req.cookies)
    {
        token = req.cookies['refreshToken'];
    }
    return token;
};
@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
    Strategy,
    'jwt-refresh',
) {
    constructor() {
        super({
            jwtFromRequest:cookieExtractor,
            secretOrKey: process.env.JWT_REFRESH_SECRET,
            passReqToCallback: true,
        });
    }

    validate(req: Request, payload: any) {
        //const refreshToken = req.get('Authorization')?.replace('Bearer', '').trim();
        const refreshToken = req.cookies.refreshToken;
        return { ...payload, refreshToken };
    }
}