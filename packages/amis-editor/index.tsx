/**
 * @file entry of this example.
 * @author fex
 */
import * as React from 'react';
import {createRoot} from 'react-dom/client';
import App from './src/App.tsx';

export function bootstrap(mountTo: HTMLElement) {
  const root = createRoot(mountTo);
  root.render(<App />);
}
