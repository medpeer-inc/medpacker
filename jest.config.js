/* globals module */
module.exports = {
  globals: {
    'ts-jest': {
      tsConfig: 'spec/javascripts/tsconfig.json'
    }
  },
  moduleFileExtensions: ['js', 'ts', 'json', 'vue'],
  testPathIgnorePatterns: ['/node_modules/', '/env/'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest',
    '.*\\.(vue)$': 'vue-jest'
  },
  moduleNameMapper: {
    '^@js/(.+)': '<rootDir>/app/bundles/javascripts/$1',
    '^@style/(.+)': '<rootDir>/app/bundles/stylesheets/$1',
    '^@image/(.+)': '<rootDir>/app/bundles/images/$1',
    '^vue$': 'vue/dist/vue.common.js',
    '^@spec/(.+)': '<rootDir>/spec/javascripts/$1'
  },
  testMatch: ['<rootDir>/spec/javascripts/**/?(*.)(spec|test).(js|ts)?(x)'],
  snapshotSerializers: ['jest-serializer-vue'],
  collectCoverageFrom: [
    '<rootDir>/app/bundles/javascript/**/*.vue',
    '<rootDir>/app/bundles/javascript/**/*.js',
    '<rootDir>/app/bundles/javascript/**/*.ts'
  ]
};
