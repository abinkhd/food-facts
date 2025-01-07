import { useEffect, useState } from "react";
import "./App.css";
import axios, { AxiosError } from "axios";
import Card from "./components/common/Card";
import { useQuery } from "@tanstack/react-query";

interface FoodFacts {
  count: number;
  products: [];
}

export interface Product {
  _id: string | number;
  product_name: string;
  compared_to_category: string;
  image_url: string;
  ingredients_text: string;
  nutrition_grades: string;
}

function App() {
  const [products, setProducts] = useState<Product>();
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const response = await axios.get<FoodFacts>(
        "https://world.openfoodfacts.org/cgi/search.pl?search_terms=%22%22&json=true"
      );
      setLoading(false);
      return response.data;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const { data } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  console.log(data);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container">
      <div className="cards">
        {data?.products?.map((product: Product) => (
          <Card key={product._id} data={product} />
        ))}
      </div>
    </div>
  );
}

export default App;
