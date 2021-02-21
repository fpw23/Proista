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
      dist: {
        files: [
          { expand: true, cwd: './node_modules/@proista/client/lib/Resources/images/', src: ['**'], dest: './dist/content/images/' },
          { expand: true, cwd: './node_modules/@proista/client/lib/Resources/js/', src: ['**'], dest: './dist/content/js/' },
          { expand: true, cwd: './node_modules/@proista/client/lib/Resources/css/', src: ['**'], dest: './dist/content/css/' },
          { src: 'node_modules/@proista/client-ui-material/lib/Resources/js/worker-javascript.js', dest: 'dist/content/js/worker-javascript.js' },
          { src: 'node_modules/@proista/client-ui-material/lib/Resources/js/worker-html.js', dest: 'dist/content/js/worker-html.js' },
          { src: 'node_modules/@proista/client-ui-material/lib/Resources/js/worker-css.js', dest: 'dist/content/js/worker-css.js' },
          { src: 'node_modules/@proista/client-ui-material/lib/Resources/js/worker-json.js', dest: 'dist/content/js/worker-json.js' }
        ]
      },
      deploy: {
        files: [
          { expand: true, cwd: './node_modules/@proista/client/lib/Resources/images/', src: ['**'], dest: './deploy/content/images/' },
          { expand: true, cwd: './node_modules/@proista/client/lib/Resources/js/', src: ['**'], dest: './deploy/content/js/' },
          { expand: true, cwd: './node_modules/@proista/client/lib/Resources/css/', src: ['**'], dest: './deploy/content/css/' },
          { src: 'node_modules/@proista/client-ui-material/lib/Resources/js/worker-javascript.js', dest: 'deploy/content/js/worker-javascript.js' },
          { src: 'node_modules/@proista/client-ui-material/lib/Resources/js/worker-html.js', dest: 'deploy/content/js/worker-html.js' },
          { src: 'node_modules/@proista/client-ui-material/lib/Resources/js/worker-css.js', dest: 'deploy/content/js/worker-css.js' },
          { src: 'node_modules/@proista/client-ui-material/lib/Resources/js/worker-json.js', dest: 'deploy/content/js/worker-json.js' }
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
      dist: ['./dist/*'],
      deploy: ['./deploy/*']
    },
    exec: {
      webpackDist: {
        cmd: 'npx webpack --config ./src/webpack.prod.config.js --outputPath=./dist/app'
      },
      webpackDeploy: {
        cmd: 'npx webpack --config ./src/webpack.prod.config.js --outputPath=./deploy'
      },
      s3push: {
        cmd: 'aws --profile=frank-cestno-proista s3 sync deploy/ s3://proista-uidemo --delete'
      }
    }
  })

  grunt.loadNpmTasks('grunt-nodemon')
  grunt.loadNpmTasks('grunt-eslint')
  grunt.loadNpmTasks('grunt-babel')
  grunt.loadNpmTasks('grunt-contrib-clean')
  grunt.loadNpmTasks('grunt-contrib-copy')
  grunt.loadNpmTasks('grunt-exec')

  // setup tasks
  grunt.registerTask('start', 'Start debugging', function () {
    grunt.task.run('prepdist')
    grunt.task.run('buildserver')
    grunt.task.run('debug')
  })
  grunt.registerTask('prepdocker', 'Build for Docker Use', function () {
    grunt.task.run('prepdist')
    grunt.task.run('buildserver')
    grunt.task.run('buildclientdist')
  })
  grunt.registerTask('prepcloudfront', 'Build for Cloud Front Use', function () {
    grunt.task.run('prepdeploy')
    grunt.task.run('buildclientdeploy')
  })
  grunt.registerTask('deploys3', ['exec:s3push'])
  grunt.registerTask('prepdist', ['clean:dist', 'copy:dist'])
  grunt.registerTask('prepdeploy', ['clean:deploy', 'copy:deploy'])
  grunt.registerTask('debug', ['nodemon:app'])
  grunt.registerTask('check', ['eslint:app', 'eslint:server'])
  grunt.registerTask('buildserver', ['babel:app'])
  grunt.registerTask('buildclientdist', ['exec:webpackDist'])
  grunt.registerTask('buildclientdeploy', ['exec:webpackDeploy'])
}
