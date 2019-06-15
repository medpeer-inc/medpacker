module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
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
