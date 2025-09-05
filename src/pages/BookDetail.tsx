import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { formatKESSimple } from '@/utils/currency';
import { ArrowLeft, ShoppingCart, BookOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Book } from '@/types';

import { mockBooks } from '@/data/mockData';

// Mock data - replace with API call
const mockBook: Book = mockBooks[0];

const BookDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toast } = useToast();

  // In a real app, you'd fetch the book by ID
  const book = mockBook;

  const handleAddToCart = () => {
    if (book.stock > 0) {
      addToCart(book);
      toast({
        title: "Added to cart",
        description: `${book.title} has been added to your cart.`,
      });
    }
  };

  const handleBuyNow = () => {
    if (book.stock > 0) {
      addToCart(book);
      navigate('/cart');
    }
  };

  return (
    <div className="space-y-6">
      <Button
        variant="ghost"
        onClick={() => navigate('/books')}
        className="mb-4"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Books
      </Button>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Book Cover */}
        <div className="space-y-4">
          <div className="aspect-[3/4] bg-muted rounded-lg flex items-center justify-center">
            {book.coverImageUrl ? (
              <img 
                src={book.coverImageUrl} 
                alt={book.title}
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <div className="text-center text-muted-foreground">
                <BookOpen className="h-16 w-16 mx-auto mb-4" />
                <p>No Cover Image</p>
              </div>
            )}
          </div>
        </div>

        {/* Book Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
            <p className="text-xl text-muted-foreground mb-4">by {book.author}</p>
            
            <div className="flex items-center gap-4 mb-6">
              <span className="text-2xl font-bold text-primary">
                {formatKESSimple(book.priceKes)}
              </span>
              <Badge variant={book.stock > 0 ? "default" : "destructive"}>
                {book.stock > 0 ? `${book.stock} in stock` : 'Out of stock'}
              </Badge>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Book Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">ISBN:</span>
                <span>{book.isbn}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Author:</span>
                <span>{book.author}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Stock:</span>
                <span>{book.stock > 0 ? `${book.stock} available` : 'Out of stock'}</span>
              </div>
            </CardContent>
          </Card>

          <div>
            <h3 className="text-lg font-semibold mb-3">Description</h3>
            <p className="text-muted-foreground leading-relaxed">
              {book.description}
            </p>
          </div>

          <div className="flex gap-4">
            <Button
              onClick={handleAddToCart}
              disabled={book.stock === 0}
              className="flex-1"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
            <Button
              onClick={handleBuyNow}
              disabled={book.stock === 0}
              variant="outline"
              className="flex-1"
            >
              Buy Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;