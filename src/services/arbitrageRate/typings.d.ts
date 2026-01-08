// @ts-ignore
/* eslint-disable */

declare namespace API {
  type ArbitrageRateItem = {
    id: string;
    trade: string;
    binance: string;
    okx: string;
    htx: string;
    rateCycle: string;
    nextAt: string;
    cd: string;
    apy: string;
    updatedAt: string;
  };

  type ArbitrageRateList = {
    data?: ArbitrageRateItem[];
    total?: number;
    success?: boolean;
  };
}
