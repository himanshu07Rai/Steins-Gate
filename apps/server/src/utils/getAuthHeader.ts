import { AUTH_COOKIE, HTTP_HEADER } from "./constants";

export function getAuthToken(req:any) {
    const [, token] = /Bearer (.+)/.exec(req.get(HTTP_HEADER.AUTH)) || [];
    return token || req.cookies[AUTH_COOKIE];
  }