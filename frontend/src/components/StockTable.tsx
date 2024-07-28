import React, { useMemo } from "react";
import { Table, Alert } from "antd";
import { ColumnsType } from 'antd/es/table';
import { useSelector } from "react-redux";
import { selectors } from "../redux/slices/stockSlice";
import IStockItem from "../types/IStockItem";
import IColumnsTable from "../types/IColumnsTable";
import IStockTableProps from "../types/IStockTableProps";

const StockTable: React.FC<IStockTableProps> = ({ selectedBrand, selectedModels }) => {
	const stock: IStockItem[] = useSelector(selectors.selectAll);

  const filteredStock = useMemo(() => {
    return stock.filter(item => {
      const brandMatch = selectedBrand ? item.mark === selectedBrand : true;
      const modelMatch = selectedModels.length > 0 ? selectedModels.includes(item.model) : true;
      return brandMatch && modelMatch;
    });
  }, [stock, selectedBrand, selectedModels]);

  if (stock.length === 0) {
    return <Alert message="Данные недоступны" type="warning" />;
  }

  const formattedData: IColumnsTable[] = filteredStock.map((car) => ({
    key: car._id,
    mark: car.mark,
    model: car.model,
    engine: {
      power: `(${car.engine.power} л.с.)`,
      volume: `${car.engine.volume.toFixed(1)}`,
      transmission: car.engine.transmission,
      fuel: car.engine.fuel,
    },
    drive: car.drive,
    equipmentName: car.equipmentName,
    price: new Intl.NumberFormat("ru-RU").format(car.price) + " ₽",
    createdAt: new Date(car.createdAt).toLocaleString("ru-RU", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }),
  }));

  const columns: ColumnsType<IColumnsTable> = [
    { title: "ID", dataIndex: "key", key: "key", width: "15%" },
    {
      title: "Марка/Модель",
      dataIndex: "mark",
      key: "mark",
      render: (value, record: IColumnsTable) =>
        `${record.mark} ${record.model ? record.model : ""}`,
      width: "15%"
    },
    { title: "Комплектация", dataIndex: "equipmentName", key: "equipmentName", width: "15%" },
    {
      title: "Модификация",
      dataIndex: "modification",
      key: "modification",
      render: (value, record: IColumnsTable) =>
        `${record.engine.volume} ${record.engine.transmission} ${record.engine.power} ${record.drive} ${record.engine.fuel}`,
    },
    { title: "Стоимость", dataIndex: "price", key: "price", width: "15%" },
    { title: "Дата создания", dataIndex: "createdAt", key: "createdAt", width: "15%" },
  ];

  return (
    <Table
      dataSource={formattedData}
      columns={columns}
      bordered
      rowKey="key"
      scroll={{ x: 1000 }}
    />
  );
};

export default StockTable;
