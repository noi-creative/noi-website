/**
 * Serialize a JSON-LD object for inline `application/ld+json` injection.
 *
 * Escapes `<` so user- or content-derived strings can never close the
 * script tag. All input objects come from trusted local data.
 */
export function serializeJsonLd(data: object): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
