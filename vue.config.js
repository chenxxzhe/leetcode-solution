module.exports = {
  devServer: {
    overlay: {
      warnings: false,
      errors: false,
    },
  },
  pages: {
    index: {
      // entry for the page
      entry: 'src/main',
      // the source template
      template: 'public/index.html',
      // output as dist/index.html
      filename: 'index.html',
      // when using title option,
      // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Leetcode Exercises',
      // chunks to include on this page, by default includes
      // extracted common chunks and vendor chunks.
      // chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    sandbox: {
      // entry for the page
      entry: 'src/main-sandbox',
      // the source template
      template: 'public/index.html',
      // output as dist/index.html
      filename: 'sandbox.html',
      // when using title option,
      // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Sandbox',
      // chunks to include on this page, by default includes
      // extracted common chunks and vendor chunks.
      // chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
  },
  chainWebpack: config => {},
}
