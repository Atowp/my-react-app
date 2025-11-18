import { useState } from "react";

const PRODUCTS = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" },
];

interface Product {
  category: string;
  price: string;
  stocked: boolean;
  name: string;
}

function SearchBar({
  filterText,
  inStockOnly,
  onFilterTextChange,
  onInStockOnlyChange,
}: {
  filterText: string;
  inStockOnly: boolean;
  onFilterTextChange: (filterText: string) => void;
  onInStockOnlyChange: (inStockOnly: boolean) => void;
}) {
  return (
    <>
      <form>
        <div>
          <input
            type="text"
            placeholder="Search..."
            value={filterText}
            onChange={(e) => onFilterTextChange(e.target.value)}
          />
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => onInStockOnlyChange(e.target.checked)}
            />
            Only show products in stock
          </label>
        </div>
      </form>
    </>
  );
}

function ProductTable({
  products,
  filterText,
  inStockOnly,
}: {
  products: Product[];
  filterText: string;
  inStockOnly: boolean;
}) {
  const rows: React.ReactElement[] = [];
  let lastCategory: string | null = null;
  products.forEach((ele) => {
    if (ele.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
      return;
    }
    if (inStockOnly && !ele.stocked) {
      return;
    }
    if (lastCategory !== ele.category) {
      rows.push(
        <ProductCategoryRow category={ele.category} key={ele.category} />
      );
    }
    rows.push(<ProductRow product={ele} key={ele.name} />);
    lastCategory = ele.category;
  });
  return (
    <>
      <table>
        <thead>
          <tr className="text-left">
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </>
  );
}

function ProductCategoryRow({ category }: { category: string }) {
  return (
    <>
      <tr>
        <td colSpan={2} className="font-bold">
          {category}
        </td>
      </tr>
    </>
  );
}

function ProductRow({ product }: { product: Product }) {
  const name = product.stocked ? (
    product.name
  ) : (
    <span style={{ color: "red" }}>{product.name}</span>
  );
  return (
    <>
      <tr>
        <td>{name}</td>
        <td>{product.price}</td>
      </tr>
    </>
  );
}

function FilterableProductTable() {
  const [filterText, setFilterText] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);
  return (
    <>
      <SearchBar
        filterText={filterText}
        inStockOnly={inStockOnly}
        onFilterTextChange={setFilterText}
        onInStockOnlyChange={setInStockOnly}
      />
      <ProductTable
        products={PRODUCTS}
        filterText={filterText}
        inStockOnly={inStockOnly}
      />
    </>
  );
}

export default FilterableProductTable;
