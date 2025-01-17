import { Repository } from 'typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';

export async function queryOne<T>(
  repository: Repository<T>,
  query: object,
  table: string = 'Record',
): Promise<T | undefined> {
  const record = await repository.findOne(query);
  if (!record) {
    throw new HttpException(`${table} not found`, HttpStatus.NOT_FOUND);
  }
  return record;
}
