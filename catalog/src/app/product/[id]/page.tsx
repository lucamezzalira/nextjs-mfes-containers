'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import { products } from '../../../data/products';

export default function ProductPage() {
  const router = useRouter();
  const params = useParams();
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<number>(0);

  const product = products.find(p => p.id === params?.id);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-xl">Product not found</p>
        <button 
          onClick={() => router.push('/')}
          className="mt-4 text-blue-600 hover:text-blue-800"
        >
          Back to Catalog
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button 
        onClick={() => router.push('/')}
        className="mb-8 text-blue-600 hover:text-blue-800 flex items-center"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Catalog
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="relative w-full pt-[100%] overflow-hidden rounded-lg">
            <Image
              src={product.images[selectedImage]}
              alt={product.name}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="absolute inset-0 object-cover object-center"
              priority
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <div 
                key={index}
                className={`relative pt-[100%] overflow-hidden rounded-lg cursor-pointer ${
                  selectedImage === index ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setSelectedImage(index)}
              >
                <Image
                  src={image}
                  alt={`${product.name} - View ${index + 1}`}
                  fill
                  sizes="(min-width: 768px) 12.5vw, 25vw"
                  className="absolute inset-0 object-cover object-center"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          <p className="text-xl font-medium text-gray-900">${product.price}</p>
          <p className="text-gray-700">{product.description}</p>
          
          <div>
            <h2 className="text-sm font-medium text-gray-900">Size</h2>
            <div className="mt-2 flex gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className={`px-4 py-2 border rounded-md ${
                    selectedSize === size 
                      ? 'border-blue-500 bg-blue-50 text-blue-700' 
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <button
            className={`w-full py-3 px-8 flex items-center justify-center rounded-md ${
              selectedSize 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            disabled={!selectedSize}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
} 