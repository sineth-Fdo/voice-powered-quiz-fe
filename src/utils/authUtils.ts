import Cookies from "js-cookie";
import { decode } from "jsonwebtoken";

export const getUserFromToken = () => {
  const token = Cookies.get("token");
  return token ? (decode(token) as { uid: string; role: string }) : null;
};
