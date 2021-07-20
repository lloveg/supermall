module.exports = {
  // publicPath: './',
  configureWebpack: {
    resolve: {
      alias: {
        // 'src': '@',
        'views': '@/views',
        'components': '@/components',
        'network': '@/network',
        'common': '@/common',
        'assets': '@/assets',
      }
    }
  }
}

// const path = require('path')

// function resolve (dir) {
//   return path.join(__dirname, dir)
// }
// module.exports = {
//   configureWebpack:{
//     resolve:{
//       alias: {
//         '@': resolve('src'),
//         'assets' : '@/assets',
//         'common' : '@/common',
//         'components' : '@/components',
//         'views' : '@/views',
//         'network' : '@/network',
//       }
//     }
//   }
// }
