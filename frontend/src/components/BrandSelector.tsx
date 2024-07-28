import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Typography, Space, Flex } from "antd";
import { selectors } from "../redux/slices/brandsSlice";
import IBrands from "../types/IBrands";

const { Text, Link } = Typography;

interface BrandSelectorProps {
    onBrandChange: (brand: string | null) => void;
  }

const BrandSelector: React.FC<BrandSelectorProps> = ({ onBrandChange }) => {
const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  const brands = useSelector(
    (state: { brands: { ids: string[]; entities: Record<string, IBrands> } }) =>
      selectors.selectAll(state)
  ).sort((a, b) => {
    if (a._id < b._id) return -1;
    if (a._id > b._id) return 1;
    return 0;
  });

  const handleBrand = (brand: string) => {
    const newBrand = brand === selectedBrand ? null : brand;
    setSelectedBrand(newBrand);
    onBrandChange(newBrand);
  };

  return (
    <Flex vertical justify="start" align="start">
      <Text>Марки автомобилей:</Text>
      <Flex wrap gap="small">
        {brands.map(({ _id, totalQuantity }) => (
          <Space key={_id}>
            <Link href="#!">
              <span
                onClick={() => handleBrand(_id)}
                style={{
                  fontWeight: selectedBrand === _id ? "bold" : 200,
                  cursor: "pointer",
                  textAlign: "center",
                }}
              >
                {_id}
              </span>
            </Link>
            <Text
              style={{
                fontSize: 10,
                fontWeight: 200,
                flex: 1,
                textAlign: "center",
              }}
            >
              {totalQuantity}
            </Text>
          </Space>
        ))}
      </Flex>
    </Flex>
  );
};

export default BrandSelector;
