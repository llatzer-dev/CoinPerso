import { Movement } from "./Movement";

export interface Asset {
  name_asset: string;
  symbol_asset: string;
  image: string;
  movements?: Movement[];
}
