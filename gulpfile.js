var current_env = process.env.NODE_ENV ? process.env.NODE_ENV : 'dev';

var path = require('path');
var fs = require("fs");

console.log('current_env is : ', current_env);

var gulp = require('gulp');
var gulp_replace = require('gulp-replace');
var gulp_util = require("gulp-util");
var gulp_hash = require('gulp-hash-filename');
var gulp_runSequence = require('run-sequence');
// var gulp_rename = require('gulp-rename');
// var gulp_uglify = require('gulp-uglify');
// var gulp_clean_css = require('gulp-clean-css');
// var pump = require('pump');


gulp.task('replace-url', function () {
    var result = fs.readdirSync('./build');
    var map = {};
    result.forEach(filename => {
        filename.match(/index.*\.js$/) && (map['js'] = filename);
        filename.match(/bundle.*hashed\.css$/) && (map['css'] = filename);
    })
    if (current_env == 'dev' || current_env == 'test') {
        return gulp.src('./views/main.pug')
            .pipe(gulp_replace('{{{__JS_BUNDLE__}}}', '/build/' + map['js']))
            .pipe(gulp_replace('{{{__CSS_BUNDLE__}}}', '/build/' + map['css']))
            .pipe(gulp.dest('./views'))
    }
    var pwd = __dirname + '/public/';
    var cdn_url = '';
    var bucket_name = 'static';
    function curl_upload(file_path, bucket_name, remote_path) {
        var re = exec('curl  -F file=@' + file_path + ' -F bucket_name=' + bucket_name + ' -F remote_path=' + remote_path + '  /api/v2/upload').stdout;
        return re;
    }
    function curl_delete(remote_path) { /* /test/dasfgfea.css */
        return exec('curl  -X DELETE /api/v2/delete?fid=' + remote_path).stdout;
    }

    var file_arr = [
        pwd + map['webpack'],
        pwd + map['require'],
        pwd + map['css']
    ]

    var cdn_prefix = '/' + (current_env ? current_env : 'production') + '/'
    file_arr.map(file_path => curl_upload(file_path, bucket_name, cdn_prefix + file_path.replace(pwd, '')));
    gulp.src('./views/_main.jade')
        .pipe(gulp_replace('{{{__WEBPACK_BUNDLE__}}}', cdn_url + cdn_prefix + file_arr[0].replace(pwd, '')))
        .pipe(gulp_replace('{{{__REQUIREJS_BUNDLE__}}}', cdn_url + cdn_prefix + file_arr[1].replace(pwd, '')))
        .pipe(gulp_replace('{{{__CSS_BUNDLE__}}}', cdn_url + cdn_prefix + file_arr[2].replace(pwd, '')))
        .pipe(gulp_rename('main.jade'))
        .pipe(gulp.dest('./views'))
})

gulp.task('compress', function (cb) {
    pump(
        [
            gulp.src('./public/*.js'),
            gulp_uglify(),
            gulp.dest('./public')
        ],
        cb
    )
})

gulp.task('mini-css', function (cb) {
    return gulp.src('./public/*.css')
        .pipe(gulp_clean_css({ compatibility: 'ie9' }))
        .pipe(gulp.dest('./public'))
})

gulp.task('hash', function () {
    //  "{name}-{hash}{ext}"
    return gulp.src(['./public/*.js', './public/*.css'])
        .pipe(gulp_hash({
            "format": "{name}.{hash}.{size}.hashed{ext}"
        }))
        .pipe(gulp.dest('./public'));
})

require('shelljs/global');
var _ = require('underscore');
var Mustache = require('mustache');
var nconf = require('nconf');

//load deploy conf
nconf.file({
    file: 'conf/deploy.conf.json'
});
//extend deploy conf
var conf = _.extend({}, nconf.get('_common'), nconf.get(current_env));

gulp.task('build', function (cb) {
    exec([
        'mkdir -p ' + conf.nginx_conf_dir,
        'mkdir -p ' + conf.nginx_link_dir,
        'mkdir -p ' + conf.nginx_log_dir,
        'mkdir -p ' + conf.log_path,
        'npm install'
    ].join(' && '))
    //build nginx conf
    var data = {
        domain: conf.domain ? conf.domain : 'vue.' + conf.name + '.com',
        name: conf.name,
        server_list: [],
        deploy_dir: conf.deploy_dir,
        log_dir: conf.nginx_log_dir,
        res_deploy_dir: '/opt/web/vue-koa-scaffold/',
        upstream_name: conf.upstream_name
    };

    for (var i = 0; i < conf.n_proc; i++) {
        data.server_list.push({
            host: "127.0.0.1",
            port: conf.port + i
        });
    }
    var nginx_conf = Mustache.render(fs.readFileSync('conf/vue-koa-scaffold.conf.mustache', { encoding: 'utf-8' }), data);
    //写入配置
    fs.writeFileSync('conf/vue-koa-scaffold.conf', nginx_conf, { encoding: 'utf-8' });

    //build forever conf
    var forever_default = JSON.parse(fs.readFileSync('conf/forever.config.json', { encoding: 'utf-8' }));
    var list = [];
    for (var i = 0; i < conf.n_proc; i++) {
        var port = conf.port + i;
        list.push(_.extend({}, forever_default, {
            id: 'vue-koa-scaffold-' + port,
            sourceDir: conf.deploy_dir,
            args: ["--port", port]
        }));
    }
    //写入配置
    fs.writeFileSync('conf/forever.json', JSON.stringify(list), { encoding: 'utf-8' });

    //remove old conf
    exec(['cd ' + conf.nginx_conf_dir, 'rm -f vue-koa-scaffold.conf'].join(' && '));
    exec(['cd ' + conf.nginx_link_dir, 'rm -f vue-koa-scaffold.conf'].join(' && '));
    //link nginx conf
    exec(['cp ' + conf.deploy_dir + '/conf/vue-koa-scaffold.conf ' + '/etc/nginx/conf.d/default' + '.conf'].join(' && '));
    exec(['cp ' + conf.deploy_dir + '/conf/vue-koa-scaffold.conf ' + conf.nginx_conf_dir + '/vue-koa-scaffold' + '.conf'].join(' && '));
    exec(['cd ' + conf.nginx_link_dir, 'ln -s ' + conf.nginx_conf_dir + '/vue-koa-scaffold' + '.conf vue-koa-scaffold.conf'].join(' && '));

    cd(conf.deploy_dir);
    exec('webpack --config ./webpack/dll.js && webpack --config ./webpack/' + current_env + '.js');

    cb();
});

gulp.task('start:test', function () {
    //start new server with new ports
    var opt = ['-l ' + conf.log_path + '/forever.log',
    '-o ' + conf.log_path + '/vue-koa-scaffold.console.log',
    '-e ' + conf.log_path + '/vue-koa-scaffold.error.log'
    ].join(' ');

    exec([
        conf.export,
        'cd ' + conf.deploy_dir,
        'NODE_ENV=' + current_env + ' forever --minUptime=5000ms ' + opt + ' start conf/forever.json'
    ].join(' && '));

})