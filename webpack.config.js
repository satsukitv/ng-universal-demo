const ngtools = require('@ngtools/webpack');
const path = require('path');

// workaround https://github.com/angular/angular-cli/issues/5329
var aotPlugin = new ngtools.AotPlugin({
    tsConfigPath: "./tsconfig.json",
    entryModule: path.resolve(__dirname, "./src/app#AppModule"),
});
aotPlugin._compilerHost._resolve = function(path_to_resolve) {
    path_1 = require("path");
    path_to_resolve = aotPlugin._compilerHost._normalizePath(path_to_resolve);
    if (path_to_resolve[0] == '.') {
        return aotPlugin._compilerHost._normalizePath(path_1.join(aotPlugin._compilerHost.getCurrentDirectory(), path_to_resolve));
    }
    else if (path_to_resolve[0] == '/' || path_to_resolve.match(/^\w:\//)) {
        return path_to_resolve;
    }
    else {
        return aotPlugin._compilerHost._normalizePath(path_1.join(aotPlugin._compilerHost._basePath, path_to_resolve));
    }
};

module.exports = {
	entry: {
		main: './src/main.server.ts'
	},
	resolve: {
      extensions: ['.ts', '.js']
    },
	target: 'node',
	output: {
		path: path.join(__dirname, 'dist'),
		filename: '[name].js'
	},
	plugins: [
		aotPlugin
	],
	module: {
		rules: [
			{
              test: /\.ts$/,
              loader: '@ngtools/webpack',
            }
		]
	}
}
