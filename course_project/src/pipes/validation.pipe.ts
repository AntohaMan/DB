import {
    PipeTransform,
    Injectable,
    ArgumentMetadata,
    BadRequestException,
    HttpException,
    HttpStatus
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
    async transform(value: any, { metatype }: ArgumentMetadata) {
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }
        const object = plainToInstance(metatype, value);
        const errors = await validate(object);

        if (errors.length > 0) {
            const messages = errors.map((err) => {
                return `${err.property} - ${Object.values(
                    err.constraints!,
                ).join(', ')}`;
            });
            throw new HttpException({message:messages.join('. ')}, HttpStatus.BAD_REQUEST);
        }
        return value;
    }

    private toValidate(metatype: Function): boolean {
        const types: Function[] = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype);
    }
}