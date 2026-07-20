type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

/** Renders one or more JSON-LD objects as an application/ld+json script. */
export function JsonLd({ data }: JsonLdProps) {
  const items = Array.isArray(data) ? data : [data];
  return (
    <>
      {items.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}
