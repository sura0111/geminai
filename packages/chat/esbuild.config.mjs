import esbuild from 'esbuild'
import { nodeExternalsPlugin } from 'esbuild-node-externals'

await esbuild.build({
  entryPoints: ['./index.ts'],
  bundle: true,
  outfile: 'dist/index.mjs',
  platform: 'node',
  format: 'esm',
  plugins: [nodeExternalsPlugin({ allowWorkspaces: true })],
})
