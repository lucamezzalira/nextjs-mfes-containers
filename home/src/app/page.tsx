'use client';

import Image from "next/image";

const featuredProducts = [
  {
    id: '1',
    name: 'Classic White T-Shirt',
    price: '$29.99',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&auto=format&fit=crop&q=60',
    description: 'A timeless classic made from 100% organic cotton.',
  },
  {
    id: '2',
    name: 'Black Essential Tee',
    price: '$24.99',
    image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&auto=format&fit=crop&q=60',
    description: 'The perfect everyday t-shirt with a modern fit.',
  },
  {
    id: '3',
    name: 'Navy Blue Crew Neck',
    price: '$34.99',
    image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&auto=format&fit=crop&q=60',
    description: 'Premium cotton blend with superior comfort.',
  },
];

export default function Home() {
  const handleCatalogClick = () => {
    window.location.href = 'http://localhost:3001/catalog';
  };

  const handleProductClick = (productId: string) => {
    window.location.href = `http://localhost:3001/catalog/product/${productId}`;
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gray-900 h-[600px]">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&auto=format&fit=crop&q=60"
            alt="Hero background"
            fill
            className="object-cover opacity-50"
            priority
          />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Discover Your Style
          </h1>
          <p className="mt-6 text-xl text-gray-300 max-w-3xl">
            Shop our collection of premium t-shirts. Made with the finest materials and designed for comfort.
          </p>
          <div className="mt-10">
            <button
              onClick={handleCatalogClick}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Shop Now
            </button>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Featured Products</h2>
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {featuredProducts.map((product) => (
            <div key={product.id} className="group relative">
              <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={500}
                  height={500}
                  className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <button onClick={() => handleProductClick(product.id)} className="text-left">
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </button>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.description}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Premium Quality</h3>
              <p className="mt-2 text-base text-gray-500">
                Made with the finest materials for ultimate comfort and durability.
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Fast Delivery</h3>
              <p className="mt-2 text-base text-gray-500">
                Quick and reliable shipping to get your products to you faster.
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Easy Returns</h3>
              <p className="mt-2 text-base text-gray-500">
                Hassle-free returns if you&apos;re not completely satisfied with your purchase.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
