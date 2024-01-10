import {
  BuildOptions,
  OnLoadArgs,
  OnLoadOptions,
  OnLoadResult,
  Plugin as ESBuildPlugin,
} from "https://deno.land/x/esbuild@v0.19.11/mod.js";
import sass from "https://deno.land/x/denosass@1.0.6/mod.ts";

/**
 * This function returns the text content regardless of the type.
 *
 * @param css The CSS text content with different types
 * @returns The CSS text content
 */
function getTextContent(css: string | false | Map<string, string>): string {
  if (css instanceof Map) {
    return css.get("index") || "";
  } else if (typeof css === "string") {
    return css;
  }
  return "";
}

/**
 * This function registers the onLoad function and sets some initial options.
 */
function sassPluginSetup(
  initialOptions: BuildOptions,
  onLoadFunction: (
    options: OnLoadOptions,
    callback: (
      args: OnLoadArgs,
    ) =>
      | OnLoadResult
      | null
      | undefined
      | Promise<OnLoadResult | null | undefined>,
  ) => void,
) {
  onLoadFunction(
    { filter: /\.scss$/ },
    async (args) => {
      const file = await Deno.readTextFile(args.path);
      const css = sass(file, {
        style: initialOptions.minify ? "compressed" : "expanded",
      }).to_string();

      return {
        contents: getTextContent(css),
        loader: "css",
      };
    },
  );
}

/**
 * The main plugin object.
 *
 * @returns The plugin
 */
export default function sassPlugin(): ESBuildPlugin {
  return {
    name: "esbuild-plugin-sass",
    setup: (build) =>
      sassPluginSetup(
        build.initialOptions,
        build.onLoad,
      ),
  };
}
