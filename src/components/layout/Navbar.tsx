import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { BookOpen, ShoppingCart, User, LogOut, Shield } from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const { getTotalItems } = useCart();
  const navigate = useNavigate();
  const totalItems = getTotalItems();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <BookOpen className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">BookChain KE</span>
        </Link>

        <div className="flex items-center space-x-4">
          <Link to="/books">
            <Button variant="ghost">Browse Books</Button>
          </Link>

          {user ? (
            <div className="flex items-center space-x-2">
              {user.role !== 'admin' && (
                <Link to="/cart" className="relative">
                  <Button variant="ghost" size="icon">
                    <ShoppingCart className="h-5 w-5" />
                    {totalItems > 0 && (
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                        {totalItems}
                      </Badge>
                    )}
                  </Button>
                </Link>
              )}

              <Link to={user.role === 'admin' ? '/admin' : '/dashboard'}>
                <Button variant="ghost" size="icon">
                  {user.role === 'admin' ? <Shield className="h-5 w-5" /> : <User className="h-5 w-5" />}
                </Button>
              </Link>

              <span className="text-sm text-muted-foreground">
                Hello, {user.name}
              </span>

              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link to="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/signup">
                <Button>Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;