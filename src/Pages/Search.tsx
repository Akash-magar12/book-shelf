import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import axios from "axios";

interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    publishedDate?: string;
    description?: string;
    imageLinks?: {
      thumbnail?: string;
      smallThumbnail?: string;
    };
  };
  saleInfo?: {
    saleability?: string;
    listPrice?: {
      amount: number;
      currencyCode: string;
    };
  };
}

const SearchBar = () => {
  const [query, setQuery] = useState<string>("");
  const [books, setBooks] = useState<Book[]>([]);
  const [startIndex, setStartIndex] = useState<number>(0);
  const fetchBooks = async () => {
    if (!query) return;
    const res = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=${startIndex}&maxResults=10`
    );
    setBooks(res.data.items || []);
  };

  // Fetch books when pagination or query changes
  useEffect(() => {
    fetchBooks();
  }, [startIndex]);

  return (
    <div className="p-6">
      {/* Search Bar */}
      <div className="flex justify-center w-full">
        <div className="relative w-full max-w-sm">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder="Search books..."
            className="pl-10 pr-24"
          />
          <Button
            onClick={() => {
              setStartIndex(0); // reset to first page
              fetchBooks();
            }}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 px-4 py-2 text-sm"
          >
            Search
          </Button>
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 mt-10 sm:grid-cols-2 px-12 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {books.map((book) => {
          const info = book.volumeInfo;
          const sale = book.saleInfo;
          const price =
            sale?.saleability === "FOR_SALE"
              ? `${sale?.listPrice?.currencyCode || "₹"}${
                  sale?.listPrice?.amount
                }`
              : "Not for sale";

          const image =
            info.imageLinks?.thumbnail ||
            info.imageLinks?.smallThumbnail ||
            "/placeholder.svg?text=No+Image";

          return (
            <Link key={book.id} to={`/book-details/${book.id}`}>
              <Card className="hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                <CardContent className="p-4 space-y-3">
                  <img
                    src={image}
                    alt={info.title}
                    className="w-full h-[250px] object-contain bg-white rounded"
                    onError={(e) =>
                      ((e.target as HTMLImageElement).src = "/placeholder.svg")
                    }
                  />
                  <div>
                    <h3 className="text-lg font-semibold line-clamp-2">
                      {info.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {info.authors?.join(", ") || "Unknown Author"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Published: {info.publishedDate || "N/A"}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge
                      variant={
                        sale?.saleability === "FOR_SALE" ? "default" : "outline"
                      }
                    >
                      {price}
                    </Badge>
                    <Badge variant="secondary" className="text-[10px]">
                      {sale?.saleability === "FOR_SALE"
                        ? "Available"
                        : "Unavailable"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Pagination */}
      {books.length > 0 && (
        <div className="flex justify-center gap-4 mt-8">
          <Button
            variant="outline"
            disabled={startIndex === 0}
            onClick={() => setStartIndex((prev) => Math.max(prev - 10, 0))}
          >
            Previous
          </Button>
          <Button
            variant="default"
            onClick={() => setStartIndex((prev) => prev + 10)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
