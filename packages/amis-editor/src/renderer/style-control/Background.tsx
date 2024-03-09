/**
 * @file Background.ts
 * @description 背景设置
 */

import cx from 'classnames';
import React, {useState, useEffect} from 'react';

import {FormItem} from 'amis';

import type {FormControlProps} from 'amis-core';
import type {PlainObject} from './types';
interface BackgroundProps extends FormControlProps {
  receiver?: string;
  value?: PlainObject;
  onChange: (value: PlainObject) => void;
}

const Background: React.FC<BackgroundProps> = props => {
  const [tabIndex, setTabIndex] = useState<number>(0);

  const {render} = props;

  const tabList = ['pure', 'noset'];

  // 获取激活的tab
  function setActiveTab() {
    setTabIndex(0);
  }

  // 清空背景颜色、渐变色、背景图
  function clearValues() {
    const {value, onChange} = props;
    const result = {
      ...value,
      backgroundColor: ''
    };
    onChange(result);
  }

  function tabChange(index: number, item: string) {
    if (item === 'noset') {
      clearValues();
    }
    setTabIndex(index);
  }

  function handleChange(key: string, keyValue: string | number) {
    const {value, onChange} = props;

    const result = {
      ...value,
      [key]: keyValue
    };
    onChange(result);
  }

  const currentItem = tabList[tabIndex];
  useEffect(() => {
    setActiveTab();
  }, []);

  return (
    <div className="ae-Background">
      <div className="ae-Background_tabs">
        <ul className="ae-Background_tabs-nav">
          {tabList.map((item: string, index: number) => {
            return (
              <li
                key={index}
                className={cx(item, {
                  active: tabIndex === index
                })}
                onClick={() => tabChange(index, item)}
              ></li>
            );
          })}
        </ul>
        <div className="ae-Background_tabs-content">
          {/* 纯色 */}
          {currentItem === 'pure' && (
            <div className="ae-Background_setting">
              {render(
                'backgroundColor',
                {
                  type: 'input-color',
                  label: '背景色',
                  format: 'rgba',
                  mode: 'normal',
                  value: props.value?.backgroundColor
                },
                {
                  onChange: (value: string) =>
                    handleChange('backgroundColor', value)
                }
              )}
            </div>
          )}
          {/* 不设置背景 */}
          {currentItem === 'noset' && (
            <div className="ae-Background_setting noset"></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Background;

@FormItem({type: 'style-background'})
export class BackgroundRenderer extends React.Component<FormControlProps> {
  render() {
    return <Background {...this.props} />;
  }
}
