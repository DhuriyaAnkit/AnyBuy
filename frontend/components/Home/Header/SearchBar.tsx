"use client";

import { useState, FormEvent } from "react";
import { Search, ChevronDown, X } from "lucide-react";

const searchCategories = [
  "All Categories",
  "Electronics",
  "Fashion",
  "Home & Living",
  "Beauty",
  "Grocery",
  "Sports",
];

interface SearchBarProps {
  className?: string;
  isCompact?: boolean;
}

export default function SearchBar({
  className = "",
  isCompact = false,
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    // In mock mode, this simulates search behavior
    console.log(`Searching for "${query}" in ${selectedCategory}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`relative flex w-full items-center ${className}`}
      role="search"
      aria-label="Sitewide product search"
    >
      <div className="flex w-full items-center overflow-hidden rounded-full border border-slate-200 bg-white shadow-xs transition-all duration-200 focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-500/20 hover:border-slate-300">
        {/* Category Selector (Desktop) */}
        {!isCompact && (
          <div className="relative hidden md:flex items-center border-r border-slate-200 bg-slate-50/70">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="appearance-none bg-transparent py-2.5 pl-4 pr-8 text-xs font-semibold text-slate-700 cursor-pointer focus:outline-none"
              aria-label="Filter search by category"
            >
              {searchCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 h-3.5 w-3.5 text-slate-400" />
          </div>
        )}

        {/* Search Input */}
        <div className="relative flex flex-1 items-center">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for products, brands and more..."
            className="w-full bg-transparent px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
          />

          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="mr-2 p-1 text-slate-400 hover:text-slate-600 focus:outline-none"
              aria-label="Clear search query"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="flex h-10 items-center justify-center bg-orange-500 px-5 text-white transition-colors duration-150 hover:bg-orange-600 active:bg-orange-700 focus:outline-none"
          aria-label="Submit search"
        >
          <Search className="h-4 w-4" />
        </button>
      </div>
    </form>
  );
}
