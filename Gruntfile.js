module.exports = function(grunt) {

    var codepoints = grunt.file.readJSON("icons/src/codepoints.json");

    // JSON can only store code points in string format,
    // but grunt-webfont requires the integer value
    // so go through and convert them
    Object.keys(codepoints).forEach(function (key) {
        codepoints[key] = codepoints[key].charCodeAt(0);
    });

    grunt.registerMultiTask('base64', 'Base64 encode files.', function() {
        var options = this.options({});
        this.files.forEach(function(f) {
            var buffers = f.src.map(function(filepath) {
                return grunt.file.read(filepath, {
                    encoding: null
                });
            }),
            output = Buffer.concat(buffers);
            grunt.file.write(f.dest, '$ddg-serp-icons-woff-base64: "data:application/x-font-woff;charset=utf-8;base64,' + output.toString('base64') + '"');
            grunt.log.writeln('Base64 encoded "' + f.dest + '".');
        });
    });

    grunt.initConfig({
        base64: {
            target: {
                files: {
                   'icons/_base64-icons.scss' : 'icons/font/ddg-serp-icons.woff'
                }
            }
        },
        webfont: {
            icons: {
                src: "icons/src/svgs/*.svg",
                options: {
                    dest: "icons/font/",
                    destCss: "build",
                    fontFilename: "ddg-serp-icons",
                    types: "eot,woff,ttf,svg",
                    codepoints: codepoints,
                    customOutputs: [{
                        template: "icons/src/templates/_icons.scss",
                        dest: "mixins/_icons.scss"
                    },{
                        template: "icons/src/templates/_ddgsi.scss",
                        dest: "icons/_ddgsi.scss"
                    }]
                }
            }
        }
    });

    grunt.task.registerTask('default', ['webfont', 'base64']);
    grunt.loadNpmTasks('grunt-webfont');
}
