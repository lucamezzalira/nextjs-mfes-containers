'use client';

export default function Header() {
  return (
    <header className="bg-white shadow">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex w-full items-center justify-between border-b border-gray-200 py-6">
          <div className="flex items-center">
            <a href="/" className="text-2xl font-bold text-gray-900">
              T-Shirt Shop
            </a>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="/catalog"
              className="text-base font-medium text-gray-600 hover:text-gray-900"
            >
              Catalog
            </a>
            <a
              href="/account"
              className="text-base font-medium text-gray-600 hover:text-gray-900"
            >
              My Account
            </a>
            <a
              href="/account/signin"
              className="inline-block rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-base font-medium text-white hover:bg-indigo-700"
            >
              Sign in
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
