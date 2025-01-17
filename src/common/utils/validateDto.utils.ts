import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { HttpException, HttpStatus } from '@nestjs/common';

export async function validateDto<T>(
  dtoClass: new () => T,
  plainObject: object,
): Promise<T> {
  const dto = plainToClass(dtoClass, plainObject);
  const errors = await validate(dto as object);
  if (errors.length > 0) {
    const errorMessages = errors
      .map((error) => Object.values(error.constraints))
      .flat();
    throw new HttpException(
      { message: 'Validation failed', errors: errorMessages },
      HttpStatus.BAD_REQUEST,
    );
  }
  return dto;
}
