import React, { useState } from "react";
import { Product } from "../../App";
interface Props {
  data: Product;
}

type ProductName = {
  product_name?: string;
  generic_name?: string;
  brands?: string;
  product_name_en?: string;
};

const Card = ({ data }: Props) => {
  const [toggle, setToggle] = useState(true);

  const showIngredients = (ingredients: string) =>
    toggle ? ingredients.split("").slice(0, 21).join("") : ingredients;

  const getName = (data: ProductName): string => {
    // Check fields in the preferred order and return the first non-empty value
    return (
      data.product_name?.trim() ||
      data.generic_name?.trim() ||
      data.brands?.trim() ||
      data.product_name_en?.trim() ||
      "Unknown Product"
    );
  };

  return (
    <div className="card">
      <img
        src={data.image_url}
        width={300}
        height={250}
        alt={data.product_name}
      />
      <label className="product-name">{getName(data)}</label>
      <div className="category">
        <p>
          <label>Category: </label>
          <span>{data.compared_to_category.replace("en", "")}</span>
        </p>
      </div>
      <div className="ingredients">
        <label>Ingredients: </label>
        <span>
          {showIngredients(data.ingredients_text)}
          <button
            className="read-more-button"
            onClick={() => setToggle(!toggle)}
          >
            Read more...
          </button>
        </span>
      </div>
      <div className="nutrition">
        <label>Nutrition Score: </label>
        <label>{data.nutrition_grades.toUpperCase()}</label>
      </div>
    </div>
  );
};

export default Card;
