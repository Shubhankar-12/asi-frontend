import { ItemCard } from "@/components/ItemCard";
import type { ItemWithSlug } from "@/lib/items";

type Props = {
  category: string;
  items: ItemWithSlug[];
};

export function CategorySection({ category, items }: Props) {
  return (
    <section id={category.toLowerCase()} className="scroll-mt-20 space-y-4">
      <div className="flex items-baseline justify-between">
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
          {category}
        </h2>
        <span className="text-sm text-gray-500">
          {items.length} {items.length === 1 ? "item" : "items"}
        </span>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((item) => (
          <ItemCard key={item.slug} item={item} />
        ))}
      </div>
    </section>
  );
}
