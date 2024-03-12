import * as React from 'react';
import {AlertComponent, ToastComponent, ContextMenu} from 'amis';
// @ts-ignore
import AMisSchemaEditor from './Editor';
export default class App extends React.PureComponent {
  render() {
    return (
      <div className="Editor-Demo">
        <div id="headerBar" className="Editor-header">
          <div className="Editor-title">可视化</div>
        </div>
        <AMisSchemaEditor theme={'cxd'} />
        <ToastComponent theme={'cxd'} />
        <AlertComponent theme={'cxd'} />
        <ContextMenu theme={'cxd'} />
      </div>
    );
  }
}
