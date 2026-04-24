import { ItemImage } from "@/components/ItemImage";
import type { ItemWithSlug } from "@/lib/items";

type Props = {
  item: ItemWithSlug;
};

export function ItemDetails({ item }: Props) {
  return (
    <article className="space-y-6">
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-gray-100">
        <ItemImage
          src={item.image}
          alt={item.itemname}
          fill
          sizes="(max-width: 1024px) 100vw, 1024px"
          className="object-cover"
          priority
        />
      </div>

      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          {item.itemname}
        </h1>
        <span className="inline-flex items-center rounded-md bg-gray-100 px-2.5 py-0.5 text-sm font-medium text-gray-700">
          {item.category}
        </span>
      </header>

      <hr className="border-gray-200" />

      <section aria-labelledby="details-heading">
        <h2
          id="details-heading"
          className="mb-4 text-lg font-semibold text-gray-900"
        >
          Details
        </h2>
        {item.itemprops.length === 0 ? (
          <p className="text-sm text-gray-500">No additional details.</p>
        ) : (
          <dl className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
            {item.itemprops.map((prop, i) => (
              <div
                key={`${prop.label}-${i}`}
                className="flex flex-col border-b border-gray-200 pb-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
              >
                <dt className="text-sm font-medium text-gray-500">
                  {prop.label}
                </dt>
                <dd className="text-sm text-gray-900 sm:text-right">
                  {prop.value}
                </dd>
              </div>
            ))}
          </dl>
        )}
      </section>
    </article>
  );
}
