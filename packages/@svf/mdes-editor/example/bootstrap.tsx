/**
 * @file entry of this example.
 * @author fex
 */
import * as React from 'react';
import {createRoot} from 'react-dom/client';
import {AlertComponent, ToastComponent, ContextMenu} from 'mdes';
import MDesSchemaEditor from './Editor';

export default class App extends React.PureComponent {
  render() {
    return (
      <div className="Editor">
        <div id="headerBar" className="Editor-header">
          <div className="Editor-title">可视化</div>
        </div>
        <MDesSchemaEditor theme={'cxd'} />
        <ToastComponent theme={'cxd'} />
        <AlertComponent theme={'cxd'} />
        <ContextMenu theme={'cxd'} />
      </div>
    );
  }
}

export function bootstrap(mountTo: HTMLElement) {
  const root = createRoot(mountTo);
  root.render(<App />);
}
