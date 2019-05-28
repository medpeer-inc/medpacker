const TARGET_BROWSERS = require('./browsers');

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        targets: {
          browsers: TARGET_BROWSERS
        },
        forceAllTransforms: true,
        useBuiltIns: 'usage',
        corejs: 3
      }
    ]
  ],
  env: {
    test: {
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              node: 'current'
            }
          }
        ]
      ]
    }
  }
};
