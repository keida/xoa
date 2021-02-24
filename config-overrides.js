const { override, addLessLoader, fixBabelImports } = require('customize-cra');
module.exports = override(
  addLessLoader({
    lessOptions: { javascriptEnabled: true, modifyVars: { '@primary-color': '#1DA57A' } },
  }),
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css',
  }),
);
