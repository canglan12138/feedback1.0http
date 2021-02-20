module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport": {
      viewportWidth: 375,//视窗宽度，设计稿宽度
      viewportHeight: 667,//视窗高度，设计稿高度
      unitPrecision: 5,//'px'转换为视窗单位值的小数位数
      viewportUnit: 'vw',//需要转换成的视窗单位，建议使用vw
      selectorBlackList: ['ignore','tab-bar','tab-bar-item'],//不需要转换的类
      minPixelValue: 1,//小于或等于‘1px’不转换为视窗单位
      mediaQuery: false,//允许在媒体查询中转换‘px’
      exclude: [/TabBar/]//正则表达式匹配文件
    },
  }
}
