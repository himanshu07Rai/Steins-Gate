import { AUTH_COOKIE, HTTP_HEADER } from "./constants";

export function getAuthToken(bearerToken:string) {
    return bearerToken.split(' ')[1];
  }