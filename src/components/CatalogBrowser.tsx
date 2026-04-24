"use client";

import { useEffect, useMemo, useState } from "react";
import { CategorySection } from "@/components/CategorySection";
import type { ItemWithSlug } from "@/lib/items";

const ALL = "all";

type Props = {
  items: ItemWithSlug[];
};

export function CatalogBrowser({ items }: Props) {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState<string>(ALL);

  useEffect(() => {
    const id = setTimeout(() => setDebouncedSearch(search.trim()), 300);
    return () => clearTimeout(id);
  }, [search]);

  const categories = useMemo(
    () => Array.from(new Set(items.map((i) => i.category))).sort(),
    [items],
  );

  const filtered = useMemo(() => {
    const q = debouncedSearch.toLowerCase();
    return items.filter((item) => {
      if (category !== ALL && item.category !== category) return false;
      if (q && !item.itemname.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [items, category, debouncedSearch]);

  const grouped = useMemo(() => {
    return filtered.reduce<Record<string, ItemWithSlug[]>>((acc, item) => {
      (acc[item.category] ??= []).push(item);
      return acc;
    }, {});
  }, [filtered]);

  const visibleCategories = useMemo(
    () => Object.keys(grouped).sort(),
    [grouped],
  );

  const hasResults = filtered.length > 0;
  const isFiltering = debouncedSearch !== "" || category !== ALL;

  return (
    <div className="space-y-10">
      <header className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Item Catalog
          </h1>
          <p className="text-gray-500">
            {isFiltering
              ? `Showing ${filtered.length} of ${items.length} items`
              : `Browse ${items.length} items across ${categories.length} categories.`}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <SearchIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search items by name…"
              aria-label="Search items by name"
              className="h-11 w-full rounded-lg border border-gray-200 bg-white pl-10 pr-10 text-sm text-gray-900 shadow-sm transition-colors placeholder:text-gray-400 focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Clear search"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
              >
                <CloseIcon className="size-3.5" />
              </button>
            )}
          </div>

          <div className="relative sm:w-56">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              aria-label="Filter by category"
              className="h-11 w-full cursor-pointer appearance-none rounded-lg border border-gray-200 bg-white pl-3 pr-9 text-sm text-gray-900 shadow-sm transition-colors hover:border-gray-300 focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10"
            >
              <option value={ALL}>All categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-gray-500" />
          </div>
        </div>
      </header>

      {hasResults ? (
        <div className="space-y-12">
          {visibleCategories.map((cat) => (
            <CategorySection key={cat} category={cat} items={grouped[cat]} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-gray-200 bg-gray-50/50 py-20 text-center">
          <div className="flex size-12 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-gray-200">
            <SearchIcon className="size-5 text-gray-400" />
          </div>
          <div className="space-y-1">
            <p className="font-medium text-gray-900">No items match</p>
            <p className="text-sm text-gray-500">
              Try a different search term or category.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setSearch("");
              setCategory(ALL);
            }}
            className="mt-2 inline-flex items-center rounded-md bg-gray-900 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
          >
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path
        fillRule="evenodd"
        d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path
        fillRule="evenodd"
        d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
    </svg>
  );
}
