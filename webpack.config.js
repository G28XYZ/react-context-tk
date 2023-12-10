const path = require('path');

module.exports = (env) => {
	function get(it, val) {
		if (env === undefined) {
			return val;
		} else if (env[it] === undefined) {
			return val;
		} else {
			return env[it];
		}
	}

	const environment = get('environment', 'development');

	const isDev = environment === 'development';

	return {
		mode: isDev ? 'development' : 'production',
		entry: './src/index.ts',
		resolve: {
			extensions: ['.tsx', '.ts', '.js', '.jsx'],
		},
		output: {
			path: path.resolve('lib'),
			filename: 'index.js',
			libraryTarget: 'umd',
		},
		externals: ['react', 'react-dom', 'lodash'],
		optimization: {
			minimize: true,
		},
		module: {
			rules: [
				{
					test: /.(js|jsx)$/,
					exclude: /node_modules/,
					use: [
						{
							loader: 'babel-loader',
							options: {
								presets: ['@babel/preset-env', '@babel/preset-react'],
							},
						},
					],
				},
				{
					test: /\.tsx?$/,
					exclude: /node_modules/,
					use: 'ts-loader',
				},
			],
		},
	};
};
