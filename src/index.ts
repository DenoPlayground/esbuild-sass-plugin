import * as esbuild from "https://deno.land/x/esbuild@v0.19.11/mod.js";
import sass from "https://deno.land/x/denosass@1.0.6/mod.ts"

export const sassPlugin: esbuild.Plugin = {
    name: "esbuild-plugin-sass",
    setup: (build) => {
        build.onLoad(
            { filter: /\.scss$/ },
            async (args) => {
                console.log(args.path);
                
                const file = (await Deno.readTextFile(args.path)).trim() || '/**/'
                const css = sass(file, {
                    style: build.initialOptions.minify ? 'compressed' : 'expanded'
                }).to_string()
                
                return {
                    contents: css.toString(),
                    loader: 'css'
                }
            }
        )
    }
}
