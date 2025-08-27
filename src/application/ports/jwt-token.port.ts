export interface JwtTokenPort {
  sign(payload: any, options?: object): Promise<string>;
  verify(token: string, options?: object): Promise<any>;
}
