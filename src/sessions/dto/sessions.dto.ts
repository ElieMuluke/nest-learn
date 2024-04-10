import { PartialType } from '@nestjs/mapped-types';

export class SessionCreateInput {
  currentUserId: number;
  accessToken: string;
  refreshToken: string;
}

export class SessionUpdateInput extends PartialType(SessionCreateInput) {}
