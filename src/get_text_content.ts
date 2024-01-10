/**
 * This function returns the text content regardless of the type.
 *
 * @param css The CSS text content with different types
 * @returns The CSS text content
 */
export default function getTextContent(css: string | false | Map<string, string>): string {
  if (css instanceof Map) {
    return css.get("index") || "";
  } else if (typeof css === "string") {
    return css;
  }
  return "";
}
