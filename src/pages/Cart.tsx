import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { formatKESSimple } from '@/utils/currency';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Cart: React.FC = () => {
  const { items, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) {
      toast({
        title: "Login required",
        description: "Please login to proceed with checkout.",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }

    // Create new order in pending status
    const newOrder = {
      id: `ord_${Date.now()}`,
      userId: user.id,
      totalAmountKes: getTotalPrice(),
      status: 'pending' as const,
      createdAt: new Date().toISOString(),
      items: items.map(item => ({
        id: `item_${Date.now()}_${item.book.id}`,
        orderId: `ord_${Date.now()}`,
        book: item.book,
        quantity: item.quantity,
        priceKes: item.book.priceKes
      }))
    };

    // Add to orders (in real app, this would be saved to database)
    const existingOrders = JSON.parse(localStorage.getItem('pending_orders') || '[]');
    existingOrders.push(newOrder);
    localStorage.setItem('pending_orders', JSON.stringify(existingOrders));

    toast({
      title: "Order placed successfully",
      description: "Your order has been submitted and is awaiting admin approval.",
    });
    clearCart();
    navigate('/dashboard');
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <p className="text-muted-foreground mb-6">
          Add some books to your cart to get started.
        </p>
        <Link to="/books">
          <Button>Browse Books</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Shopping Cart</h1>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map(item => (
            <Card key={item.book.id}>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-28 bg-muted rounded flex items-center justify-center flex-shrink-0">
                    {item.book.coverImageUrl ? (
                      <img 
                        src={item.book.coverImageUrl} 
                        alt={item.book.title}
                        className="w-full h-full object-cover rounded"
                      />
                    ) : (
                      <span className="text-xs text-muted-foreground">No Image</span>
                    )}
                  </div>

                  <div className="flex-grow">
                    <h3 className="font-semibold text-lg">{item.book.title}</h3>
                    <p className="text-muted-foreground">by {item.book.author}</p>
                    <p className="text-lg font-semibold text-primary mt-2">
                      {formatKESSimple(item.book.priceKes)}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(item.book.id, item.quantity - 1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Badge variant="secondary" className="px-3">
                      {item.quantity}
                    </Badge>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(item.book.id, item.quantity + 1)}
                      disabled={item.quantity >= item.book.stock}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFromCart(item.book.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {items.map(item => (
                  <div key={item.book.id} className="flex justify-between text-sm">
                    <span>
                      {item.book.title} × {item.quantity}
                    </span>
                    <span>
                      {formatKESSimple(item.book.priceKes * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <hr />

              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span className="text-primary">
                  {formatKESSimple(getTotalPrice())}
                </span>
              </div>

              <Button 
                className="w-full" 
                size="lg"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                Secure checkout with blockchain transaction recording
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Cart;