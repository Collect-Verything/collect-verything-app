import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { ROLENAME } from '../enum';

export interface JwtPayloadWithRoles {
  id: number;
  role: string;
}

@Injectable()
export class SuperAdminGuards implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader: Request = request.headers.authorization;

    if (authHeader) {
      const token = String(authHeader).split(' ')[1];
      const decodedToken = jwtDecode(token) as JwtPayloadWithRoles;
      return decodedToken.role === ROLENAME.SUPER_ADMIN;
    } else {
      console.error('❌ Aucun header Authorization reçu');
      return false;
    }
  }
}
