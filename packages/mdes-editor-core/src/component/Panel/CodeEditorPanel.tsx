import React from 'react';
import {PanelProps} from '../../plugin';
import {autobind} from '../../util';
import MDesCodeEditor from './MDesCodeEditor';

export default class CodeEditorPanel extends React.Component<PanelProps> {
  @autobind
  handleCodePaste() {
    setTimeout(() => {
      this.props.manager.patchSchema(true);
    }, 500);
  }

  render() {
    const {onChange, store} = this.props;

    return (
      <div className="ae-CodePanel">
        <div className="panel-header">源码</div>
        <div className="ae-CodePanel-content">
          <MDesCodeEditor
            value={store.valueWithoutHiddenProps}
            onChange={onChange}
            onPaste={this.handleCodePaste}
          />
        </div>
      </div>
    );
  }
}
