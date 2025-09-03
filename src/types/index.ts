export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  isActive: boolean;
  createdAt: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  description: string;
  priceKes: number;
  stock: number;
  coverImageUrl?: string;
  createdAt: string;
}

export interface CartItem {
  book: Book;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  totalAmountKes: number;
  status: 'pending' | 'paid' | 'shipped' | 'cancelled';
  createdAt: string;
  items: OrderItem[];
  blockchainTx?: BlockchainTransaction;
}

export interface OrderItem {
  id: string;
  orderId: string;
  book: Book;
  quantity: number;
  priceKes: number;
}

export interface BlockchainTransaction {
  id: string;
  orderId: string;
  userId: string;
  txHash: string;
  contractAddress: string;
  network: string;
  status: 'pending' | 'confirmed' | 'failed';
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  isLoading: boolean;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  code?: string;
  details?: any;
}