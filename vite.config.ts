import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import svgr from 'vite-plugin-svgr';
import monacoEditorPlugin from 'vite-plugin-monaco-editor';
import fis3 from './scripts/fis3plugin';

const resolve = (p: string) => {
  return path.resolve(__dirname, p);
};
// https://vitejs.dev/config/
export default defineConfig({
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
        replacement: resolve('./packages/react-native-components/src')
      },
      {
        find: 'mdes-formula/lib',
        replacement: resolve('./packages/mdes-formula/src')
      },
      {
        find: 'mdes-formula',
        replacement: resolve('./packages/mdes-formula/src')
      },
      {
        find: 'mdes-ui/lib',
        replacement: resolve('./packages/mdes-ui/src')
      },
      {
        find: 'mdes-ui',
        replacement: resolve('./packages/mdes-ui/src')
      },
      {
        find: 'mdes-core',
        replacement: resolve('./packages/mdes-core/src')
      },
      {
        find: 'mdes/lib',
        replacement: resolve('./packages/mdes/src')
      },
      {
        find: 'mdes/schema.json',
        replacement: resolve('./packages/mdes/schema.json')
      },
      {
        find: 'mdes',
        replacement: resolve('./packages/mdes/src')
      },
      {
        find: 'mdes-editor',
        replacement: resolve('./packages/mdes-editor/src')
      },
      {
        find: 'mdes-editor-core',
        replacement: resolve('./packages/mdes-editor-core/src')
      },
      {
        find: 'mdes-theme-editor-helper',
        replacement: resolve('./packages/mdes-theme-editor-helper/src')
      }
    ]
  }
});
