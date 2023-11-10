import useProducts from "./hooks/useProducts";
import AppContainer from "./components/layout/AppContainer";
import NavBar from "./components/layout/NavBar";
import ProductContainer from "./components/layout/ProductContainer";
import ProductCard from "./components/product/ProductCard";
import { ProductCategory } from "./types/product";
import FilterContainer from "./components/layout/FilterContainer";
import ProductFilterButton from "./components/product/ProductFilterButton";
import { useState } from "react";
import { Spinner, useDisclosure } from "@chakra-ui/react";
import LoginModal from "./components/layout/LoginModal";
import CartDrawer from "./components/layout/CartDrawer";
import ProfileModal from "./components/layout/ProfileModal";

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

  const [selectedCategories, setSelectedCategories] = useState<
    ProductCategory[]
  >([]);

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
        {Object.values(ProductCategory).map((category) => (
          <ProductFilterButton
            key={category}
            category={category}
            setSelectedCategories={setSelectedCategories}
          />
        ))}
      </FilterContainer>
      {isLoading ? (
        <Spinner color="orange" size="xl" mt={16} />
      ) : (
        <ProductContainer>
          {products
            ?.filter((product) =>
              selectedCategories.every((category) =>
                product.categories.includes(category)
              )
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
