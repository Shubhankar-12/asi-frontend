import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center space-y-4 text-center">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900">
        Item not found
      </h1>
      <p className="max-w-md text-gray-500">
        The item you&apos;re looking for doesn&apos;t exist. It may have been
        renamed or removed.
      </p>
      <Link
        href="/"
        className="inline-flex items-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
      >
        Back to catalog
      </Link>
    </div>
  );
}
