import { useState } from "react";
import NavBar from "../layout/NavBar";
import { Box, Flex, Spinner } from "@chakra-ui/react";
import FilterContainer from "../layout/FilterContainer";
import DepartmentFilter from "../product/DepartmentFilter";
import CategoryFilter from "../product/CategoryFilter";
import ProductContainer from "../layout/ProductContainer";
import ProductCard from "../product/ProductCard";
import useProducts from "../../hooks/useProducts";
import { ProductCategory, ProductDepartment } from "../../types/product";

const LandingPage = () => {
  const { products, isLoading } = useProducts();
  const [selectedCategory, setSelectedCategory] =
    useState<ProductCategory | null>(null);

  const [selectedDepartment, setSelectedDepartment] =
    useState<ProductDepartment | null>(null);

  return (
    <Box w="100%">
      <NavBar />
      <FilterContainer>
        <DepartmentFilter setSelectedDepartment={setSelectedDepartment} />
        <CategoryFilter setSelectedCategory={setSelectedCategory} />
      </FilterContainer>
      {isLoading ? (
        <Flex justify="center" mt={16}>
          <Spinner color="orange" size="xl" />
        </Flex>
      ) : (
        <ProductContainer>
          {products
            ?.filter(
              (product) =>
                (!selectedCategory ||
                  product.categories.includes(selectedCategory)) &&
                (!selectedDepartment ||
                  product.departments.includes(selectedDepartment))
            )
            .map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
        </ProductContainer>
      )}
    </Box>
  );
};

export default LandingPage;
