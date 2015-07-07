module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		browserify: {
			'./public/javascripts/bundle.js': ['./lib/core.js']
		},
		karma: {
			unit: {
				configFile: 'test/karma.conf.js',
				singleRun: true
			}
		}
	})
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-karma');

	grunt.registerTask('default', ['browserify']);
	grunt.registerTask('test', ['browserify', 'karma']);
}