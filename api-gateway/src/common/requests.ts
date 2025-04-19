import { Request } from 'express';
import axios, { AxiosResponse } from 'axios';
import { domainServiceByPath, portByPath } from './const';

export const toolRequest = (
  request: Request
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<AxiosResponse<any, any>> => {
  return axios({
    method: request.method.toLowerCase(),
    url: `http://${domainServiceByPath.get(request.url.split('/')[1])}:${portByPath.get(request.url.split('/')[1])}/${request.url.substring(1)}`,
    data: request.body,
    headers: {
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
      Expires: '0',
      ...request.headers,
    },
  });
};
