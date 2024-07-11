import { dirname } from "@std/path";
import sass from "denosass";
import type {
  BuildOptions,
  OnLoadArgs,
  OnLoadOptions,
  OnLoadResult,
} from "esbuild";
import getTextContent from "./get_text_content.ts";

/**
 * This function registers the onLoad function and sets some initial options.
 *
 * @param initialOptions Initial options from ESBuild for the plugin to use
 * @param onLoadFunction The `onLoad` function for the plugin
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
): void {
  onLoadFunction(
    { filter: /\.scss$/ },
    async (args) => {
      const fileDirectoryPath = dirname(args.path);
      // Issue: https://github.com/hironichu/denosass/issues/17
      // sass throws for some reason error if file is empty!
      const fileContent = (await Deno.readTextFile(args.path)).trim() || "/**/";

      const cssContent = sass(
        fileContent,
        {
          style: initialOptions.minify ? "compressed" : "expanded",
          load_paths: [
            Deno.cwd(),
            fileDirectoryPath,
          ],
        },
      ).to_string();

      return {
        contents: getTextContent(cssContent),
        loader: "css",
      };
    },
  );
}
