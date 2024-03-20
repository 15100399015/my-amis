import * as React from 'react';
import {AlertComponent, ToastComponent, ContextMenu} from 'amis';
import AMisSchemaEditor from './Editor';

import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/css/v4-shims.css';

import './style.scss';

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
