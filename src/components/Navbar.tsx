'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/Authcontext';
import { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react'; // Icons

const CATEGORIES = ['General', 'Business', 'Entertainment', 'Health', 'Science', 'Sports', 'Technology'];

const Navbar = () => {
  const { isLoggedIn, user, logout, loading } = useAuth();
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  // Create refs for the dropdowns with explicit type
  const categoryDropdownRef = useRef<HTMLDivElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target as Node) &&
        profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false); // Close category dropdown
        setMenuOpen(false); // Close profile dropdown
      }
    };

    // Add event listener on mount
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup event listener on unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (loading) return null;

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white px-6 py-4 shadow-md z-50 relative">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold tracking-tight text-red-500">
          News<span className="text-white">Knock</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {isLoggedIn && (
            <>
              <Link href="/profile" className="hover:text-red-400 transition">Home</Link>

              <div ref={categoryDropdownRef} className="relative group">
                <button
                  className="flex items-center gap-1 hover:text-red-400"
                  onClick={() => setDropdownOpen((prev) => !prev)}
                >
                  Categories <ChevronDown size={16} />
                </button>
                {dropdownOpen && (
                  <div className="absolute top-10 left-0 bg-white text-black rounded-lg shadow-lg w-40 z-30">
                    {CATEGORIES.map((category) => (
                      <Link
                        key={category}
                        href={`/category/${category.toLowerCase()}`}
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        {category}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link href="/reels" className="hover:text-red-400 transition">Reels</Link>

              {/* Profile Dropdown */}
              <div ref={profileDropdownRef} className="relative group">
                <button
                  onClick={() => setMenuOpen((prev) => !prev)}
                  className="flex items-center gap-2 hover:text-red-400"
                >
                  <span className="bg-red-500 text-white px-2 py-1 rounded-full text-sm">
                    {user?.username?.slice(0, 10) || user?.email?.split('@')[0]}
                  </span>
                  <ChevronDown size={16} />
                </button>
                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-lg shadow-lg z-40">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          )}

          {!isLoggedIn && (
            <>
              <Link href="/login" className="hover:text-red-400">Login</Link>
              <Link href="/signup" className="hover:text-red-400">Signup</Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-3 text-sm">
          {isLoggedIn && (
            <>
              <Link href="/profile" className="hover:text-red-400">Home</Link>
              <Link href="/reels" className="hover:text-red-400">Reels</Link>
              <div className="border-t border-gray-700 my-2" />
              <p className="font-semibold text-red-400">Categories</p>
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat}
                  href={`/category/${cat.toLowerCase()}`}
                  className="hover:text-red-400"
                >
                  {cat}
                </Link>
              ))}
              <div className="border-t border-gray-700 my-2" />
              <button onClick={handleLogout} className="hover:text-red-400">Logout</button>
            </>
          )}

          {!isLoggedIn && (
            <>
              <Link href="/login" className="hover:text-red-400">Login</Link>
              <Link href="/signup" className="hover:text-red-400">Signup</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
