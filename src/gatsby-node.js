const path = require("path");
const regexEscape = require("regex-escape");
const slash = require("slash");

exports.onCreateWebpackConfig = ({ actions, loaders }, { modules = [] }) => {
  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: modulePath =>
            /node_modules/.test(modulePath) &&
            // whitelist specific es6 module
            !new RegExp(
              `node_modules\/(${modules.map(regexEscape).join("|")})\/`
            ).test(slash(modulePath)),
          use: loaders.js()
        }
      ]
    }
  });
};
