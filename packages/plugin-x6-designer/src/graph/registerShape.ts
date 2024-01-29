import { LceCircle } from './register/shape/lce-circle';
import { Graph, Path} from '@antv/x6';
import { LceDiamond } from './register/shape/lce-diamond';
import { LceRect } from './register/shape/lce-rect';

function registerNode(nodeName: string, node: any) {
  // 在 registerNode 前进行 unregisterNode, 防止在多资源场景下由于注册重复的 node 导致报错。
  Graph.unregisterNode(nodeName);
  Graph.registerNode(nodeName, node);
}

/**
 * 注册 shape
 */
export function registerShape() {
  registerNode('lce-rect', LceRect);

  registerNode('lce-diamond', LceDiamond);

  registerNode('lce-circle', LceCircle);

  Graph.registerEdge(
      'dag-edge',
      {
        inherit: 'edge',
        attrs: {
          line: {
            stroke: '#C2C8D5',
            strokeWidth: 1,
            targetMarker: null,
          },
        },
      },
      true,
  );

  Graph.registerConnector(
      'algo-connector',
      (s, e) => {
        const offset = 4
        const deltaY = Math.abs(e.y - s.y)
        const control = Math.floor((deltaY / 3) * 2)

        const v1 = { x: s.x, y: s.y + offset + control }
        const v2 = { x: e.x, y: e.y - offset - control }

        return Path.normalize(
            `M ${s.x} ${s.y}
            L ${s.x} ${s.y + offset}
            C ${v1.x} ${v1.y} ${v2.x} ${v2.y} ${e.x} ${e.y - offset}
            L ${e.x} ${e.y}
            `,
        )
      },
      true,
  )
}
