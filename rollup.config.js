import esbuild from 'rollup-plugin-esbuild'

export default {
  input: './src/index.ts',
  plugins: [
    esbuild({
      sourceMap: true,
    }),
  ],
  output: {
    dir: 'pkg',
    format: 'es',
  },
}
