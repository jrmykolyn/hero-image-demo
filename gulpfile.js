const gulp = require( 'gulp' );
const PathMap = require( 'sfco-path-map' );
const pug = require( 'gulp-pug' );
const sass = require( 'gulp-sass' );

const PATHS = new PathMap( {
	src: './src',
	dest: './docs',
	imagesSrc: '{{src}}/img',
	imagesDest: '{{dest}}/img',
	stylesSrc: '{{src}}/styles',
	stylesDest: '{{dest}}/css',
	viewsSrc: '{{src}}/views',
	viewsDest: '{{dest}}',
} );

gulp.task( 'default', [ 'styles', 'views' ] );

gulp.task( 'images', () => {
	return gulp.src( `${PATHS.imagesSrc}/**/*` )
		.pipe( gulp.dest( PATHS.imagesDest ) );
} );

gulp.task( 'styles', () => {
	return gulp.src( `${PATHS.stylesSrc}/styles.scss` )
		.pipe( sass( {
			outputStyle: 'expanded',
		} ) )
		.pipe( gulp.dest( PATHS.stylesDest ) );
} );

gulp.task( 'views', () => {
	return gulp.src( `${PATHS.viewsSrc}/*.pug` )
		.pipe( pug() )
		.pipe( gulp.dest( `${PATHS.viewsDest}/` ) ); // NOTE: Omitting the trailing slash results in `pug` creating a duplicate `dist/` dir.
} );

gulp.task( 'watch', [ 'default' ], () => {
	gulp.watch( `${PATHS.stylesSrc}/**/*.scss`, [ 'styles' ] );
	gulp.watch( `${PATHS.viewsSrc}/**/*.pug`, [ 'views' ] );
} );
