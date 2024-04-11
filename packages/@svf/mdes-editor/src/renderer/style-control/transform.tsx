/**
 * @file transform 变换
 */

import cx from 'classnames';
import React, {useCallback, useState} from 'react';
import get from 'lodash/get';
import set from 'lodash/set';
import merge from 'lodash/merge';
import {observer} from 'mobx-react';
import {FormItem, NumberInput} from 'mdes';
import type {PlainObject} from './types';
import type {FormControlProps, RendererProps} from 'mdes-core';

type TItems = {
  item: string;
  tip: string;
  content: string;
}[];

const translateItems: TItems = [
  {
    item: 'X',
    tip: 'Y轴',
    content: 'X'
  },
  {
    item: 'Y',
    tip: 'X轴',
    content: 'Y'
  }
];
const scaleItems: TItems = [
  {
    item: 'X',
    tip: '左边框',
    content: 'X'
  },
  {
    item: 'default',
    tip: '整体缩放',
    content: 'all'
  },
  {
    item: 'Y',
    tip: '上边框',
    content: 'Y'
  }
];
const rotateItems: TItems = [
  {
    item: 'default',
    tip: '旋转',
    content: '旋转'
  }
];
const skewItems: TItems = [
  {
    item: 'X',
    tip: 'X轴',
    content: 'X'
  },
  {
    item: 'Y',
    tip: 'Y轴',
    content: 'Y'
  }
];

const degFormat = (value: any) => `${value || 0}deg`;
const degParser = (value: any) => parseInt(value || 0);

type TActiveItem = 'translate' | 'scale' | 'rotate' | 'skew';

function BoxTransform({
  onChange,
  value = {}
}: {
  onChange: (value: PlainObject) => void;
  value?: PlainObject;
} & RendererProps) {
  const [translateItem, setTranslateItem] = useState<string>('X');
  const [scaleItem, setScaleItem] = useState<string>('default');
  const [rotateItem, setRotateItem] = useState<string>('default');
  const [skewItem, setSkewItem] = useState<string>('X');

  function getActiveItem(key: TActiveItem) {
    let activeItems;
    let activeItem;
    if (key === 'translate') {
      activeItems = translateItems;
      activeItem = translateItem;
    } else if (key === 'scale') {
      activeItems = scaleItems;
      activeItem = scaleItem;
    } else if (key === 'rotate') {
      activeItems = rotateItems;
      activeItem = rotateItem;
    } else {
      activeItems = skewItems;
      activeItem = skewItem;
    }
    return {
      activeItems,
      activeItem
    };
  }

  function changeItem(type: string, key: TActiveItem, valFormat?: Function) {
    return (e: any) => {
      const val = valFormat ? valFormat(e) : e;
      const {activeItem, activeItems} = getActiveItem(key);

      const newValue: Record<string, any> = {};
      if (activeItem === 'default') {
        set(newValue, [type, key], val);
        const _v = merge({}, value, newValue);
        activeItems.forEach(({item}) => {
          Reflect.deleteProperty(_v[type], `${key}${item}`);
        });
        onChange(_v);
      } else {
        set(newValue, [type, `${key}${activeItem}`], val);
        onChange(merge({}, value, newValue));
      }
    };
  }

  function renderItem(params: {
    key: TActiveItem;
    placeholder: string;
    label: string;
    curItem: string;
    items: TItems;
    setItem: React.Dispatch<React.SetStateAction<string>>;
    format?: Function;
    parser?: Function;
  }) {
    const {key, label, curItem, setItem, items, placeholder, format, parser} =
      params;
    const val = get(value, [
      'transform',
      `${key}${curItem === 'default' ? '' : curItem}`
    ]);
    return (
      <div className="ae-transform-wrap ae-transform-radius flex items-center">
        <div className="ae-transform-items">
          {items.map(item => {
            return (
              <div
                key={item.item}
                className={cx(`ae-transform-item ${item.item}`, {
                  active: curItem === item.item
                })}
                onClick={() => setItem(item.item)}
              >
                <span data-tooltip={item.tip} data-position="top">
                  {item.content}
                </span>
              </div>
            );
          })}
        </div>

        <div className="ae-transform-settings">
          <div className="flex items-center">
            <label>{label}</label>
            <NumberInput
              placeholder={placeholder}
              value={parser ? parser(val) : val}
              step={0.1}
              min={0}
              max={360}
              onChange={changeItem('transform', key, format)}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-2 ae-transform">
      {renderItem({
        key: 'translate',
        label: '平移',
        placeholder: '偏移量',
        items: translateItems,
        curItem: translateItem,
        setItem: setTranslateItem
      })}
      {renderItem({
        key: 'scale',
        label: '缩放',
        placeholder: '缩放倍数',
        items: scaleItems,
        curItem: scaleItem,
        setItem: setScaleItem
      })}
      {renderItem({
        key: 'rotate',
        label: '旋转',
        placeholder: '旋转角度(deg)',
        items: rotateItems,
        curItem: rotateItem,
        setItem: setRotateItem,
        format: degFormat,
        parser: degParser
      })}
      {renderItem({
        key: 'skew',
        label: '倾斜',
        placeholder: '倾斜角度(deg)',
        items: skewItems,
        curItem: skewItem,
        setItem: setSkewItem,
        format: degFormat,
        parser: degParser
      })}
    </div>
  );
}

export default observer(BoxTransform);

@FormItem({type: 'style-transform', renderLabel: false})
export class BorderRenderer extends React.Component<FormControlProps> {
  render() {
    return <BoxTransform {...this.props} />;
  }
}
