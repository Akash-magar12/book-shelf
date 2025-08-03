import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { BookOpen } from "lucide-react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, db } from "@/firebase/firebase";
import toast from "react-hot-toast";
import { addDoc, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";

// 🧾 Define Book interface
interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    description?: string;
    imageLinks?: { thumbnail?: string };
    categories?: string[];
    publisher?: string;
    publishedDate?: string;
  };
  saleInfo?: {
    saleability: string;
    retailPrice?: {
      amount: number;
      currencyCode: string;
    };
  };
}

const BookDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const fetchBookDetails = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes/${id}?key=${
          import.meta.env.VITE_GOOGLE_BOOK_API_KEY
        }`
      );
      setBook(response.data);
    } catch (error) {
      console.error("Error fetching book details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    fetchBookDetails();
  }, []);

  const handleCart = async (book: Book) => {
    if (!user) {
      toast.error("Please login to add to cart");
      navigate("/login");
      return;
    }

    try {
      const cartRef = collection(db, "carts");

      // 1️⃣ Query if this user already has this book in cart
      const q = query(
        cartRef,
        where("userId", "==", user.uid),
        where("bookId", "==", book.id)
      );

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // 2️⃣ Book already exists in cart → update quantity
        const cartDoc = querySnapshot.docs[0];
        const existingQuantity = cartDoc.data().quantity || 1;

        await updateDoc(doc(db, "carts", cartDoc.id), {
          quantity: existingQuantity + 1,
        });

        toast.success("Increased quantity in cart!");
      } else {
        // 3️⃣ Book not in cart → add new entry
        await addDoc(cartRef, {
          userId: user.uid,
          bookId: book.id,
          title: book.volumeInfo.title,
          thumbnail: book.volumeInfo.imageLinks?.thumbnail || "",
          quantity: 1,
          price: book.saleInfo?.retailPrice?.amount || 0,
          addedAt: new Date(),
        });

        toast.success("Added to cart!");
      }
    } catch (error) {
      console.error("Error adding/updating cart:", error);
      toast.error("Failed to update cart");
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto mt-10">
        <Skeleton className="h-[300px] w-full rounded-xl mb-4" />
        <Skeleton className="h-6 w-1/2 mb-2" />
        <Skeleton className="h-5 w-1/3 mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-5/6 mb-2" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    );
  }

  if (!book) {
    return (
      <div className="text-center text-lg text-red-500 mt-10">
        Book not found.
      </div>
    );
  }

  const { volumeInfo, saleInfo } = book;
  const hasPrice =
    saleInfo?.saleability === "FOR_SALE" && saleInfo?.retailPrice;

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <Card className="shadow-lg">
        <CardHeader className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
          <img
            src={volumeInfo.imageLinks?.thumbnail || "/placeholder.jpg"}
            alt={volumeInfo.title}
            className="w-40 h-auto rounded-md border shadow"
          />
          <div className="flex flex-col gap-2">
            <CardTitle className="text-2xl font-bold">
              {volumeInfo.title}
            </CardTitle>
            {volumeInfo.authors && (
              <CardDescription className="text-muted-foreground">
                By {volumeInfo.authors.join(", ")}
              </CardDescription>
            )}
            <div className="flex flex-wrap gap-2">
              {volumeInfo.categories?.map((cat, index) => (
                <Badge key={index} variant="secondary">
                  {cat}
                </Badge>
              ))}
            </div>
            <div className="text-sm text-muted-foreground">
              {volumeInfo.publisher} • {volumeInfo.publishedDate}
            </div>
            {hasPrice && (
              <div className="text-lg font-semibold text-green-600">
                {saleInfo.retailPrice?.currencyCode}{" "}
                {saleInfo.retailPrice?.amount.toFixed()}
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent>
          <p className="text-gray-700 text-sm leading-relaxed">
            {volumeInfo.description || "No description available."}
          </p>
        </CardContent>

        <CardFooter className="flex justify-end">
          {hasPrice && (
            <Button
              onClick={() => handleCart(book)}
              variant="default"
              className="gap-2"
            >
              <BookOpen size={18} />
              Add to cart
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default BookDetails;
