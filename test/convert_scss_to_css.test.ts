import * as esbuild from 'https://deno.land/x/esbuild@v0.19.11/mod.js';
import sassPlugin from '../mod.ts';
import { assertEquals } from 'https://deno.land/std@0.162.0/testing/asserts.ts';

Deno.test(
  'Convert SCSS to CSS',
  async (test) => {
    const sassConfig: esbuild.BuildOptions = {
      allowOverwrite: true,
      logLevel: 'silent',
      color: true,
      minify: true,
      outfile: './test/dist/bundle.min.css',
      entryPoints: [
        './test/src/index.scss',
      ],
      plugins: [
        sassPlugin()
      ],
    };
    
    await esbuild.build(sassConfig);
    
    esbuild.stop()

    const cssIn = `body{background-color:red}body div{background-color:#00f}\n`;
    const cssOut = await Deno.readTextFile('./test/dist/bundle.min.css');

    assertEquals(cssOut, cssIn);
  }
)
