// const exec = require('exec-sh');
const fs = require('fs');
const exec = require('exec-sh');
const { rollup } = require('rollup');
const { default: babel } = require('@rollup/plugin-babel');
const replace = require('@rollup/plugin-replace');
const Terser = require('terser');

const autoprefixer = require('./autoprefixer.js');
const cleanCSS = require('./clean-css.js');
const scss = require('./scss.js');
const banner = require('./banner');

const UMD_EXPORT = `
if (window.customElements && !window.customElements.get(COMPONENT_TAG)) {
  window.customElements.define(COMPONENT_TAG, CodersRankSkillsChart);
}
`;

const ESM_EXPORT = `
export default CodersRankSkillsChart;
`;

const CJS_EXPORT = `
module.exports = CodersRankSkillsChart;
`;

const buildModule = async (cssContent, format) => {
  const env = process.env.NODE_ENV || 'development';
  const outputDir = env === 'development' ? 'dev' : 'package';

  await exec.promise(`rm -rf ${outputDir}/${format}/*.js`);
  await exec.promise(`rm -rf ${outputDir}/${format}/shared/*.js`);
  await exec.promise(`MODULES=${format} npx babel src --out-dir ${outputDir}/${format}`);

  const fileContent = fs
    .readFileSync(`./${outputDir}/${format}/codersrank-skills-chart.js`, 'utf8')
    .replace('$_STYLES_$', cssContent)
    .replace('// EXPORT', format === 'esm' ? ESM_EXPORT : CJS_EXPORT);
  fs.writeFileSync(`./${outputDir}/${format}/codersrank-skills-chart.js`, fileContent);
};

const buildUMD = async (cssContent) => {
  const env = process.env.NODE_ENV || 'development';
  const filename = 'codersrank-skills-chart';
  const outputDir = env === 'development' ? 'dev' : 'package';

  await exec.promise(`rm -rf ${outputDir}/*.js`);
  await exec.promise(`rm -rf ${outputDir}/*.map`);

  const bundle = await rollup({
    input: './src/codersrank-skills-chart.js',
    plugins: [
      replace({
        delimiters: ['', ''],
        $_STYLES_$: cssContent,
        '// EXPORT': UMD_EXPORT,
      }),
      babel({ babelHelpers: 'bundled' }),
    ],
  });
  const bundleResult = await bundle.write({
    format: 'umd',
    name: 'CodersRankAcitivity',
    strict: true,
    sourcemap: true,
    sourcemapFile: `./${outputDir}/${filename}.js.map`,
    banner,
    file: `./${outputDir}/${filename}.js`,
  });

  if (env !== 'production') return;
  const result = bundleResult.output[0];
  const minified = await Terser.minify(result.code, {
    sourceMap: {
      content: env === 'development' ? result.map : undefined,
      filename: env === 'development' ? undefined : `${filename}.min.js`,
      url: `${filename}.min.js.map`,
    },
    output: {
      preamble: banner,
    },
  });

  fs.writeFileSync(`./${outputDir}/${filename}.min.js`, minified.code);
  fs.writeFileSync(`./${outputDir}/${filename}.min.js.map`, minified.map);
};

const build = async () => {
  let cssContent = fs.readFileSync('./src/codersrank-skills-chart.scss', 'utf-8');
  cssContent = await scss(cssContent);
  cssContent = await autoprefixer(cssContent);
  cssContent = await cleanCSS(cssContent);

  await buildUMD(cssContent);
  await buildModule(cssContent, 'esm');
  await buildModule(cssContent, 'cjs');
};

module.exports = build;
