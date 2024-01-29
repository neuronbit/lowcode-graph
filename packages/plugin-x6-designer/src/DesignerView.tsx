import { createElement, Fragment, PureComponent } from "react";
import { ILowCodePluginContext, event } from '@alilc/lowcode-engine';
import { Editor } from '@alilc/lowcode-editor-core';
import { initGraph } from "./graph/initGraph";
import Nodes from "./items";
import { render } from "react-dom";
import { registerShape } from "./graph/registerShape";
import { initEvents } from "./graph/initEvents";
import x6Designer from './designer';

interface IProps {
  editor: Editor;
  ctx: ILowCodePluginContext;
}

export default class DesignerView extends PureComponent<IProps> {
  private container: HTMLDivElement;
  private nodesContainer: HTMLDivElement;

  refContainer = (container: HTMLDivElement) => {
    this.container = container;
  }

  refNodesContainer = (container: HTMLDivElement) => {
    this.nodesContainer = container;
  }

  getContainerSize() {
    const leftPanel = document.querySelector('.lc-left-area')?.clientWidth || 0;
    const rightPanel =
        document.querySelector('.lc-right-area')?.clientWidth || 0;
    return {
      // width: document.body.offsetWidth - leftPanel - rightPanel,
      width: document.querySelector('.lc-main-area')?.clientWidth || 0,
      height: document.querySelector('.lc-main-area')?.clientHeight || 0,
    };
  };

  componentDidMount() {
    registerShape();

    // @ts-ignore
    const graph = initGraph(this.container, []);
    if (graph) {
      x6Designer.init(this.props.ctx, graph);
      initEvents(this.props.ctx, graph);

      // add nodes & edges
      render(
        createElement(Nodes, {
          graph,
          ctx: this.props.ctx,
        }),
        this.nodesContainer
      );

    }

    event.on('common:SplitPane', (args:any[])=>{
      const { width, height } = this.getContainerSize();
      console.log('get container size:', width, height, args);
      graph.resize(args[0], height);
      graph.resizeScroller(args[0], height);
      graph.resizePage(args[0], height);
    })
  }

  componentWillUnmount() {
    event.off('common:SplitPane',()=>{})
  }

  render() {
    return (
      <div id="design-view" className="design-view" ref={this.refContainer}>
        <div id="design-view-nodes" ref={this.refNodesContainer}></div>
      </div>
    )
  }
}
