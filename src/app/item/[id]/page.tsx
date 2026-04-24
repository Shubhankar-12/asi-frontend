import { notFound } from "next/navigation";
import Link from "next/link";
import { ItemDetails } from "@/components/ItemDetails";
import { getAllItems, getItemBySlug } from "@/lib/items";

type PageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return getAllItems().map((item) => ({ id: item.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const item = getItemBySlug(id);
  if (!item) return { title: "Not Found" };
  return { title: `${item.itemname} — Item Catalog` };
}

export default async function ItemPage({ params }: PageProps) {
  const { id } = await params;
  const item = getItemBySlug(id);
  if (!item) notFound();

  return (
    <div className="space-y-6">
      <Link
        href="/"
        className="inline-flex items-center rounded-md px-2 py-1 text-sm text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
      >
        &larr; Back to catalog
      </Link>
      <ItemDetails item={item} />
    </div>
  );
}
