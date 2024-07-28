import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Layout, Flex, Space, Spin, notification } from "antd";
import BrandSelector from "./BrandSelector";
import ModelSelector from "./ModelSelector";
import StockTable from "./StockTable";

const { Content } = Layout;

const Stock: React.FC = () => {
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedModels, setSelectedModels] = useState<string[]>([]);

  const loadingBrands = useSelector((state) => state.brands.loading);
  const loadingStock = useSelector((state) => state.stock.loading);
  const errorBrands = useSelector((state) => state.brands.error);
  const errorStock = useSelector((state) => state.stock.error);

  const isLoading = loadingBrands || loadingStock;

  useEffect(() => {
    if (errorBrands) {
      notification.error({
        message: "Ошибка загрузки брендов",
        description: errorBrands,
      });
    }
    if (errorStock) {
      notification.error({
        message: "Ошибка загрузки запасов",
        description: errorStock,
      });
    }
  }, [errorBrands, errorStock]);

  const handleBrandChange = (brand: string | null) => {
    setSelectedBrand(brand);
  };

  const handleModelChange = (models: string[]) => {
    setSelectedModels(models);
  };

  return (
    <>
      {isLoading ? (
        <div
          style={{
            display: "grid",
            placeItems: "center",
            minHeight: "100vh",
            width: "100vw",
          }}
        >
          <Spin size="large" />
        </div>
      ) : (
        <Layout
          style={{ minHeight: "100vh", minWidth: "100vw", background: "none" }}
        >
          <Flex justify="center" align="start">
            <Content
              style={{
                padding: "20px",
                width: "100%",
                maxWidth: "1200px",
                textAlign: "center",
              }}
            >
              <Space direction="vertical" size="small">
                <BrandSelector onBrandChange={handleBrandChange} />
                <ModelSelector
                  selectedBrand={selectedBrand}
                  onModelChange={handleModelChange}
                />
                <StockTable
                  selectedBrand={selectedBrand}
                  selectedModels={selectedModels}
                />
              </Space>
            </Content>
          </Flex>
        </Layout>
      )}
    </>
  );
};

export default Stock;
