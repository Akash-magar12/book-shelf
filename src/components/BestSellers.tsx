import { useEffect, useState } from "react";
import axios from "axios";
const BestSellers = () => {
  const [books, setBooks] = useState<[]>([]);

  const fetchBestSellers = async () => {
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=bestsellers&maxResults=12&key=${
        import.meta.env.VITE_GOOGLE_BOOK_API_KEY
      }`
    );
    console.log(response.data.items);
  };

  useEffect(() => {
    fetchBestSellers();
  }, []);
  return <div>Books</div>;
};

export default BestSellers;
