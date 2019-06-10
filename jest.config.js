/* globals module */
module.exports = {
	moduleFileExtensions: ['js', 'json', 'vue'],
	testPathIgnorePatterns: ['/node_modules/', '/env/'],
	transform: {
		'^.+\\.js$': 'babel-jest',
		'.*\\.(vue)$': 'vue-jest'
	},
	moduleNameMapper: {
		'^@js/(.+)': '<rootDir>/app/bundles/javascripts/$1',
		'^@style/(.+)': '<rootDir>/app/bundles/stylesheets/$1',
		'^@image/(.+)': '<rootDir>/app/bundles/images/$1',
		'^vue$': 'vue/dist/vue.common.js'
	},
	testMatch:  ['<rootDir>/spec/javascripts/**/?(*.)(spec|test).js?(x)'],
	snapshotSerializers: ['jest-serializer-vue'],
	collectCoverageFrom: [
		'<rootDir>/app/bundles/javascript/**/*.vue',
		'<rootDir>/app/bundles/javascript/**/*.js',
		'<rootDir>/app/bundles/javascript/**/*.ts'
	],
};
