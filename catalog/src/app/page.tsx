'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { products } from '../data/products';

export default function Catalog() {
  const router = useRouter();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Our T-Shirts</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div 
            key={product.id}
            className="group cursor-pointer bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            onClick={() => router.push(`/product/${product.id}`)}
          >
            <div className="relative w-full pt-[100%]">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="absolute inset-0 object-cover object-center group-hover:opacity-75 transition-opacity duration-300"
                priority
              />
            </div>
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-900 line-clamp-1">{product.name}</h2>
              <p className="mt-1 text-sm text-gray-500 line-clamp-2">{product.description}</p>
              <div className="mt-2 flex items-center justify-between">
                <p className="text-lg font-medium text-gray-900">${product.price}</p>
                <div className="flex gap-1">
                  {product.sizes.map((size) => (
                    <span key={size} className="px-2 py-1 text-xs border rounded">
                      {size}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
