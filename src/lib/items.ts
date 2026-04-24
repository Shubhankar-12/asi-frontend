import rawItems from "@/data/items.json";

export type ItemProp = {
  label: string;
  value: string;
};

export type Item = {
  itemname: string;
  category: string;
  image: string;
  itemprops: ItemProp[];
};

export type ItemWithSlug = Item & { slug: string };

export function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const items: ItemWithSlug[] = (() => {
  const base = rawItems as Item[];
  const slugCounts = new Map<string, number>();
  return base.map((item, index) => {
    const raw = toSlug(item.itemname);
    const count = slugCounts.get(raw) ?? 0;
    slugCounts.set(raw, count + 1);
    const slug = count === 0 ? raw : `${raw}-${index}`;
    return { ...item, slug };
  });
})();

export function getAllItems(): ItemWithSlug[] {
  return items;
}

export function getItemBySlug(slug: string): ItemWithSlug | null {
  return items.find((item) => item.slug === slug) ?? null;
}

export function groupByCategory(
  list: ItemWithSlug[] = items,
): Record<string, ItemWithSlug[]> {
  return list.reduce<Record<string, ItemWithSlug[]>>((acc, item) => {
    (acc[item.category] ??= []).push(item);
    return acc;
  }, {});
}
