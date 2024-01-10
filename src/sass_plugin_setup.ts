import {
  BuildOptions,
  OnLoadArgs,
  OnLoadOptions,
  OnLoadResult,
} from "https://deno.land/x/esbuild@v0.19.11/mod.js";
import sass from "https://deno.land/x/denosass@1.0.6/mod.ts";
import getTextContent from "./get_text_content.ts";

/**
 * This function registers the onLoad function and sets some initial options.
 */
export default function sassPluginSetup(
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
