module.exports = function(grunt) {
    grunt.initConfig({
        // copies fonts and bootstrap scss
        copy: {
            main: {
                files: [
                    {expand: true, src: ['bower_components/fontawesome/fonts/*'], dest: 'app/assets/fonts/', filter: 'isFile', flatten: true},
                    {expand: true, src: ['bower_components/bootstrap-sass-official/assets/fonts/bootstrap/*'], dest: 'app/assets/fonts/bootstrap', filter: 'isFile', flatten: true},

                    {expand: true, src: ['bower_components/modernizr/modernizr.js'], dest: 'app/assets/js/vendor/', filter: 'isFile', flatten: true},
                    {expand: true, src: ['bower_components/jquery/dist/jquery.min.js'], dest: 'app/assets/js/vendor/', filter: 'isFile', flatten: true}
                ],
            },
        },

        // compiles sass to minified css
        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'app/assets/css/app.min.css': 'assets/sass/app.scss'
                }
            }
        },

        // concatenates js files to single file
        concat: {   
            dist: {
                src: [
                    'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/affix.js',
                    'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/alert.js',
                    'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/button.js',
                    'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/carousel.js',
                    'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/collapse.js',
                    'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/dropdown.js',
                    'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/modal.js',
                    'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/tooltip.js',
                    'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/popover.js',
                    'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/scrollspy.js',
                    'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/tab.js',
                    'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/transition.js',
                    'assets/js/*.js'
                ],
                dest: 'app/assets/js/app.js'
            }
        },

        // creates minified js
        uglify: {
            dist: {
                files: {
                    'app/assets/js/app.min.js': 'app/assets/js/app.js'
                }
            }
        },

        // watches changes and compiles automatically
        watch: {
            sass: {
                files: ['assets/sass/*.scss'],
                tasks: ['sass:dist']
            },
            concat: {
                files: ['assets/js/*.js'],
                tasks: ['concat:dist', 'uglify:dist']
            }
        },

        sakugawa: {
            pure: {
                options: {
                    maxSelectors: 4000,
                    mediaQueries: 'separate',
                    suffix: '_'
                },
                src: ['app/assets/css/app.min.css']
            }
        },

    });
 
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-sakugawa');
 
    grunt.registerTask('serve', ['connect']);
    grunt.registerTask('js', ['concat', 'uglify']);
    grunt.registerTask('init', ['copy', 'sass', 'concat', 'uglify']);
    grunt.registerTask('update', ['copy', 'sass', 'concat', 'uglify']);
    grunt.registerTask('default', ['init']);
};