# SASS Plugin Module for ESBuild

Usage:

```ts
import sassPlugin from 'https://deno.land/x/esbuild_plugin_sass@v0.1.0';

await esbuild.build({
  allowOverwrite: true,
  logLevel: 'info',
  color: true,
  minify: true,
  outdir: './dist',
  entryNames: '[dir]/bundle.min',
  entryPoints: [
    './src/**/index.scss',
  ],
  plugins: [
    sassPlugin()
  ],
});
esbuild.stop()
```
