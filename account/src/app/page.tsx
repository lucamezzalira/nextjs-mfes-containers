'use client';

import { useState } from 'react';

const user = {
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+1 (555) 123-4567',
  address: '123 Main St, City, Country',
};

const orders = [
  {
    id: 'ORD001',
    date: '2024-03-15',
    status: 'Delivered',
    total: '$59.98',
    items: [
      {
        name: 'Classic White T-Shirt',
        quantity: 2,
        price: '$29.99',
      },
    ],
  },
  {
    id: 'ORD002',
    date: '2024-03-10',
    status: 'Processing',
    total: '$34.99',
    items: [
      {
        name: 'Navy Blue Crew Neck',
        quantity: 1,
        price: '$34.99',
      },
    ],
  },
];

export default function Account() {
  const [activeTab, setActiveTab] = useState('profile');
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('profile')}
              className={`${
                activeTab === 'profile'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Profile
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`${
                activeTab === 'orders'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Orders
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`${
                activeTab === 'settings'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Settings
            </button>
          </nav>
        </div>

        <div className="mt-8">
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">Personal Information</h3>
                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        defaultValue={user.name}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <div className="mt-1">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        defaultValue={user.email}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Phone
                    </label>
                    <div className="mt-1">
                      <input
                        type="tel"
                        name="phone"
                        id="phone"
                        defaultValue={user.phone}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-6">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                      Address
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="address"
                        id="address"
                        defaultValue={user.address}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order.id} className="bg-white shadow overflow-hidden sm:rounded-lg">
                  <div className="px-4 py-5 sm:px-6">
                    <div className="flex justify-between">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Order #{order.id}
                      </h3>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          order.status === 'Delivered'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                      Placed on {new Date(order.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="border-t border-gray-200">
                    <dl>
                      {order.items.map((item, index) => (
                        <div
                          key={index}
                          className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                        >
                          <dt className="text-sm font-medium text-gray-500">Item</dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {item.name}
                          </dd>
                          <dt className="text-sm font-medium text-gray-500">Quantity</dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {item.quantity}
                          </dd>
                          <dt className="text-sm font-medium text-gray-500">Price</dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {item.price}
                          </dd>
                        </div>
                      ))}
                      <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Total</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {order.total}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">Account Settings</h3>
                <div className="mt-6">
                  <div className="flex items-center">
                    <input
                      id="email-notifications"
                      name="email-notifications"
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="email-notifications" className="ml-3 block text-sm font-medium text-gray-700">
                      Email notifications
                    </label>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center">
                      <input
                        id="sms-notifications"
                        name="sms-notifications"
                        type="checkbox"
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label htmlFor="sms-notifications" className="ml-3 block text-sm font-medium text-gray-700">
                        SMS notifications
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save Settings
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
