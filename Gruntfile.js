module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
     connect: {
       server: {
         options: {
           keepalive:true,
           port: 9001,
           base: 'www-root'
         }
       },
       }//,
      // concat: {
      //   mk1: {
      //     src: [
      //       'src/css/*.css',
      //     ],
      //     dest: 'www-root/css/mk1/design.css'
      //   }
      // }
  });
grunt.loadNpmTasks('grunt-contrib-connect');
//grunt.loadNpmTasks('grunt-contrib-concat');
//grunt.loadNpmTasks('grunt-contrib-watch');
};
