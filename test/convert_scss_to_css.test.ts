import { assertEquals } from "@std/assert";
import * as esbuild from "esbuild";
import sassPlugin from "../mod.ts";

Deno.test(
  "Convert SCSS to CSS",
  async () => {
    const sassConfig: esbuild.BuildOptions = {
      allowOverwrite: true,
      logLevel: "silent",
      color: true,
      minify: true,
      outfile: "./test/dist/bundle.min.css",
      entryPoints: [
        "./test/src/index.scss",
      ],
      plugins: [
        sassPlugin(),
      ],
    };

    await esbuild.build(sassConfig);

    esbuild.stop();

    const cssIn = `body{background-color:red}body div{background-color:#00f}\n`;
    const cssOut = await Deno.readTextFile("./test/dist/bundle.min.css");

    assertEquals(cssOut, cssIn);
  },
);
