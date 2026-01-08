import type { Request, Response } from "express";

const getArbitrageRate = (_req: Request, res: Response) => {
  function generateRandomData(id: number) {
    // 交易对列表
    const tradePairs = [
      "BTC-USDT",
      "ETH-USDT",
      "BNB-USDT",
      "SOL-USDT",
      "ADA-USDT",
      "XRP-USDT",
      "DOT-USDT",
      "DOGE-USDT",
    ];

    // 随机生成数字字符串，保留2位小数
    function randomAmount() {
      return (Math.random() * 0.1 + 0.001).toFixed(3);
    }

    // 随机生成费率周期 (1-8H)
    const rateCycle = Math.floor(Math.random() * 8 + 1).toString();

    // 生成未来时间 (1-30天内)
    const now = new Date();
    const futureDate = new Date(
      now.getTime() + Math.random() * 30 * 24 * 60 * 60 * 1000
    );
    const nextAt = futureDate.toISOString().replace("T", " ").substring(0, 19);

    // 随机生成倒计时 (00:00:00 到 23:59:59)
    const hours = Math.floor(Math.random() * 24)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor(Math.random() * 60)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor(Math.random() * 60)
      .toString()
      .padStart(2, "0");
    const cd = `${hours}:${minutes}:${seconds}`;

    // 随机生成APY (1-50%)
    const apy = Math.floor(Math.random() * 50 + 1).toString();

    // 生成更新时间 (过去1-30天内)
    const pastDate = new Date(
      now.getTime() - Math.random() * 30 * 24 * 60 * 60 * 1000
    );
    const updatedAt = pastDate.toISOString().replace("T", " ").substring(0, 19);

    return {
      id: id.toString().padStart(9, "0"),
      trade: tradePairs[Math.floor(Math.random() * tradePairs.length)],
      binance: randomAmount(),
      okx: randomAmount(),
      htx: randomAmount(),
      rateCycle,
      nextAt,
      cd,
      apy,
      updatedAt,
    };
  }

  const result = {
    data: Array.from({ length: 5 }, (_, index) =>
      generateRandomData(index + 1)
    ),
    total: 12,
    pageSize: 5,
    current: 1,
    success: true,
  };

  return res.json(result);
};

export default {
  "GET /api/queryArbitrageRate": getArbitrageRate,
};
