import { Movement } from "./Movement";

export interface Asset {
  name: string;
  symbol: string;
  movements?: Movement[];
}
