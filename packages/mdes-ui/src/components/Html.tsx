/**
 * @file Html
 * @description
 * @author fex
 */

import React from 'react';
import {ClassNamesFn, themeable} from 'mdes-core';

export interface HtmlProps {
  className?: string;
  html?: string;
  wrapperComponent?: any;
  inline: boolean;
  classPrefix: string;
  classnames: ClassNamesFn;
  filterHtml?: (input: string) => string;
}

export class Html extends React.Component<HtmlProps> {
  static defaultProps = {
    inline: true
  };

  dom: any;

  constructor(props: HtmlProps) {
    super(props);
    this.htmlRef = this.htmlRef.bind(this);
  }

  componentDidUpdate(prevProps: HtmlProps) {
    if (this.props.html !== prevProps.html) {
      this._render();
    }
  }

  htmlRef(dom: any) {
    this.dom = dom;

    if (!dom) {
      return;
    }

    this._render();
  }

  _render() {
    const {html, filterHtml} = this.props;

    if (html) {
      this.dom.innerHTML = filterHtml ? filterHtml(html) : html;
    }
  }

  render() {
    const {
      className,
      wrapperComponent,
      inline,
      classPrefix: ns,
      classnames: cx
    } = this.props;

    const Component = wrapperComponent || (inline ? 'span' : 'div');

    return (
      <Component
        ref={this.htmlRef}
        className={cx(`Html`, className)}
      ></Component>
    );
  }
}

export default themeable(Html);
