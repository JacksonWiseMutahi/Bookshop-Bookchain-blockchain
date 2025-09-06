import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { formatKESSimple } from '@/utils/currency';
import { Book, Order, User } from '@/types';
import { BarChart3, Users, Package, ShoppingCart, Plus, Edit, Trash2, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

import { mockStats, mockBooks, mockUsers, mockOrders } from '@/data/mockData';


const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [pendingOrders, setPendingOrders] = useState<Order[]>([]);
  const [allOrders, setAllOrders] = useState<Order[]>(mockOrders);

  useEffect(() => {
    // Load pending orders from localStorage
    const pending = JSON.parse(localStorage.getItem('pending_orders') || '[]');
    setPendingOrders(pending);
  }, []);

  if (user?.role !== 'admin') {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-destructive mb-4">Access Denied</h2>
        <p className="text-muted-foreground">You don't have permission to access this page.</p>
      </div>
    );
  }

  const generateBlockchainHash = () => {
    // Generate a mock blockchain transaction hash
    const chars = '0123456789abcdef';
    let hash = '0x';
    for (let i = 0; i < 64; i++) {
      hash += chars[Math.floor(Math.random() * chars.length)];
    }
    return hash;
  };

  const acceptOrder = (orderId: string) => {
    // Find the pending order
    const orderToAccept = pendingOrders.find(order => order.id === orderId);
    if (!orderToAccept) return;

    // Generate blockchain transaction
    const blockchainTx = {
      id: `tx_${Date.now()}`,
      orderId: orderId,
      userId: orderToAccept.userId,
      txHash: generateBlockchainHash(),
      contractAddress: '0x742d35Cc6643C0532925a3b8F39d4aC447b',
      network: 'Ethereum',
      status: 'confirmed' as const,
      createdAt: new Date().toISOString()
    };

    // Update order with blockchain transaction and change status to paid
    const acceptedOrder = {
      ...orderToAccept,
      status: 'paid' as const,
      blockchainTx
    };

    // Remove from pending orders
    const updatedPendingOrders = pendingOrders.filter(order => order.id !== orderId);
    setPendingOrders(updatedPendingOrders);
    localStorage.setItem('pending_orders', JSON.stringify(updatedPendingOrders));

    // Add to all orders
    const updatedAllOrders = [...allOrders, acceptedOrder];
    setAllOrders(updatedAllOrders);

    toast({
      title: "Order accepted",
      description: `Order #${orderId} has been accepted and blockchain transaction created.`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'default';
      case 'shipped':
        return 'secondary';
      case 'pending':
        return 'outline';
      case 'cancelled':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Badge variant="secondary" className="gap-2">
          <Users className="h-4 w-4" />
          Administrator
        </Badge>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="books">Books</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Books</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockStats.totalBooks}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockStats.totalUsers}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockStats.totalOrders}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">
                  {formatKESSimple(mockStats.totalRevenue)}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="books" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Book Management</h2>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Book
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {mockBooks.map(book => (
                  <div key={book.id} className="p-4 flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{book.title}</h3>
                      <p className="text-sm text-muted-foreground">by {book.author}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-sm">
                          Price: {formatKESSimple(book.priceKes)}
                        </span>
                        <Badge variant={book.stock > 0 ? 'default' : 'destructive'}>
                          Stock: {book.stock}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders" className="space-y-4">
          <h2 className="text-2xl font-bold">Order Management</h2>

          {/* Pending Orders Section */}
          {pendingOrders.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-orange-600">Pending Orders Requiring Approval</CardTitle>
                <CardDescription>These orders are waiting for your approval to process blockchain transactions.</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {pendingOrders.map(order => (
                    <div key={order.id} className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="font-semibold">Order #{order.id}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(order.createdAt).toLocaleDateString('en-KE')}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-primary">
                            {formatKESSimple(order.totalAmountKes)}
                          </p>
                          <Badge variant="outline" className="text-orange-600">
                            Pending Approval
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="mt-3 flex justify-end">
                        <Button 
                          size="sm" 
                          onClick={() => acceptOrder(order.id)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Check className="h-4 w-4 mr-2" />
                          Accept Order
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* All Orders Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">All Orders</CardTitle>
              <CardDescription>Complete order history with blockchain transaction details.</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {allOrders.map(order => (
                  <div key={order.id} className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-semibold">Order #{order.id}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(order.createdAt).toLocaleDateString('en-KE')}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-primary">
                          {formatKESSimple(order.totalAmountKes)}
                        </p>
                        <Badge variant={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </div>
                    </div>

                    {order.blockchainTx && (
                      <div className="mt-3 p-3 bg-muted rounded-md">
                        <p className="text-sm font-medium">Blockchain Transaction</p>
                        <p className="text-xs text-muted-foreground font-mono break-all">
                          Hash: {order.blockchainTx.txHash}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Network: {order.blockchainTx.network}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Contract: {order.blockchainTx.contractAddress}
                        </p>
                        <Badge variant="outline" className="text-xs mt-1">
                          {order.blockchainTx.status}
                        </Badge>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <h2 className="text-2xl font-bold">User Management</h2>

          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {mockUsers.map(user => (
                  <div key={user.id} className="p-4 flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{user.name}</h3>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline">{user.role}</Badge>
                        <Badge variant={user.isActive ? 'default' : 'destructive'}>
                          {user.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;