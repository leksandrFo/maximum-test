import React, { useState, useEffect } from "react";
import { Flex, Select, Typography } from "antd";
import { useSelector } from "react-redux";
import { selectors } from "../redux/slices/brandsSlice";

const { Option } = Select;
const { Text } = Typography;

interface ModelsSelectorProps {
  selectedBrand: string | null;
  onModelChange: (models: string[]) => void;
}

const ModelsSelector: React.FC<ModelsSelectorProps> = ({ selectedBrand, onModelChange }) => {
  const brands = useSelector(selectors.selectAll);
  const selectedBrandData = brands.find((brand) => brand._id === selectedBrand);
  const [selectedModels, setSelectedModels] = useState<string[]>([]);

  useEffect(() => {
    setSelectedModels([]);
  }, [selectedBrand]);

  useEffect(() => {
    onModelChange(selectedModels);
  }, [selectedModels, onModelChange]);

  const handleChange = (selectedModels: string[]) => {
    setSelectedModels(selectedModels);
  };

  return (
    <Flex vertical justify="start" align="start">
      <Text>Модели:</Text>
      <Select
        mode="multiple"
        style={{ width: "50%" }}
        allowClear
        placeholder="Выберите модели"
        value={selectedModels}
        onChange={handleChange}
        disabled={!selectedBrand}
      >
        {selectedBrandData &&
          selectedBrandData.models
          .filter(model => model !== null)
          .map((model) => (
            <Option key={model} value={model}>
              {model}
            </Option>
          ))}
      </Select>
    </ Flex>
  );
};

export default ModelsSelector;
