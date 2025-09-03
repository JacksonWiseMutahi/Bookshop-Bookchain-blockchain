import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, ShoppingCart, Shield, Zap } from 'lucide-react';

const Index = () => {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Welcome to{' '}
          <span className="text-primary">BookShop KE</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Discover, explore, and purchase your favorite books with blockchain-verified transactions. 
          Experience the future of online bookstore shopping in Kenya.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link to="/books">
            <Button size="lg" className="gap-2">
              <BookOpen className="h-5 w-5" />
              Browse Books
            </Button>
          </Link>
          <Link to="/signup">
            <Button variant="outline" size="lg">
              Get Started
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="text-center">
            <BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
            <CardTitle>Vast Collection</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-center">
              Browse through thousands of books across various genres, 
              from classics to contemporary bestsellers.
            </CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="text-center">
            <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
            <CardTitle>Blockchain Security</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-center">
              Every purchase is recorded on the blockchain, ensuring 
              transparent and immutable transaction records.
            </CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="text-center">
            <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
            <CardTitle>Fast & Reliable</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-center">
              Quick order processing with real-time inventory updates 
              and seamless payment integration.
            </CardDescription>
          </CardContent>
        </Card>
      </section>

      {/* CTA Section */}
      <section className="bg-muted rounded-lg p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Start Your Reading Journey</h2>
        <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
          Join thousands of book lovers who trust BookShop KE for their reading needs. 
          Create your account today and get access to exclusive deals.
        </p>
        <Link to="/signup">
          <Button size="lg" className="gap-2">
            <ShoppingCart className="h-5 w-5" />
            Create Account
          </Button>
        </Link>
      </section>
    </div>
  );
};

export default Index;
