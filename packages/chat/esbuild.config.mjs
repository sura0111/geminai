import esbuild from 'esbuild'
import { nodeExternalsPlugin } from 'esbuild-node-externals'

await esbuild.build({
  entryPoints: ['./index.ts', './bin/geminai.ts'],
  bundle: true,
  outdir: 'dist',
  outExtension: { '.js': '.cjs' },
  platform: 'node',
  plugins: [nodeExternalsPlugin({ allowWorkspaces: true })],
})
