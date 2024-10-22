import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

export interface JwtPayloadWithRoles {
  userId: number;
  roles: { name: string }[];
}

@Injectable()
export class SuperAdminGuards implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (authHeader) {
      const token = authHeader.split(' ')[1];
      const decodedToken = jwtDecode(token) as JwtPayloadWithRoles;
      return decodedToken.roles[0].name === 'SUPER_ADMIN';
    } else {
      console.log('No Authorization header present');
      return false;
    }
  }
}
