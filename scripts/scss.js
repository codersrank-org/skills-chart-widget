const sass = require('node-sass');

module.exports = (content) => sass.renderSync({ data: content }).css;
