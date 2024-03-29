/**
 * @file  InsetBoxModel
 * @description 盒模型控件，支持编辑 top、right、bottom、left
 */

import cx from 'classnames';
import React from 'react';
import {observer} from 'mobx-react';
import camelCase from 'lodash/camelCase';
import {FormItem} from 'mdes';
import {isNumeric} from 'mdes-editor-core';
import type {FormControlProps} from 'mdes-core';
import {isAuto} from '../../util';
import type {PlainObject} from './types';

export type Direction = 'left' | 'right' | 'top' | 'bottom';

function InsetBoxModel({
  value,
  onChange
}: {
  value?: PlainObject;
  onChange: (value: PlainObject) => void;
}) {
  const directions: Direction[] = ['left', 'right', 'top', 'bottom'];

  function handleChange(styleName: string) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      let inputValue = e.target.value;

      if (!inputValue) {
        onChange({...value, [styleName]: ''});
        return;
      }

      // 数字类型或带有合法单位的字符串都支持
      if (
        isNumeric(inputValue) ||
        isAuto(inputValue) ||
        /^(-?(\d*\.)?\d+)((px)|(em)|(%)|(ex)|(ch)|(rem)|(vw)|(vh)|(vmin)|(vmax)|(cm)|(mm)|(in)|(pt)|(pc))$/.test(
          inputValue
        )
      ) {
        onChange({
          ...value,
          [styleName]: inputValue
        });
      }
    };
  }

  function renderBoxItem() {
    return (
      <>
        {directions.map((direction: Direction) => {
          const propsName = direction;

          return (
            <input
              key={propsName}
              placeholder="0"
              className={`ae-BoxModel-input ${direction}`}
              type="text"
              onChange={handleChange(propsName)}
              value={value?.[propsName] || ''}
            />
          );
        })}
        <div className="ae-BoxModel-title">{'adsa'}</div>
        {['lt', 'lb', 'rt', 'rb'].map(position => (
          <div key={position} className={cx('ae-BoxModel-line', position)} />
        ))}
      </>
    );
  }

  return (
    <div className="mx-2 ae-BoxModel">
      <div className="ae-BoxModel-inner"></div>
      {renderBoxItem()}
    </div>
  );
}

export default observer(InsetBoxModel);

@FormItem({type: 'inset-box-model'})
export class BoxModelRenderer extends React.Component<FormControlProps> {
  render() {
    return <InsetBoxModel {...this.props} />;
  }
}
