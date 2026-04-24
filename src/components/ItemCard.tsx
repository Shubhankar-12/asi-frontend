import Link from "next/link";
import { ItemImage } from "@/components/ItemImage";
import type { ItemWithSlug } from "@/lib/items";

type Props = {
  item: ItemWithSlug;
};

export function ItemCard({ item }: Props) {
  return (
    <Link
      href={`/item/${item.slug}`}
      className="group block overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
    >
      <div className="relative aspect-[4/3] w-full bg-gray-100">
        <ItemImage
          src={item.image}
          alt={item.itemname}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-medium leading-tight text-gray-900">
          {item.itemname}
        </h3>
      </div>
    </Link>
  );
}
