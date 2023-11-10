import { Button } from "@chakra-ui/react";
import { ProductCategory } from "../../types/product";
import { useState } from "react";

interface ProductFilterButtonProps {
  category: ProductCategory;
  setSelectedCategories: React.Dispatch<
    React.SetStateAction<ProductCategory[]>
  >;
}

const ProductFilterButton = ({
  category,
  setSelectedCategories,
}: ProductFilterButtonProps) => {
  const handleCategoryClick = () => {
    setIsSelected(!isSelected);

    setSelectedCategories((prevSelectedCategories) => {
      if (prevSelectedCategories.includes(category)) {
        return prevSelectedCategories.filter((c) => c !== category);
      } else {
        return [...prevSelectedCategories, category];
      }
    });
  };

  const [isSelected, setIsSelected] = useState(false);
  return (
    <Button
      colorScheme={isSelected ? "orange" : "cyan"}
      variant={isSelected ? "solid" : "outline"}
      textColor="white"
      my={2}
      onClick={handleCategoryClick}
    >
      {category}
    </Button>
  );
};

export default ProductFilterButton;
