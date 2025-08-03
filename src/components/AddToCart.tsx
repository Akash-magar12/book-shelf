import { useEffect, useState } from "react";
import { auth, db } from "@/firebase/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface CartItem {
  id: string;
  title: string;
  thumbnail: string;
  quantity: number;
  price: number;
}

const AddToCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user: User | null) => {
      if (user) {
        try {
          const q = query(
            collection(db, "carts"),
            where("userId", "==", user.uid)
          );
          const querySnapshot = await getDocs(q);

          const items: CartItem[] = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...(doc.data() as Omit<CartItem, "id">),
          }));

          setCartItems(items);
        } catch (error) {
          console.error("Error fetching cart:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const total = cartItems.reduce((acc, currItem) => {
    return acc + currItem.price * currItem.quantity;
  }, 0);

  if (loading) {
    return (
      <div className="grid gap-4 p-6">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-24 w-full rounded-md" />
        ))}
      </div>
    );
  }

  return (
    <div className="p-6 bg-white min-h-screen">
      <h2 className="text-2xl font-semibold mb-6 text-gray-900">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">No items in cart.</p>
      ) : (
        <div className="grid gap-4 mb-6">
          {cartItems.map((item) => (
            <Card key={item.id} className="bg-white shadow-sm border">
              <CardHeader className="flex flex-row items-center justify-between p-4">
                <div className="flex items-center gap-4">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded-md border"
                  />
                  <CardTitle className="text-lg font-medium text-gray-900">
                    {item.title}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex justify-between items-center p-4 pt-0 text-gray-700">
                <div>
                  Qty: <span className="font-medium">{item.quantity}</span>
                </div>
                <div className="font-semibold">
                  ₹{Math.round(item.price * item.quantity)}
                </div>
              </CardContent>
            </Card>
          ))}

          <div className="flex justify-between items-center border-t pt-4 mt-4">
            <span className="text-lg font-semibold text-gray-800">Total:</span>
            <span className="text-lg font-bold text-green-600">
              ₹{Math.round(total)}
            </span>
          </div>

          <div className="flex justify-end">
            <Button
              className="mt-4  bg-black text-white cursor-pointer"
              onClick={() => navigate("/payment")}
            >
              Proceed to Payment
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddToCart;
