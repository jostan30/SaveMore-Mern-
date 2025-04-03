'use client'
import { useState } from "react";
export function PurchasedProductsView() {
  // Sample data - in a real app, you would fetch this from an API
  const orders = [
    {
      id: "ORD-1234",
      customer: "John Doe",
      date: "2025-03-28",
      amount: "$129.99",
      status: "Pending",
      items: [
        { name: "Wireless Headphones", quantity: 1, price: "$79.99" },
        { name: "Phone Case", quantity: 1, price: "$19.99" },
        { name: "USB-C Cable", quantity: 2, price: "$15.00" }
      ],
      address: "123 Main St, New York, NY 10001",
      phone: "(555) 123-4567",
      email: "john.doe@example.com"
    },
    {
      id: "ORD-1235",
      customer: "Jane Smith",
      date: "2025-03-29",
      amount: "$210.50",
      status: "Pending",
      items: [
        { name: "Smart Watch", quantity: 1, price: "$189.99" },
        { name: "Watch Band", quantity: 1, price: "$20.51" }
      ],
      address: "456 Oak Ave, Chicago, IL 60007",
      phone: "(555) 987-6543",
      email: "jane.smith@example.com"
    },
    {
      id: "ORD-1236",
      customer: "Mike Johnson",
      date: "2025-03-30",
      amount: "$85.49",
      status: "Pending",
      items: [
        { name: "Bluetooth Speaker", quantity: 1, price: "$85.49" }
      ],
      address: "789 Pine Dr, Miami, FL 33101",
      phone: "(555) 246-8135",
      email: "mike.j@example.com"
    }
  ];

  const [expandedOrder, setExpandedOrder] = useState(null);

  const toggleOrderDetails = (orderId:any) => {
    if (expandedOrder === orderId) {
      setExpandedOrder(null);
    } else {
      setExpandedOrder(orderId);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Purchased Products</h2>
        <p className="text-gray-600">Manage and fulfill customer orders</p>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="grid grid-cols-6 bg-gray-100 p-4 font-medium text-gray-700">
          <div>Order ID</div>
          <div>Customer</div>
          <div>Date</div>
          <div>Amount</div>
          <div>Status</div>
          <div className="text-right">Actions</div>
        </div>

        {orders.map((order) => (
          <div key={order.id} className="border-t border-gray-200">
            <div className="grid grid-cols-6 p-4 items-center hover:bg-gray-50">
              <div className="font-medium">{order.id}</div>
              <div>{order.customer}</div>
              <div>{order.date}</div>
              <div>{order.amount}</div>
              <div>
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                  {order.status}
                </span>
              </div>
              <div className="flex justify-end gap-2">
                <button 
                  onClick={() => toggleOrderDetails(order.id)}
                  className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                >
                  {expandedOrder === order.id ? "Hide Details" : "View Details"}
                </button>
                <button className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200">
                  Process
                </button>
              </div>
            </div>

            {expandedOrder === order.id && (
              <div className="bg-gray-50 p-4 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">Order Items</h4>
                    <div className="bg-white p-3 rounded border border-gray-200">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between py-1">
                          <span>
                            {item.quantity}x {item.name}
                          </span>
                          <span>{item.price}</span>
                        </div>
                      ))}
                      <div className="border-t border-gray-200 mt-2 pt-2 font-medium flex justify-between">
                        <span>Total</span>
                        <span>{order.amount}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Shipping Information</h4>
                    <div className="bg-white p-3 rounded border border-gray-200">
                      <p className="mb-1"><span className="font-medium">Address:</span> {order.address}</p>
                      <p className="mb-1"><span className="font-medium">Phone:</span> {order.phone}</p>
                      <p><span className="font-medium">Email:</span> {order.email}</p>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <button className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                        Mark as Shipped
                      </button>
                      <button className="px-3 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
                        Print Label
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}