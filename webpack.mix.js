require('laravel-mix-string-replace');

const mix = require('laravel-mix'),
	theme_info = `/*
  * Theme Name: test
  * Version: 1.0.0
  * Requires at least: 4.7
  * Requires PHP: 7.4
 */`,
	dev = 'assets/src',
	prod = 'assets/dist',
	host = 'file:///D:/resume/Roman.Matviy.CV/index.full.html',
	disableNotifications = false, // disable Notifications after build
	del = require('del'),
	imagemin = false, // 1,2, or false
	jpgToJpg = false, //this work if choise imagemin 2
	jpgToWebp = false; //this work if choise imagemin 2

//HTML min
const MinifyHtmlWebpackPlugin = require('minify-html-webpack-plugin');
mix.webpackConfig({
	plugins: [
		new MinifyHtmlWebpackPlugin({
			afterBuild: true,
			src: './' + dev,
			dest: './' + prod,
			ignoreFileNameRegex: /\.(gitignore|php|scss|css|jpg|png|webp|gif|ico|js)$/,
			ignoreFileContentsRegex: /(<\?xml version)|(mail::message)/,
			rules: {
				collapseBooleanAttributes: false,
				collapseWhitespace: true,
				removeAttributeQuotes: false,
				removeComments: true,
				minifyJS: true,
			},
			searchAndReplace: [
				{
					search:
						'../' +
						prod +
						'/' /* The string, or regular expression, that will be replaced by the new value */,
					replace:
						'' /* The string to replace the search value with */,
				},
				{
					search: 'src="../' + prod + '/',
					replace: 'src="',
				},
				{
					search: '<script src="../' + prod + '/',
					replace: '<script src="',
				},
				{
					search:
						'bootstrap.css' /* The string, or regular expression, that will be replaced by the new value */,
					replace:
						'bootstrap.min.css' /* The string to replace the search value with */,
				},
				{
					search: 'jquery.instagram.js',
					replace: 'jquery.instagram.min.js',
				},
			],
		}),
	],
});

//image min
if (imagemin == 1) {
	const CopyWebpackPlugin = require('copy-webpack-plugin'),
		ImageminPlugin = require('imagemin-webpack-plugin').default,
		imageminMozjpeg = require('imagemin-mozjpeg');

	mix.webpackConfig({
		plugins: [
			new CopyWebpackPlugin({
				patterns: [
					{
						from: dev + '/assets/img',
						to: prod + '/assets/img',
					},
				],
			}),

			new ImageminPlugin({
				test: /\.(jpe?g|png|gif|svg)$/i,
				plugins: [
					imageminMozjpeg({
						quality: 75,
					}),
				],
			}),
		],
	});
} else if (imagemin == 2) {
	const compress_images = require('compress-images');
	// Combine compressing images [jpg] with two different algorithms, [jpegtran] and [mozjpeg];

	if (jpgToWebp) {
		//[jpg+gif+png+svg] ---to---> [jpg(webp)+gif(gifsicle)+png(webp)+svg(svgo)]
		compress_images(
			dev + '/assets/img/**/*.{jpg,JPG,jpeg,JPEG,gif,png,svg}',
			prod + '/assets/img/',
			{ compress_force: false, statistic: true, autoupdate: true },
			false,
			{ jpg: { engine: 'webp', command: false } },
			{ png: { engine: 'webp', command: false } },
			{ svg: { engine: 'svgo', command: false } },
			{
				gif: {
					engine: 'gifsicle',
					command: ['--colors', '64', '--use-col=web'],
				},
			},
			function() {
				//[png] ---to---> [png(pngquant)] WARNING!!! autoupdate  - recommended to turn this off, it's not needed here - autoupdate: false
				compress_images(
					dev + '/assets/img/**/*.png',
					prod + '/assets/img/',
					{
						compress_force: false,
						statistic: true,
						autoupdate: false,
					},
					false,
					{ jpg: { engine: false, command: false } },
					{
						png: {
							engine: 'pngquant',
							command: ['--quality=30-60', '-o'],
						},
					},
					{ svg: { engine: false, command: false } },
					{ gif: { engine: false, command: false } },
					function() {
						//[jpg(jpegtran)] ---to---> [jpg(mozjpeg)] WARNING!!! autoupdate  - recommended to turn this off, it's not needed here - autoupdate: false //this
					}
				);
			}
		);
	}

	if (jpgToJpg) {
		//[jpg(jpegtran)] ---to---> [jpg(mozjpeg)] WARNING!!! autoupdate  - recommended to turn this off, it's not needed here - autoupdate: false //this
		compress_images(
			dev + '/assets/img/**/*.{jpg,JPG,jpeg,JPEG}',
			prod + '/assets/img/',
			{ compress_force: false, statistic: true, autoupdate: false },
			false,
			{ jpg: { engine: 'mozjpeg', command: ['-quality', '75'] } },
			{ png: { engine: false, command: false } },
			{ svg: { engine: false, command: false } },
			{ gif: { engine: false, command: false } },
			function() {}
		);
	}
}

//const combineSelectors = require('postcss-combine-duplicated-selectors');
//const mqpacker = require("css-mqpacker");
//const sortCSSmq = require('sort-css-media-queries');

// mix.js(dev + '/assets/js/app.js', prod + '/assets/js/')
// 	.js(dev + '/assets/js/jquery.instagramLoad.js', prod + '/assets/js/')
mix.sass(dev + '/style.scss', prod + '')
	.sass(dev + '/timeline.scss', prod + '')
	.options({
		postCss: [
			require('postcss-normalize-timing-functions'), //npm i postcss-normalize-timing-functions
			require('postcss-minify-gradients'), //npm i postcss-minify-gradients
			require('postcss-merge-longhand'),
			require('postcss-discard-duplicates'),
			require('postcss-merge-rules'),
			require('postcss-merge-selectors'), //npm i postcss-merge-selectors
			require('autoprefixer'),
			require('css-mqpacker'),
			require('css-declaration-sorter'),
			require('postcss-ordered-values'),
			require('postcss-unique-selectors'),

			// require('postcss-minify-font-values'), //font:700 2.2rem/.9 Open Sans Condensed,sans-serif
			// //require('postcss-convert-values'), px to pt
			// //require('postcss-colormin'),
			// //require('postcss-combine-duplicated-selectors'),//npm i postcss-combine-duplicated-selectors
			// //require('postcss-sort-media-queries'),//npm i postcss-sort-media-queries

			require('postcss-combine-media-query'), //npm i postcss-combine-media-query
			require('postcss-move-media'),
			require('postcss-sort-media'), //npm i postcss-sort-media //work
			//require('sort-css-media-queries'), //npm i sort-css-media-queries //work

			// mqpacker({
			//   sort: sortCSSmq
			// })  //const mqpacker

			//require('postcss-extract-media-query'),
		],
		uglify: {
			comments: false,
		},
		browsers: ['last 40 version'],
		//purifyCss: true, // Remove unused CSS selectors.
		//outputStyle: 'compressed',
		processCssUrls: false,
		cssDeclarationSorter: true, //npm install css-declaration-sorter --save-dev
		plugins: {
			'postcss-sorting': {
				order: [
					'custom-properties',
					'dollar-variables',
					'declarations',
					'at-rules',
					'rules',
				],
				'properties-order': 'alphabetical',
				'unspecified-properties-position': 'bottom',
			},
			'css-mqpacker': { sort: true },
			mqpacker: {
				sort: true,
			},
			'postcss-extract-media-query': {
				extractAll: true,
				stats: false,
			},
		},
		cssNano: {
			discardComments: {
				removeAll: true,
			},
			//colormin: true,
			//convertValues: true,
			discardComments: true,
			discardDuplicates: {
				removeAll: true,
			},
			discardEmpty: true,
			uniqueSelectors: {
				removeAll: true,
			},
			reduceTransforms: true,
			orderedValues: true,
			mergeRules: true,
			'postcss-extract-media-query': {
				extractAll: true,
				stats: false,
			},
		},
	})
	.browserSync({
		proxy: host,
		files: [
			'./ ' + dev + '/**/*',
			'./' + dev + '/assets/**/*.*',
			'./' + dev + '/assets/src/**/*.scss',
			'./' + dev + '/assets/scss/**/*.scss',
			'./' + dev + '/**/*.+(html|php)',
			'./' + dev + '/views/**/*.+(html|twig)',
		],
	});

//copy
mix.copy(dev + '/**/**/*.+(html|php|css|js)', prod + '/').copy(
	dev + '/views/**/**/*.*',
	prod + '/views'
);
//.copy('dev/assets/js/index.js', 'prod/assets/js/index.js');
// mix.copyDirectory(fromDir, toDir);

// mix.scripts(
// 	[dev + '/assets/js/jquery.instagram.js'],
// 	prod + '/assets/js/jquery.instagram.min.js'
// ).then(() => {
// 	if (
// 		process.env.NODE_ENV.trim() === 'prod' ||
// 		process.env.NODE_ENV.trim() === 'production'
// 	) {
// 		del(prod + '/assets/js/jquery.instagram.js');
// 	}
// });

// mix.scripts(
// 	[dev + '/assets/js/jquery.instagramLoad.js'],
// 	prod + '/assets/js/jquery.instagramLoad.min.js'
// ).then(() => {
// 	if (
// 		process.env.NODE_ENV.trim() === 'prod' ||
// 		process.env.NODE_ENV.trim() === 'production'
// 	) {
// 		del(prod + '/assets/js/jquery.instagramLoad.js');
// 	}
// });

// mix.scripts(
// 	[
// 		// dev + '/assets/js/jquery.instagramFeed.js',
// 		dev + '/assets/js/app.js',
// 	],
// 	prod + '/assets/js/app.min.js'
// ).then(() => {
// 	if (
// 		process.env.NODE_ENV.trim() === 'prod' ||
// 		process.env.NODE_ENV.trim() === 'production'
// 	) {
// 		del(prod + '/assets/js/app.js');
// 	}
// });

if (
	process.env.NODE_ENV.trim() === 'prod' ||
	process.env.NODE_ENV.trim() === 'production'
) {
	mix.stringReplace({
		test: /\.js$/,
		test: /\.js$/,
		loader: 'string-replace-loader',
		options: {
			search: ' ',
			replace: '',
		},
	});

	// mix.combine([
	//   prod + '/assets/css/*.css',
	// ], 'all-files.css');

	//min files
	//mix.minify(prod + "/assets/js/**/*.js");

	mix.styles(
		[
			// other css stylesheets here...
			prod + '/style.css', // include temp css file
			//prod + '/assets/css/app.css', // include temp css file
		],
		prod + '/style.min.css'
	).then(() => {
		del(prod + '/style.css'); // deletes the temp file
	});

	mix.styles(
		[
			// other css stylesheets here...
			prod + '/timeline.css', // include temp css file
			//prod + '/assets/css/app.css', // include temp css file
		],
		prod + '/timeline.min.css'
	).then(() => {
		del(prod + '/timeline.css'); // deletes the temp file
	});

	// mix.combine(
	// 	[
	// 		dev + '/assets/scss/bootstrap.scss', // include temp css file
	// 	],
	// 	prod + '/assets/css/bootstrap.min.css'
	// ).then(() => {
	// 	del(prod + '/assets/css/bootstrap.css'); // deletes the temp file
	// });

	//HTML min
	mix.webpackConfig({
		plugins: [
			new MinifyHtmlWebpackPlugin({
				afterBuild: true,
				src: './' + prod,
				dest: './' + prod,
				ignoreFileNameRegex: /\.(gitignore|php|scss|css|jpg|png|webp|gif|ico|js)$/,
				ignoreFileContentsRegex: /(<\?xml version)|(mail::message)/,
				searchAndReplace: [
					{
						search:
							'style.css' /* The string, or regular expression, that will be replaced by the new value */,
						replace:
							'style.min.css' /* The string to replace the search value with */,
					},
					{
						search:
							'timeline.css' /* The string, or regular expression, that will be replaced by the new value */,
						replace:
							'timeline.min.css' /* The string to replace the search value with */,
					},
					{
						search:
							'bootstrap.css' /* The string, or regular expression, that will be replaced by the new value */,
						replace:
							'bootstrap.min.css' /* The string to replace the search value with */,
					},
					{
						search: 'app.js',
						replace: 'app.min.js',
					},
					{
						search: '.js',
						replace: '.min.js',
					},
					{
						search: 'jquery.instagram.js',
						replace: 'jquery.instagram.min.js',
					},
					{
						search: 'jquery.instagramLoad.js',
						replace: 'jquery.instagramLoad.min.js',
					},
					{
						search: '<script src="../' + prod + '/',
						replace: '<script src="',
					},
				],
			}),
		],
	});
} else {
	mix.sourceMaps(prod + '/style.css');
}

if (disableNotifications) {
	mix.disableNotifications(); //this line disable notification
}

// require('fullpage.js');
//   .sass("src/scss/normalize.scss", "dist/css", {
// outputStyle: 'compressed'
//   })
// .sass('src/scss/*.scss', 'dist/css');
//   .options({
//     postCss: [require('autoprefixer')],
//     outputStyle: "compressed",
//});

// mix.styles(
//   ["dist/css/normalize.css", "dist/css/app.css"],
//   "public/css/style.css"
// );
// mix.scripts(["dist/js/jquery.min.js", "dist/js/app.js"], "public/js/app.js");

// Full API
// mix.js(src, output);
// mix.react(src, output); <-- Identical to mix.js(), but registers React Babel compilation.
// mix.preact(src, output); <-- Identical to mix.js(), but registers Preact compilation.
// mix.coffee(src, output); <-- Identical to mix.js(), but registers CoffeeScript compilation.
// mix.ts(src, output); <-- TypeScript support. Requires tsconfig.json to exist in the same folder as webpack.mix.js
// mix.extract(vendorLibs);
// mix.sass(src, output);
// mix.postCss(src, output, [require('postcss-some-plugin')()]);
// mix.browserSync('my-site.test');
// mix.combine(files, destination);
// mix.babel(files, destination); <-- Identical to mix.combine(), but also includes Babel compilation.
// mix.copy(from, to);
// mix.copyDirectory(fromDir, toDir);
// mix.minify(file);
// mix.sourceMaps(); // Enable sourcemaps
// mix.version(); // Enable versioning.
// mix.disableNotifications();
// mix.setPublicPath('path/to/public');
// mix.setResourceRoot('prefix/for/resource/locators');
// mix.autoload({}); <-- Will be passed to Webpack's ProvidePlugin.
// mix.webpackConfig({}); <-- Override webpack.config.js, without editing the file directly.
// mix.babelConfig({}); <-- Merge extra Babel configuration (plugins, etc.) with Mix's default.
// mix.then(function () {}) <-- Will be triggered each time Webpack finishes building.
// mix.override(function (webpackConfig) {}) <-- Will be triggered once the webpack config object has been fully generated by Mix.
// mix.dump(); <-- Dump the generated webpack config object to the console.
// mix.extend(name, handler) <-- Extend Mix's API with your own components.
// mix.options({
//   extractVueStyles: false, // Extract .vue component styling to file, rather than inline.
//   globalVueStyles: file, // Variables file to be imported in every component.
//   processCssUrls: true, // Process/optimize relative stylesheet url()'s. Set to false, if you don't want them touched.
//   purifyCss: false, // Remove unused CSS selectors.
//   terser: {}, // Terser-specific options. https://github.com/webpack-contrib/terser-webpack-plugin#options
//   postCss: [] // Post-CSS options: https://github.com/postcss/postcss/blob/master/docs/plugins.md
// });

// Laravel Mix config
// Documentation: https://github.com/JeffreyWay/laravel-mix/tree/master/docs#readme

// const mix = require('laravel-mix');

// const source = 'source';
// const public = 'assets';

// mix.setPublicPath(public);

// // Full options: https://browsersync.io/docs/options/
// mix.browserSync({
//     proxy: 'add.ua',
//     files: [
//         `${public}/js/*.js`,
//         `${public}/css/*.css`,
//         'views/**/*.twig',
//         '**/*.php'
//     ],
//     ghostMode: false
// });

// if (mix.inProduction()) {
//     mix.version();
//     mix.options({
//         terser: {
//             terserOptions: {
//                 compress: {
//                     drop_console: true
//                 }
//             }
//         }
//     });
// }

// // mix.js(`${source}/scripts/app.js`, `${public}/js`).sourceMaps() //to enable sourcemaps
// mix.js(`${source}/scripts/app.js`, `${public}/js`)
//     .sass(`${source}/styles/app.scss`, `${public}/css`, {
//         outputStyle: mix.inProduction() ? 'compressed' : 'expanded'
//     })
//     .options({
//         processCssUrls: false
//     });

// mix.disableNotifications();
