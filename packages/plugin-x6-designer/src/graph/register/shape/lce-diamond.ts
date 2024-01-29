import { BlueColor, DeepBlueColor, portR, strokeWidth } from "./const";

export const LceDiamond = {
  inherit: 'polygon',
  width: 164,
  height: 100,
  attrs: {
    body: {
      stroke: '#7e0505',
      strokeWidth,
      points: "0, 50, 82, 0, 164, 50, 82, 100",
      fill: '#eecccc',
      rx: 10,
      ry: 10
    },
    text: {
      width: 60,
      height: 70,
      fontSize: 12,
      fill: DeepBlueColor,
      lineHeight: 12,
      textWrap: {
        width: 60,
        height: 70,
        ellipsis: true,  // 文本超出显示范围时，自动添加省略号
        breakWord: true, // 是否截断单词
      }
    },
    image: {
      width: 20,
      height: 20,
      x: 30,
      y: 24,
    },
  },
  markup: [
    {
      tagName: 'polygon',
      selector: 'body',
    },
    {
      tagName: 'text',
      selector: 'text',
    },
    {
      tagName: 'image',
      selector: 'image',
    },
  ],
  ports: {
    groups: {
      top: {
        position: 'top',
        attrs: {
          circle: {
            r: portR,
            magnet: true,
            stroke: BlueColor,
            strokeWidth: 1,
            fill: '#fff',
            style: {
              visibility: 'hidden',
              opacity: '1'
            },
          },
        },
        zIndex: 99,
      },
      right: {
        position: 'right',
        attrs: {
          circle: {
            r: portR,
            magnet: true,
            stroke: BlueColor,
            strokeWidth: 1,
            fill: '#fff',
            style: {
              visibility: 'hidden',
              opacity: '1'
            },
          },
        },
        zIndex: 99,
      },
      // bottom: {
      //   position: 'bottom',
      //   attrs: {
      //     circle: {
      //       r: portR,
      //       magnet: true,
      //       stroke: BlueColor,
      //       strokeWidth: 1,
      //       fill: '#fff',
      //       style: {
      //         visibility: 'hidden',
      //         opacity: '1'
      //       },
      //     },
      //   },
      //   zIndex: 99,
      // },
      left: {
        position: 'left',
        attrs: {
          circle: {
            r: portR,
            magnet: true,
            stroke: BlueColor,
            strokeWidth: 1,
            fill: '#fff',
            style: {
              visibility: 'hidden',
              opacity: '1'
            },
          },
        },
        zIndex: 99,
      },
    },
    items: [
      {
        id: 't',
        group: 'top',
        args: {
          dx: 2,
        }
      },
      {
        id: 'r',
        group: 'right',
        args: {
          dx: 2,
          dy: 2
        }
      },
      // {
      //   id: 'b',
      //   group: 'bottom',
      //   args: {
      //     dx: 2,
      //     dy: 2
      //   }
      // },
      {
        id: 'l',
        group: 'left',
        args: {
          dy: 2
        }
      },
    ],
  },
}
