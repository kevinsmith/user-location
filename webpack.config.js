/* eslint-disable */
import webpack from "webpack";
import _ from "lodash";
import pkg from "./package.json";

_.mixin({ 'pascalCase': _.flow(_.camelCase, _.upperFirst) });

var banner = `${_.pascalCase(pkg.name)} v${pkg.version}
${pkg.description}

${pkg.homepage}

Licensed under ${pkg.license}

Copyright 2016 ${pkg.author.name} <${pkg.author.email}>

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
`;

module.exports = {
  output: {
    library: _.pascalCase(pkg.name),
    libraryTarget: "umd",
    filename: `${_.pascalCase(pkg.name)}.js`
  },
  devtool: "#inline-source-map",
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel",
        query: {
          compact: false
        }
      }
    ]
  },
   plugins: [
      new webpack.BannerPlugin(banner)
   ]
};
