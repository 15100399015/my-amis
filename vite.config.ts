import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import svgr from 'vite-plugin-svgr';
import monacoEditorPlugin from 'vite-plugin-monaco-editor';
import fis3 from './scripts/fis3plugin';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      input: path.join(__dirname, './packages/amis-editor/index.html')
    },
    outDir: 'output' // 输出目录设置为 'output'
  },
  plugins: [
    fis3(),
    react({
      babel: {
        parserOpts: {
          plugins: ['decorators-legacy', 'classProperties']
        }
      }
    }),
    svgr({
      exportAsDefault: true,
      svgrOptions: {
        svgProps: {
          className: 'icon'
        },
        prettier: false,
        dimensions: false
      }
    }),
    monacoEditorPlugin({})
  ].filter(n => n),
  optimizeDeps: {
    include: ['amis-formula/lib/doc'],
    exclude: ['amis-core', 'amis-formula', 'amis', 'amis-ui'],
    esbuildOptions: {
      target: 'esnext'
    }
  },
  server: {
    host: '0.0.0.0',
    port: 8888
  },
  resolve: {
    alias: [
      {
        find: 'moment/locale',
        replacement: 'moment/dist/locale'
      },
      {
        find: 'react-native',
        replacement: 'react-native-web'
      },
      {
        find: 'react-native-linear-gradient',
        replacement: 'react-native-web-linear-gradient'
      },
      {
        find: 'react-native-components',
        replacement: path.resolve(
          __dirname,
          './packages/react-native-components/src'
        )
      },
      {
        find: 'amis-formula/lib',
        replacement: path.resolve(__dirname, './packages/amis-formula/src')
      },
      {
        find: 'amis-formula',
        replacement: path.resolve(__dirname, './packages/amis-formula/src')
      },
      {
        find: 'amis-ui/lib',
        replacement: path.resolve(__dirname, './packages/amis-ui/src')
      },
      {
        find: 'amis-ui',
        replacement: path.resolve(__dirname, './packages/amis-ui/src')
      },
      {
        find: 'amis-core',
        replacement: path.resolve(__dirname, './packages/amis-core/src')
      },
      {
        find: 'amis/lib',
        replacement: path.resolve(__dirname, './packages/amis/src')
      },
      {
        find: 'amis/schema.json',
        replacement: path.resolve(__dirname, './packages/amis/schema.json')
      },
      {
        find: 'amis',
        replacement: path.resolve(__dirname, './packages/amis/src')
      },
      {
        find: 'amis-editor',
        replacement: path.resolve(__dirname, './packages/amis-editor/src')
      },
      {
        find: 'amis-editor-core',
        replacement: path.resolve(__dirname, './packages/amis-editor-core/src')
      },
      {
        find: 'amis-theme-editor-helper',
        replacement: path.resolve(
          __dirname,
          './packages/amis-theme-editor-helper/src'
        )
      }
    ]
  }
});
