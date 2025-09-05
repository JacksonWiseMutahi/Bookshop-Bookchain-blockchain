import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Book } from '@/types';
import { formatKESSimple } from '@/utils/currency';
import { useCart } from '@/contexts/CartContext';
import { ShoppingCart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BookCardProps {
  book: Book;
  onViewDetails?: (book: Book) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onViewDetails }) => {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    if (book.stock > 0) {
      addToCart(book);
      toast({
        title: "Added to cart",
        description: `${book.title} has been added to your cart.`,
      });
    }
  };

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="aspect-[3/4] bg-muted rounded-md mb-4 flex items-center justify-center">
          {book.coverImageUrl ? (
            <img 
              src={book.coverImageUrl} 
              alt={book.title}
              className="w-full h-full object-cover rounded-md"
            />
          ) : (
            <span className="text-muted-foreground text-sm">No Image</span>
          )}
        </div>
        <CardTitle className="text-lg line-clamp-2">{book.title}</CardTitle>
        <p className="text-sm text-muted-foreground">by {book.author}</p>
        <Badge variant="outline" className="w-fit mt-2">{book.category}</Badge>
      </CardHeader>

      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
          {book.description}
        </p>
        <div className="flex items-center justify-between mb-2">
          <span className="text-lg font-semibold text-primary">
            {formatKESSimple(book.priceKes)}
          </span>
          <Badge variant={book.stock > 0 ? "default" : "destructive"}>
            {book.stock > 0 ? `${book.stock} in stock` : 'Out of stock'}
          </Badge>
        </div>
      </CardContent>

      <CardFooter className="gap-2">
        <Button 
          className="flex-1" 
          disabled={book.stock === 0}
          onClick={handleAddToCart}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
        {onViewDetails && (
          <Button variant="outline" onClick={() => onViewDetails(book)}>
            Details
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default BookCard;