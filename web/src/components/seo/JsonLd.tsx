export type JsonLdData = Record<string, unknown>;

/**
 * Renders a JSON-LD structured-data script. Accepts a single schema.org object
 * or an array of them. Data is trusted, application-authored structured data.
 */
export function JsonLd({ data }: { data: JsonLdData | JsonLdData[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
