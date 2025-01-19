export interface TradeModelGet {
  id: string;
  name: string;
  username?: string;
  description?: string;
  sector?: string;
  create_on: string;
  updated_on?: string;
}

export interface TradeModelNew {
  name: string;
  username?: string;
  sector?: string;
  description?: string;
}

export interface TradeModelPut {
  name?: string;
  username?: string;
  description?: string;
  sector?: string;
}
