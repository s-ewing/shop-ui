import { ChangeEvent } from "react";
import { ProductCategory } from "../../types/product";
import { Select } from "@chakra-ui/react";

interface CategoryFilterProps {
  setSelectedCategory: React.Dispatch<
    React.SetStateAction<ProductCategory | null>
  >;
}

const CategoryFilter = ({ setSelectedCategory }: CategoryFilterProps) => {
  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    e.target.value === "Category"
      ? setSelectedCategory(null)
      : setSelectedCategory(e.target.value as ProductCategory);
  };
  return (
    <Select placeholder="Category" onChange={handleSelect}>
      {Object.keys(ProductCategory).map((key) => (
        <option
          key={key}
          value={ProductCategory[key as keyof typeof ProductCategory]}
        >
          {key}
        </option>
      ))}
    </Select>
  );
};

export default CategoryFilter;
