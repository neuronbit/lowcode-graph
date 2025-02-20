import {Node as NodeModel} from '@alilc/lowcode-shell';
import {Edge, Graph, Node} from '@antv/x6';
import {CommandManager, EditorCommand, ICommandCb} from '@alilc/lce-graph-tools';
import {redo, removeItem, undo, zoomIn, zoomOut} from './builtin-commands';

export interface IDesigner {
    onNodeRender: (cb: (model: NodeModel, node: Node) => void) => any[];
    onEdgeRender: (cb: (model: NodeModel, edge: Edge) => void) => any[];
    onEdgeLabelRender: (cb: (args: Graph.Hook.OnEdgeLabelRenderedArgs) => void) => any[];
    getGraph: () => Graph;
}

/**
 * designer 统一导出 api
 */
class Designer implements IDesigner {
    constructor() {
        this.commandManager = new CommandManager({
            [EditorCommand.ZoomIn]: zoomIn,
            [EditorCommand.ZoomOut]: zoomOut,
            [EditorCommand.removeItem]: removeItem,
            [EditorCommand.Undo]: undo,
            [EditorCommand.Redo]: redo
        });
    }

    commandManager: CommandManager;
    public onNodeRenderCb: Array<(model: NodeModel, node: Node) => void> = [];
    public onEdgeRenderCb: Array<(model: NodeModel, edge: Edge) => void> = [];
    public onEdgeLabelRenderCb: Array<(args: Graph.Hook.OnEdgeLabelRenderedArgs) => void> = [];
    public graph: Graph;

    // node model data => graph node render
    public onNodeRender = (cb?: (model: NodeModel, node: Node) => void) => {
        if (cb) {
            this.onNodeRenderCb.push(cb);
        }
        return this.onNodeRenderCb;
    }

    // edge model data => graph edge render
    onEdgeRender = (cb?: (model: NodeModel, edge: Edge) => void) => {
        if (cb) {
            this.onEdgeRenderCb.push(cb);
        }
        return this.onEdgeRenderCb;
    }

    onEdgeLabelRender = (cb?: (args: Graph.Hook.OnEdgeLabelRenderedArgs) => void) => {
        if (cb) {
            this.onEdgeLabelRenderCb.push(cb);
        }
        return this.onEdgeLabelRenderCb;
    }

    init(ctx: any, graph: Graph) {
        this.graph = graph;
        this.commandManager.init(ctx, graph);
    }

    getGraph = () => {
        return this.graph;
    }

    public registerCommand = (key: string, listener: ICommandCb) => {
        this.commandManager.register(key, listener);
    }
}

const x6Designer:Designer = new Designer();
export default x6Designer;
