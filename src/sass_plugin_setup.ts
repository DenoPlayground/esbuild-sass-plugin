import sass from 'https://deno.land/x/denosass@1.0.6/mod.ts';
import {
  BuildOptions,
  OnLoadArgs,
  OnLoadOptions,
  OnLoadResult,
} from 'https://deno.land/x/esbuild@v0.19.11/mod.js';
import getTextContent from './get_text_content.ts';

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
      const file = await Deno.readTextFile(args.path);
      const css = sass(
        file,
        { 
          style: initialOptions.minify ? 'compressed' : 'expanded',
          load_paths: [
            args.namespace,
            args.path
          ]
        }
      ).to_string();

      return {
        contents: getTextContent(css),
        loader: 'css',
      };
    },
  );
}
