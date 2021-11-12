// 主要图表配置
const initGraphChartOptions = (chartData) => {
  const itemColors = ['#2C72FF', '#36A9FF', '#74D048', '#F9BE44']
  const lineColors = ['#AFDDFF', '#C7ECB6', '#FDE5B4']
  return {
    tooltip: {
      borderColor: '#fff',
      // triggerOn: 'click', // tooltip 触发方式
      padding: 0,
      formatter: (params) => {
        return `<div style="width: 200px;height: 88px;display: flex;align-items: center;padding-left: 24px;">
          <img src="${chartData.img}" style="width: 40px;height: 40px;border: 2px solid #2C72FF;border-radius: 50%">
          <div style="display: flex;flex-direction: column;justify-content: center;margin-left: 12px;color: #333;ine-height: 20px;font-size: 14px;font-family: PingFangSC-Regular, PingFang SC;">
            <span style="margin-bottom: 3px;">${params.name}</span>
            <span>总访客数：${params.dataIndex}</span>
          </div>
        </div>`
      }
    },
    color: itemColors,
    legend: [
      {
        icon: 'circle',
        data: chartData.categories.map(function (a) {
          return a.name
        })
      }
    ],
    series: [
      {
        type: 'graph',
        layout: 'force',
        animation: true,
        legendHoverLink: false,
        hoverAnimation: false,
        label: {
          show: true,
          position: 'inside',
          width: 28,
          height: 28,
          formatter: '',
          lineOverflow: 'truncate',
        },
        symbolSize: 30,
        itemStyle: {
          borderWidth: 2,
          borderType: 'solid'
        },
        draggable: true,
        data: chartData.nodes.map(function(node, idx) {
          node.id = node.id || idx
          node.label = {
            backgroundColor: {
              image: chartData.img
            }
          }
          node.itemStyle = {
            borderColor: itemColors[node.category]
          }
          if (node.category === 0) {
            node.symbolSize = 36
            Object.assign(node.label, {
              width: 34,
              height: 34,
            })
          }
          // 灰化节点测试
          // else if (node.category === 2) {
          //   node.itemStyle.opacity = 0.1
          // }
          return node
        }),
        categories: chartData.categories,
        force: {
          edgeLength: 60,
          repulsion: 300,
          gravity: 0.01
        },
        edges: chartData.links.map((item) => {
          item.lineStyle = {
            color: lineColors[item.category]
          }
          // 灰化节点连线
          // if (item.category !== 0) {
          //   item.lineStyle = {
          //     ...item.lineStyle,
          //     opacity: 0.2
          //   }
          // }
          return item
        })
      }
    ]
  }
}

// 图表数据
const getData = () => {
  // 注：如果节点是圆形背景图片，图片必须使用 png 格式的圆行透明背景，eCharts label 无法处理图片
  const img = 'http://eqxiu-test-1251586368.picsh.myqcloud.com/material/video/6500e235c8994348ae27c486739d71f4/3733f1328ccd5bb81662c5ad52585dfc.jpeg?imageMogr2/format/png|imageMogr2/iradius/300'
  return {
    img,
    categories: [
      {
        name: '发起人'
      },
      {
        name: '一级参与人'
      },
      {
        name: '二级参与人'
      },
      {
        name: '客户'
      }
    ],
    nodes: [
      {
        name: '常李',
        id: 'cl',
        img,
        category: 0
      },
      {
        name: '润豪',
        id: 'rh',
        img,
        category: 1
      },
      {
        name: '润豪1',
        id: 'rh1',
        img,
        category: 1
      },
      {
        name: '杨秋',
        id: 'yq',
        img,
        category: 1
      },
      {
        name: '武乾乾',
        id: 'wqq',
        img,
        category: 2
      },
      {
        name: '艾波',
        id: 'ab',
        img,
        category: 2
      },
      {
        name: '安可',
        id: 'ak',
        img,
        category: 2
      }
    ],
    links: [
      {
        source: 'cl',
        target: 'rh',
        category: 0
      },
      {
        source: 'cl',
        target: 'rh1',
        category: 0
      },
      {
        source: 'cl',
        target: 'yq',
        category: 0
      },
      {
        source: 'rh',
        target: 'wqq',
        category: 1
      },
      {
        source: 'yq',
        target: 'ab',
        category: 2
      },
      {
        source: 'yq',
        target: 'ak',
        category: 2
      }
    ]
  }
}

const option = initGraphChartOptions(getData())