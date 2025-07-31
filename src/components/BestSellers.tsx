import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    publishedDate?: string;
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

const BestSellers = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState<string | null>(null);
  const fetchBestSellers = async () => {
    try {
      setError(null);
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=bestsellers&maxResults=12&key=${
          import.meta.env.VITE_GOOGLE_BOOK_API_KEY
        }`
      );
      setBooks(response.data.items || []);
    } catch (err) {
      console.error("Error fetching best sellers:", err);
      setError("Failed to load bestselling books. Please try again.");
    }
  };

  useEffect(() => {
    fetchBestSellers();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Error Alert */}
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Grid of Books */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
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
    </div>
  );
};

export default BestSellers;
