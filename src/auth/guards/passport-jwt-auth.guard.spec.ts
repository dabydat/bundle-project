import { PassportJwtAuthGuard } from './passport-jwt-auth.guard';

describe('PassportJwtAuthGuard', () => {
  it('should be defined', () => {
    expect(new PassportJwtAuthGuard()).toBeDefined();
  });
});
