// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max";

/** 获取资金费率套利分页数据 GET /api/queryArbitrageRate */
export async function queryArbitrageRate(
  params: {
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any }
) {
  return request<API.ArbitrageRateList>("/api/queryArbitrageRate", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
