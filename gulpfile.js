const { series, src, dest, watch, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const imagemin = require('gulp-imagemin');
const notify = require('gulp-notify');
const webp = require('gulp-webp');
const concat = require('gulp-concat');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');

// funcion compilando SASS
const paths = {
        imagenes: 'src/img/**/*',
        scss: 'src/scss/**/*.scss',
        js: 'src/js/**/*.js'

}


function css(  ) {
        return src( paths.scss)
                .pipe( sourcemaps.init() )
                .pipe( sass({
                outputStyle: 'expanded'
                }) )
                .pipe( postcss([autoprefixer(), cssnano()]) )
                .pipe( sourcemaps.write('.') )
                .pipe( dest('./build/css') )
}

function minificarcss () {
        return src(paths.scss)
                .pipe( sass({
                outputStyle: 'compressed'
                }) )
                .pipe( dest('./build/css') ) 
}
function javascript (){
        return src (paths.js)
        .pipe( concat('bundle.js'))
        .pipe ( dest('build/js'))
}
function imagenes () {
        return src(paths.imagenes)
        .pipe( imagemin () )
        .pipe( dest( './build/img' ))
        .pipe( notify({ message: 'Imagen Minificada'}) );
}
function versionWebp () {
        return src(paths.imagenes)
        .pipe( webp() )
        .pipe( dest('./build/img'))
        .pipe( notify({ message: 'Version webp'}) );
}

function watchArchivos() {
        watch( paths.scss, css );
        watch( paths.js, javascript);
}
exports.css = css;
exports.minificarcss = minificarcss;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;

exports.watchArchivos = watchArchivos;

exports.default = series( css, javascript, imagenes, versionWebp, watchArchivos );