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
    clean: {
      src: ['./lib/*']
    }
  })

  grunt.loadNpmTasks('grunt-eslint')
  grunt.loadNpmTasks('grunt-babel')
  grunt.loadNpmTasks('grunt-contrib-clean')
  grunt.loadNpmTasks('grunt-contrib-copy')

  grunt.registerTask('build', 'Build the Lib', function () {
    grunt.task.run('prep')
    grunt.task.run('check')
    grunt.task.run('compile')
  })
  grunt.registerTask('prep', ['clean:src'])
  grunt.registerTask('check', ['eslint:src'])
  grunt.registerTask('compile', ['babel:src'])
}
