import { Request } from 'express';
import axios from 'axios';
import { returnFreePath } from './tool';
import { toolRequest } from './requests';
import { UnauthorizedException } from '@nestjs/common';

export const processEventPath = async (req: Request) => {
  const res = await axios[req.method.toLowerCase()](
    `http://facturation-service:3003/stripe/event`,
    req.body
  );
  return res.data;
};

export const checkTokenRequest = async (req: Request) => {
  const res = await axios[req.method.toLowerCase()](
    `http://auth-service:3001/auth/${returnFreePath(req.url)}`,
    req.body
  );
  return res.data;
};

export const processMainRequest = async (req: Request) => {
  const responseCheckToken = await axios.post(
    `http://auth-service:3001/auth/validate-token`,
    {},
    { headers: { Authorization: req.headers.authorization } }
  );
  if (responseCheckToken.status === 200) {
    const response = await toolRequest(req);
    return response.data;
  } else {
    throw new UnauthorizedException('Invalid token');
  }
};
