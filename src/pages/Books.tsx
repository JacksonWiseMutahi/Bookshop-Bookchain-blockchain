import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import BookCard from '@/components/books/BookCard';
import { Book } from '@/types';
import { Search, Filter } from 'lucide-react';

import { mockBooks } from '@/data/mockData';

const Books: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('title');
  const [filterBy, setFilterBy] = useState('all');
  const navigate = useNavigate();

  const filteredBooks = mockBooks.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterBy === 'in-stock') return matchesSearch && book.stock > 0;
    if (filterBy === 'out-of-stock') return matchesSearch && book.stock === 0;
    if (filterBy !== 'all' && filterBy !== 'in-stock' && filterBy !== 'out-of-stock') {
      return matchesSearch && book.category === filterBy;
    }
    return matchesSearch;
  });

  const sortedBooks = [...filteredBooks].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.priceKes - b.priceKes;
      case 'price-high':
        return b.priceKes - a.priceKes;
      case 'author':
        return a.author.localeCompare(b.author);
      default:
        return a.title.localeCompare(b.title);
    }
  });

  const handleViewDetails = (book: Book) => {
    navigate(`/books/${book.id}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <h1 className="text-3xl font-bold">Browse Books</h1>
        
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search books or authors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full md:w-64"
            />
          </div>
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-40">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="title">Title A-Z</SelectItem>
              <SelectItem value="author">Author A-Z</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={filterBy} onValueChange={setFilterBy}>
            <SelectTrigger className="w-full md:w-40">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Fiction">Fiction</SelectItem>
              <SelectItem value="Technology">Technology</SelectItem>
              <SelectItem value="History">History</SelectItem>
              <SelectItem value="Business">Business</SelectItem>
              <SelectItem value="Philosophy">Philosophy</SelectItem>
              <SelectItem value="Biography">Biography</SelectItem>
              <SelectItem value="Self-Help">Self-Help</SelectItem>
              <SelectItem value="Science">Science</SelectItem>
              <SelectItem value="in-stock">In Stock</SelectItem>
              <SelectItem value="out-of-stock">Out of Stock</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {sortedBooks.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No books found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedBooks.map(book => (
            <BookCard
              key={book.id}
              book={book}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Books;