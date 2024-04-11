import React, {ReactNode} from 'react';
import {isWeb} from '../util';

/**
 * @description 高阶组件-错误边界处理
 * @param Component 需要设置错误边界的组件
 * @returns ErrorBoundaryComponent
 * @example
 */
export function ErrorBoundaryWrapper<T>(
  WrappedComponent: React.ComponentType<T>,
  fallback?: ReactNode | null
) {
  return class ErrorBoundaryComponent extends React.Component<
    T,
    {hasError: boolean}
  > {
    constructor(props: any) {
      super(props);
      this.state = {hasError: false};
    }

    static getDerivedStateFromError(error: Error) {
      console.error('出错了铁子！');
      if (isWeb) throw error;
      return {hasError: true};
    }

    render() {
      if (this.state.hasError) {
        return fallback || null;
      }

      return <WrappedComponent {...this.props} />;
    }
  };
}
