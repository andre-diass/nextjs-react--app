import { JWTPayload } from "jose";

export interface JWTPayloadApi extends JWTPayload {
  name: string;
  email: string;
  iat: number;
}
