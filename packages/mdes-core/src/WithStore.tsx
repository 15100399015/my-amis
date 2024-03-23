import hoistNonReactStatic from 'hoist-non-react-statics';
import {reaction} from 'mobx';
import {observer} from 'mobx-react';
import {isAlive} from 'mobx-state-tree';
import React from 'react';
import {RendererProps} from './factory';
import {IIRendererStore, IRendererStore} from './store';
import {RendererData, SchemaNode} from './types';
import getExprProperties, {
  hasExprPropertiesChanged
} from './utils/filter-schema';
import {
  createObject,
  extendObject,
  guid,
  isObjectShallowModified,
  syncDataFromSuper,
  isSuperDataModified
} from './utils/helper';
import {dataMapping, tokenize} from './utils/tpl-builtin';
import {RootStoreContext} from './WithRootStore';

export function HocStoreFactory(renderer: {
  storeType: string;
  extendsData?: boolean | ((props: any) => boolean);
  shouldSyncSuperStore?: (
    store: any,
    props: any,
    prevProps: any
  ) => boolean | undefined;
}): any {
  return function <T extends React.ComponentType<RendererProps>>(Component: T) {
    type Props = Omit<
      RendererProps,
      'store' | 'data' | 'dataUpdatedAt' | 'scope'
    > & {
      store?: IIRendererStore;
      data?: RendererData;
      scope?: RendererData;
      rootStore: any;
      topStore: any;
    };

    @observer
    class StoreFactory extends React.Component<Props> {
      static displayName = `WithStore(${
        Component.displayName || Component.name
      })`;
      static ComposedComponent = Component;
      static contextType = RootStoreContext;
      store: IIRendererStore;
      context!: React.ContextType<typeof RootStoreContext>;
      ref: any;
      state: any;
      unReaction: any;

      constructor(
        props: Props,
        context: React.ContextType<typeof RootStoreContext>
      ) {
        super(props);

        const rootStore = context;
        this.renderChild = this.renderChild.bind(this);
        this.refFn = this.refFn.bind(this);

        const store = rootStore.addStore({
          id: guid(),
          path: this.props.$path,
          storeType: renderer.storeType,
          parentId: this.props.store ? this.props.store.id : ''
        }) as IIRendererStore;
        store.setTopStore(props.topStore);
        this.store = store;

        const extendsData =
          typeof renderer.extendsData === 'function'
            ? renderer.extendsData(props)
            : renderer.extendsData;

        if (extendsData === false) {
          store.initData(
            createObject(
              (this.props.data as any)
                ? (this.props.data as any).__super
                : null,
              {
                ...this.formatData(
                  dataMapping(this.props.defaultData, this.props.data)
                ),
                ...this.formatData(this.props.data)
              }
            )
          );
        } else if (
          this.props.scope ||
          (this.props.data && (this.props.data as any).__super)
        ) {
          if (this.props.store && this.props.data === this.props.store.data) {
            store.initData(
              createObject(this.props.store.data, {
                ...this.formatData(
                  dataMapping(this.props.defaultData, this.props.data)
                )
              })
            );
          } else {
            store.initData(
              createObject(
                (this.props.data as any).__super || this.props.scope,
                {
                  ...this.formatData(
                    dataMapping(this.props.defaultData, this.props.data)
                  ),
                  ...this.formatData(this.props.data)
                }
              )
            );
          }
        } else {
          store.initData({
            ...this.formatData(
              dataMapping(this.props.defaultData, this.props.data)
            ),
            ...this.formatData(this.props.data)
          });
        }

        this.state = {};
        const {detectField, ...rest} = props;
        let exprProps: any = {};

        if (!detectField || detectField === 'data') {
          exprProps = getExprProperties(rest, store.data);

          this.state = {
            ...exprProps
          };

          this.unReaction = reaction(
            () => JSON.stringify(getExprProperties(this.props, store.data)),
            () =>
              this.setState({
                ...getExprProperties(this.props, store.data)
              })
          );
        }
      }

      getWrappedInstance() {
        return this.ref;
      }

      refFn(ref: any) {
        this.ref = ref;
      }

      formatData(data: any): object {
        if (Array.isArray(data)) {
          return {
            items: data
          };
        }

        return data as object;
      }

      componentDidUpdate(prevProps: Props) {
        const props = this.props;
        const store = this.store;

        // dialog 场景下 schema 是显示的时候更新的，
        // 所以 schema 里面有表达式属性其实是监听不到变化的
        // 所以这里需要根据新属性重新 reaction 一下
        if (
          (!props.detectField || props.detectField === 'data') &&
          hasExprPropertiesChanged(this.props, prevProps)
        ) {
          const state = getExprProperties(this.props, store.data);
          isObjectShallowModified(state, this.state) && this.setState(state);
          // 需要重新监听
          this.unReaction?.();
          this.unReaction = reaction(
            () => getExprProperties(this.props, store.data),
            (exprProps: any) => this.setState(exprProps)
          );
        }

        const shouldSync = renderer.shouldSyncSuperStore?.(
          store,
          props,
          prevProps
        );

        if (shouldSync === false) {
          return;
        }

        const extendsData =
          typeof renderer.extendsData === 'function'
            ? renderer.extendsData(props)
            : renderer.extendsData;
        if (extendsData === false) {
          if (
            shouldSync === true ||
            prevProps.defaultData !== props.defaultData ||
            (props.trackExpression
              ? tokenize(props.trackExpression, props.data!) !==
                tokenize(props.trackExpression, prevProps.data!)
              : isObjectShallowModified(prevProps.data, props.data) ||
                //
                // 特殊处理 CRUD。
                // CRUD 中 toolbar 里面的 data 是空对象，但是 __super 会不一样
                (props.data &&
                  prevProps.data &&
                  props.data.__super !== prevProps.data.__super))
          ) {
            store.initData(
              extendObject(props.data, {
                ...(store.hasRemoteData ? store.data : null), // todo 只保留 remote 数据
                ...this.formatData(props.defaultData),
                ...this.formatData(props.data)
              }),
              props.updatePristineAfterStoreDataReInit === false
            );
          }
        } else if (
          shouldSync === true ||
          (props.trackExpression
            ? tokenize(props.trackExpression, props.data!) !==
              tokenize(props.trackExpression, prevProps.data!)
            : isObjectShallowModified(prevProps.data, props.data) ||
              (props.syncSuperStore !== false &&
                isSuperDataModified(props.data, prevProps.data, store)))
        ) {
          if (props.store && props.store.data === props.data) {
            store.initData(
              createObject(
                props.store.data,
                props.syncSuperStore === false
                  ? {
                      ...store.data
                    }
                  : syncDataFromSuper(
                      store.data,
                      props.store.data,
                      prevProps.scope,
                      store,
                      props.syncSuperStore === true
                    )
              ),
              props.updatePristineAfterStoreDataReInit === false
            );
          } else if (props.data && (props.data as any).__super) {
            store.initData(
              extendObject(
                props.data,
                // 有远程数据
                // 或者顶级 store
                store.hasRemoteData || !store.path.includes('/')
                  ? {
                      ...store.data,
                      ...props.data
                    }
                  : // combo 不需要同步，如果要同步，在 Combo.tsx 里面已经实现了相关逻辑
                  // 目前主要的问题是，如果 combo 中表单项名字和 combo 本身的名字一样，会导致里面的值会被覆盖成数组
                  props.store?.storeType === 'ComboStore'
                  ? undefined
                  : syncDataFromSuper(
                      {...store.data, ...props.data},
                      (props.data as any).__super,
                      (prevProps.data as any).__super,
                      store,
                      false
                    )
              ),
              props.updatePristineAfterStoreDataReInit === false
            );
          } else {
            store.initData(
              createObject(props.scope, props.data),
              props.updatePristineAfterStoreDataReInit === false
            );
          }
        } else if (
          !props.trackExpression &&
          (!props.store || props.data !== props.store.data) &&
          props.data &&
          props.data.__super
        ) {
          // 这个用法很少，当 data.__super 值发生变化时，更新 store.data
          if (
            !prevProps.data ||
            isObjectShallowModified(
              props.data.__super,
              prevProps.data.__super,
              false
            )
          ) {
            store.initData(
              createObject(props.data.__super, {
                ...props.data,
                ...store.data
              }),

              props.updatePristineAfterStoreDataReInit === false
            );
          }
          // nextProps.data.__super !== props.data.__super) &&
        } else if (
          !props.trackExpression &&
          props.scope &&
          props.data === props.store!.data &&
          prevProps.data !== props.data
        ) {
          // 只有父级数据变动的时候才应该进来，
          // 目前看来这个 case 很少有情况下能进来
          store.initData(
            createObject(props.scope, {
              // ...nextProps.data,
              ...store.data
            }),
            props.updatePristineAfterStoreDataReInit === false
          );
        }
      }

      componentWillUnmount() {
        const rootStore = this.context as IRendererStore;
        const store = this.store;

        this.unReaction?.();
        if (isAlive(store)) {
          store.setTopStore(null);
          rootStore.removeStore(store);
        }

        // @ts-ignore
        delete this.store;
      }

      renderChild(
        region: string,
        node: SchemaNode,
        subProps: {
          data?: object;
          [propName: string]: any;
        } = {}
      ) {
        let {render} = this.props;

        return render(region, node, {
          data: this.store.data,
          dataUpdatedAt: this.store.updatedAt,
          ...subProps,
          scope: this.store.data,
          store: this.store
        });
      }

      render() {
        const {detectField, ...rest} = this.props;

        if (this.state.hidden || this.state.visible === false) {
          return null;
        }

        return (
          <Component
            {
              ...(rest as any) /* todo */
            }
            {...this.state}
            ref={this.refFn}
            data={this.store.data}
            dataUpdatedAt={this.store.updatedAt}
            store={this.store}
            scope={this.store.data}
            render={this.renderChild}
          />
        );
      }
    }
    hoistNonReactStatic(StoreFactory, Component);

    return StoreFactory;
  };
}
