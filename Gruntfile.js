module.exports = function ( grunt ) {
  
  /** 
   * Load required Grunt tasks. These are installed based on the versions listed
   * in `package.json` when you do `npm install` in this directory.
   */
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-less');


  /**
   * This is the configuration object Grunt uses to give each plugin its instructions.
   */
  var taskConfig = {

    /**
     * LESS compilation and uglification automatically.
     * Only our `app.less` file is included in compilation; all other files
     * must be imported from this file.
     */
    less: {
      build: {
        src: [ 'app/less/app.less' ],
        dest: 'app/css/app.css',
        options: {
          compile: true,
          compress: false,
          noUnderscores: false,
          noIDs: false,
          zeroUnits: false
        }
      }
    },

    /**
     * `jshint` defines the rules of our linter as well as which files we
     * should check. This file, all javascript sources, and all our unit tests
     * are linted based on the policies listed in `options`. But we can also
     * specify exclusionary patterns by prefixing them with an exclamation
     * point (!); this is useful when code comes from a third party but is
     * nonetheless inside `app/`.
     */
    jshint: {
      src: [
        'app/**/*.js',
        '!app/vendor/**/*.js'
      ],
      test: [
        'e2e-tests/**/*.js'
      ],
      options: {
        globalstrict: true,
        curly: true,
        immed: true,
        newcap: true,
        noarg: true,
        sub: true,
        boss: true,
        eqnull: true,
        globals: {
          'angular': false,
          'jquery': false,
          'jasmine': false,
          'describe': false,
          'it': false,
          'beforeEach': false,
          'afterEach': false,
          'module': false,
          'expect': false,
          'inject': false,
          'browser': false,
          'element': false,
          'by': false,
          'console': false
        }
      }
    },

    /**
     * Connect is a http server provided by grunt.
     * server - http server started on watch
     * serverstandalone - http server stand-alone
     * testserver - http server used for e2e testing
     */
    connect: {
      options: {
        port: 8000,
        base: 'app'
      },
      server: {
        options: {
          keepalive: false
        }
      },
      serverstandalone: {
        options: {
          keepalive: true
        }
      },
      testserver: {
        options: {
          port: 8100,
          keepalive: false
        }
      }
    },


    /**
     * Watcher configuration: This task watches our file changes and trigger a task accordingly.
     * 'src': Lints changed files and re-executes unit testing.
     * 'less': Recompiles less sources.
     */
    watch: {
      options: {
        atBegin: true
      },
      src: {
        files: 'app/**/*.js',
        tasks: ['jshint']
      },
      less: {
        files: 'app/less/**/*.less',
        tasks: ['less']
      }
    }

  };

  grunt.initConfig( grunt.util._.extend( taskConfig ) );

  /**
   * The default task is to build and compile.
   */
  grunt.registerTask( 'default', [ 'build' ] );

  /**
   * The `build` task gets your app ready to run for development and testing.
   */
  grunt.registerTask( 'build', [
    'jshint', 'less'
  ]);

  grunt.registerTask( 'dev', [ 'connect:server', 'watch' ] );


};
