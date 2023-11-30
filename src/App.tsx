import useProducts from "./hooks/useProducts";
import AppContainer from "./components/layout/AppContainer";
import NavBar from "./components/layout/NavBar";
import ProductContainer from "./components/layout/ProductContainer";
import ProductCard from "./components/product/ProductCard";
import { ProductCategory, ProductDepartment } from "./types/product";
import FilterContainer from "./components/layout/FilterContainer";
import { useState } from "react";
import { Spinner, useDisclosure } from "@chakra-ui/react";
import LoginModal from "./components/layout/LoginModal";
import CartDrawer from "./components/layout/CartDrawer";
import ProfileModal from "./components/layout/ProfileModal";
import DepartmentFilter from "./components/product/DepartmentFilter";
import CategoryFilter from "./components/product/CategoryFilter";

function App() {
  const { products, isLoading } = useProducts();

  const {
    isOpen: isOpenLoginModal,
    onOpen: onOpenLoginModal,
    onClose: onCloseLoginModal,
  } = useDisclosure();

  const {
    isOpen: isOpenProfileModal,
    onOpen: onOpenProfileModal,
    onClose: onCloseProfileModal,
  } = useDisclosure();

  const {
    isOpen: isOpenCartDrawer,
    onOpen: onOpenCartDrawer,
    onClose: onCloseCartDrawer,
  } = useDisclosure();

  const [selectedCategory, setSelectedCategory] =
    useState<ProductCategory | null>(null);

  const [selectedDepartment, setSelectedDepartment] =
    useState<ProductDepartment | null>(null);

  return (
    <AppContainer>
      <NavBar
        onOpenLoginModal={onOpenLoginModal}
        onOpenCartDrawer={onOpenCartDrawer}
        onOpenProfileModal={onOpenProfileModal}
      />
      <LoginModal
        isOpenLoginModal={isOpenLoginModal}
        onCloseLoginModal={onCloseLoginModal}
      />
      <ProfileModal
        isOpenProfileModal={isOpenProfileModal}
        onCloseProfileModal={onCloseProfileModal}
      />
      <FilterContainer>
        <DepartmentFilter setSelectedDepartment={setSelectedDepartment} />
        <CategoryFilter setSelectedCategory={setSelectedCategory} />
      </FilterContainer>
      {isLoading ? (
        <Spinner color="orange" size="xl" mt={16} />
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
      <CartDrawer
        isOpenCartDrawer={isOpenCartDrawer}
        onCloseCartDrawer={onCloseCartDrawer}
      />
    </AppContainer>
  );
}

export default App;
