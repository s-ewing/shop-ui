import { Select } from "@chakra-ui/react";
import { ProductDepartment } from "../../types/product";
import { ChangeEvent } from "react";

interface DepartmentFilterProps {
  setSelectedDepartment: React.Dispatch<
    React.SetStateAction<ProductDepartment | null>
  >;
}

const DepartmentFilter = ({ setSelectedDepartment }: DepartmentFilterProps) => {
  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    e.target.value === "Department"
      ? setSelectedDepartment(null)
      : setSelectedDepartment(e.target.value as ProductDepartment);
  };

  return (
    <Select
      placeholder="Department"
      onChange={handleSelect}
      width="xs"
      mb={2}
      bg="orange.100"
    >
      {Object.keys(ProductDepartment).map((key) => (
        <option
          key={key}
          value={ProductDepartment[key as keyof typeof ProductDepartment]}
        >
          {key}
        </option>
      ))}
    </Select>
  );
};

export default DepartmentFilter;
