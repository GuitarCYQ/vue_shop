// 这是项目发布阶段需要用到的 bable 插件
const prodPlugins = []
// 产品处于发布模式
if(process.env.NODE_ENV === 'production'){
  prodPlugins.push('transform-remove-console')
}


module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk'
      }
    ],
    // 发布产品时候的插件数组
    ...prodPlugins,
    // 懒加载
    '@babel/plugin-syntax-dynamic-import'
  ]
}
