const path = require('path')
const srclintPath = path.resolve(__dirname, './src/**/*.js')

module.exports = function (grunt) {
  'use strict'
  //  Project configuration
  grunt.initConfig({
    babel: {
      src: {
        files: [
          { expand: true, cwd: './src', src: '**/*.js', dest: './lib', ext: '.js' }
        ]
      }
    },
    eslint: {
      src: {
        options: {
          format: 'node_modules/eslint-formatter-pretty'
        },
        src: [srclintPath]
      }
    },
    copy: {
      lib: {
        files: [
          { expand: true, cwd: './res/images/', src: ['**'], dest: './lib/Resources/images/' }
        ]
      }
    },
    clean: {
      lib: ['./lib/*']
    }
  })

  grunt.loadNpmTasks('grunt-nodemon')
  grunt.loadNpmTasks('grunt-eslint')
  grunt.loadNpmTasks('grunt-babel')
  grunt.loadNpmTasks('grunt-contrib-clean')
  grunt.loadNpmTasks('grunt-contrib-copy')
  grunt.loadNpmTasks('grunt-exec')

  grunt.registerTask('build', 'Build lib', function () {
    grunt.task.run('prep')
    grunt.task.run('check')
    grunt.task.run('compile')
  })
  grunt.registerTask('prep', ['clean:lib', 'copy:lib'])
  grunt.registerTask('check', ['eslint:src'])
  grunt.registerTask('compile', ['babel:src'])
}
