import { queryArbitrageRate } from "@/services/arbitrageRate/api";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { PageContainer, ProCard, ProTable } from "@ant-design/pro-components";
import { Button, Flex, Select } from "antd";
import React, { useRef, useState } from "react";
import styles from "./index.less";

const TradeOptions = [
  { value: "binance", label: "Blnance" },
  { value: "okx", label: "OKX" },
  { value: "htx", label: "HTX" },
];

const TypeOptions = [
  { value: "long", label: "做多" },
  { value: "short", label: "做空" },
];

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType | null>(null);
  const [arbitrage, setArbitrage] = useState<API.ArbitrageRateItem | null>(
    null
  );
  const [fields, setFields] = useState({
    tradeL: "",
    tradeR: "",
    actionL: "",
    actionR: "",
  });
  const columns: ProColumns<API.ArbitrageRateItem>[] = [
    {
      title: "交易对",
      dataIndex: "trade",
      valueType: "select",
      valueEnum: Object.fromEntries(
        [
          "BTC-USDT",
          "ETH-USDT",
          "BNB-USDT",
          "SOL-USDT",
          "ADA-USDT",
          "XRP-USDT",
          "DOT-USDT",
          "DOGE-USDT",
        ].map((item) => [item, item])
      ),
      width: 120,
    },
    {
      title: "Binance",
      dataIndex: "binance",
      width: 120,
      hideInSearch: true,
      renderText: (val: number) => val && val !== 0 && `+${val}%`,
    },
    {
      title: "OKX",
      dataIndex: "okx",
      width: 120,
      hideInSearch: true,
      renderText: (val: number) => val && val !== 0 && `+${val}%`,
    },
    {
      title: "HTX",
      dataIndex: "htx",
      width: 120,
      hideInSearch: true,
      renderText: (val: number) => val && val !== 0 && `+${val}%`,
    },
    {
      title: "费率周期",
      dataIndex: "rateCycle",
      valueType: "select",
      valueEnum: Object.fromEntries(
        Array.from({ length: 8 }, (_, i) => [i + 1, `${i + 1}小时`])
      ),
      width: 120,
    },
    {
      title: "下次费率时间/倒计时",
      hideInSearch: true,
      width: 180,
      render: (_, record) => (
        <>
          {record.nextAt}
          <br />
          {record.cd}
        </>
      ),
    },
    {
      title: "最优APY(10x)",
      dataIndex: "apy",
      hideInSearch: true,
      width: 130,
      renderText: (val: number) => val && val !== 0 && `${val}%`,
    },
    {
      title: "更新时间",
      sorter: true,
      dataIndex: "updatedAt",
      valueType: "dateTime",
      hideInSearch: true,
      width: 180,
    },
    {
      title: "操作",
      dataIndex: "option",
      valueType: "option",
      width: 100,
      render: (_, record) => [
        <Button type="primary" ghost onClick={() => handleArbitrage(record)}>
          一键套利
        </Button>,
      ],
    },
  ];

  const handleArbitrage = (record: API.ArbitrageRateItem) => {
    setArbitrage(record);
    setFields((val) => ({
      ...val,
      tradeL: "binance",
      tradeR: "okx",
      actionL: "long",
      actionR: "short",
    }));
  };

  return (
    <PageContainer title={<></>}>
      <ProCard title="交易所费率列表" bodyStyle={{ padding: 0 }}>
        <ProTable<API.ArbitrageRateItem, API.PageParams>
          actionRef={actionRef}
          rowKey="id"
          search={{
            labelWidth: 100,
          }}
          optionsRender={() => []}
          toolBarRender={() => []}
          request={queryArbitrageRate}
          columns={columns}
          pagination={{
            pageSize: 5,
            showQuickJumper: true,
          }}
          size="small"
        />
      </ProCard>
      {arbitrage ? (
        <ProCard
          title={`套利执行（${arbitrage.trade}）`}
          style={{ marginTop: 20 }}
        >
          <Flex gap="middle" vertical={false}>
            <div
              className={`${styles.card} ${
                fields.actionL === "long" ? styles.long : styles.short
              }`}
            >
              <Select
                className={styles.fieldL}
                options={TradeOptions}
                value={fields.tradeL}
                size="small"
                onChange={(value) => {
                  setFields((val) => ({
                    ...val,
                    tradeL: value,
                  }));
                }}
              />
              <Select
                className={styles.fieldR}
                options={TypeOptions}
                value={fields.actionL}
                size="small"
                onChange={(value) => {
                  setFields((val) => ({
                    ...val,
                    actionL: value,
                  }));
                }}
              />
              <div className={styles.row}>
                <label className={styles.label}>资金费率</label>
                <span className={styles.cnt}>
                  {fields.actionL === "long" ? "+" : "-"}
                  {arbitrage?.[fields.tradeL]}%
                </span>
              </div>
              <div className={styles.row}>
                <label className={styles.label}>最新价格</label>
                <span className={styles.cnt}>3000</span>
              </div>
              <div className={styles.row}>
                <label className={styles.label}>账户余额</label>
                <span className={styles.cnt}>3000 USDT</span>
              </div>
              <div className={styles.row}>
                <label className={styles.label}>杠杆倍数</label>
                <Select
                  className={styles.field}
                  options={[{ value: "10", label: "10x" }]}
                  value="10"
                  size="small"
                />
              </div>
              <div className={styles.row}>
                <label className={styles.label}>委托模式</label>
                <Select
                  className={styles.field}
                  options={[{ value: "3001", label: "市价委托" }]}
                  value="3001"
                  size="small"
                />
              </div>
            </div>
            <div
              className={`${styles.card} ${
                fields.actionR === "long" ? styles.long : styles.short
              }`}
            >
              <Select
                className={styles.fieldL}
                options={TradeOptions}
                value={fields.tradeR}
                size="small"
                onChange={(value) => {
                  setFields((val) => ({
                    ...val,
                    tradeR: value,
                  }));
                }}
              />
              <Select
                className={styles.fieldR}
                options={TypeOptions}
                value={fields.actionR}
                size="small"
                onChange={(value) => {
                  setFields((val) => ({
                    ...val,
                    actionR: value,
                  }));
                }}
              />
              <div className={styles.row}>
                <label className={styles.label}>资金费率</label>
                <span className={styles.cnt}>
                  {fields.actionR === "long" ? "+" : "-"}
                  {arbitrage?.[fields.tradeR]}%
                </span>
              </div>
              <div className={styles.row}>
                <label className={styles.label}>最新价格</label>
                <span className={styles.cnt}>3000</span>
              </div>
              <div className={styles.row}>
                <label className={styles.label}>账户余额</label>
                <span className={styles.cnt}>3000 USDT</span>
              </div>
              <div className={styles.row}>
                <label className={styles.label}>杠杆倍数</label>
                <Select
                  className={styles.field}
                  options={[{ value: "10", label: "10x" }]}
                  value="10"
                  size="small"
                />
              </div>
              <div className={styles.row}>
                <label className={styles.label}>委托模式</label>
                <Select
                  className={styles.field}
                  options={[{ value: "3001", label: "市价委托" }]}
                  value="3001"
                  size="small"
                />
              </div>
            </div>
          </Flex>
        </ProCard>
      ) : null}
    </PageContainer>
  );
};

export default TableList;
