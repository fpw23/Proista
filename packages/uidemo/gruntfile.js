const path = require('path')
const applintpath = path.resolve(__dirname, './src/app/**/*.js')
const serverlintpath = path.resolve(__dirname, './src/server/**/*.js')

module.exports = function (grunt) {
  'use strict'
  //  Project configuration
  grunt.initConfig({
    babel: {
      app: {
        files: [
          { expand: true, cwd: './src/server', src: '**/*.js', dest: './dist/server', ext: '.js' }
        ]
      }
    },
    eslint: {
      app: {
        options: {
          format: 'node_modules/eslint-formatter-pretty'
        },
        src: [applintpath]
      },
      server: {
        options: {
          format: 'node_modules/eslint-formatter-pretty'
        },
        src: [serverlintpath]
      }
    },
    copy: {
      app: {
        files: [
          { expand: true, cwd: './node_modules/@proista/client/lib/Resources/images/', src: ['**'], dest: './dist/content/images/' },
          { expand: true, cwd: './node_modules/@proista/client/lib/Resources/js/', src: ['**'], dest: './dist/content/js/' },
          { expand: true, cwd: './node_modules/@proista/client/lib/Resources/css/', src: ['**'], dest: './dist/content/css/' }
        ]
      }
    },
    nodemon: {
      app: {
        script: './dist/server/server.js',
        options: {
          env: {
            PORT: '3001',
            NODE_ENV: 'development'
          },
          // omit this property if you aren't serving HTML files and
          // don't want to open a browser tab on start
          callback: function (nodemon) {
            nodemon.on('log', function (event) {
              console.log(event.colour)
            })
          },
          watch: ['dist/server/'],
          delay: 20000
        }
      }
    },
    clean: {
      app: ['./dist/*']
    },
    exec: {
      webpackWindows: {
        cwd: './node_modules/.bin',
        cmd: function (webpackfile) { return `webpack --config ${webpackfile}` },
        options: {
          env: 'production'
        }
      },
      webpackLinux: {
        cmd: function (webpackfile) { return `./node_modules/.bin/webpack --config ${webpackfile}` },
        options: {
          env: 'production'
        }
      }
    }
  })

  grunt.loadNpmTasks('grunt-nodemon')
  grunt.loadNpmTasks('grunt-eslint')
  grunt.loadNpmTasks('grunt-babel')
  grunt.loadNpmTasks('grunt-contrib-clean')
  grunt.loadNpmTasks('grunt-contrib-copy')
  grunt.loadNpmTasks('grunt-exec')

  // setup tasks desktop
  grunt.registerTask('start', 'Start debugging', function () {
    grunt.task.run('prep')
    // grunt.task.run('check')
    grunt.task.run('build')
    grunt.task.run('debug')
  })
  grunt.registerTask('prep', ['clean:app', 'copy:app'])
  grunt.registerTask('debug', ['nodemon:app'])
  grunt.registerTask('check', ['eslint:app', 'eslint:server'])
  grunt.registerTask('build', ['babel:app'])
}
