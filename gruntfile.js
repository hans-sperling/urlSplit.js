module.exports = function(grunt) {

    var banner = '/*! <%= pkg.name %> - <%= pkg.description %> - Version: <%= pkg.version %> */\n';
    // Configuration.
    grunt.initConfig({
        pkg : grunt.file.readJSON('package.json'),
        uglify : {
            options : {
                banner: banner
            },
            build : {
                src  : 'src/<%= pkg.name %>.js',
                dest : 'dist/<%= pkg.name %>_v<%= pkg.version %>.min.js'
            }
        },
        concat : {
            options: {
                banner: banner
            },
            dist: {
                src: 'src/<%= pkg.name %>.js',
                dest: 'dist/<%= pkg.name %>_v<%= pkg.version %>.js'
            }
        }
    });

    // Load plugins
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');

    // Register tasks
    grunt.registerTask('default', ['uglify', 'concat']);
};
