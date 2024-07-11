import type { Plugin as ESBuildPlugin } from "esbuild";
import sassPluginSetup from "./sass_plugin_setup.ts";

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
