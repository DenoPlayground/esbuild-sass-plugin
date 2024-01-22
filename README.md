# SASS Plugin Module for Deno ESBuild

## Why?
Why does the plugin exist in the first place? I am currently working on a simple tech stack for Deno frontend development. I use ESBuild as a transpiler and bundler for TypeScript and HTML. Currently there was no easy way for me to convert SCSS (SASS) files to CSS without using another tool. That's why I wrote this plugin to simplify this process.

This plugin can be easily imported and loaded as a module for ESBuild.

## Usage:

```ts
import sassPlugin from 'https://deno.land/x/esbuild_plugin_sass/mod.ts';

await esbuild.build({
  ...
  plugins: [
    sassPlugin()
  ],
});
esbuild.stop()
```
