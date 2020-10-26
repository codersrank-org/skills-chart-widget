const languageColors = {
  '1C Enterprise': '#814CCC',
  ABAP: '#E8274B',
  ActionScript: '#882B0F',
  Ada: '#02f88c',
  Agda: '#315665',
  'AGS Script': '#B9D9FF',
  Alloy: '#64C800',
  AMPL: '#E6EFBB',
  AngelScript: '#C7D7DC',
  ANTLR: '#9DC3FF',
  'API Blueprint': '#2ACCA8',
  APL: '#5A8164',
  AppleScript: '#101F1F',
  Arc: '#aa2afe',
  ASP: '#6a40fd',
  AspectJ: '#a957b0',
  Assembly: '#6E4C13',
  Asymptote: '#4a0c0c',
  ATS: '#1ac620',
  AutoHotkey: '#6594b9',
  AutoIt: '#1C3552',
  Ballerina: '#FF5000',
  Batchfile: '#C1F12E',
  BlitzMax: '#cd6400',
  Boo: '#d4bec1',
  Brainfuck: '#2F2530',
  C: '#555555',
  'C#': '#178600',
  'C++': '#f34b7d',
  Ceylon: '#dfa535',
  Chapel: '#8dc63f',
  Cirru: '#ccccff',
  Clarion: '#db901e',
  Clean: '#3F85AF',
  Click: '#E4E6F3',
  Clojure: '#db5855',
  CoffeeScript: '#244776',
  ColdFusion: '#ed2cd6',
  'Common Lisp': '#3fb68b',
  'Common Workflow Language': '#B5314C',
  'Component Pascal': '#B0CE4E',
  Crystal: '#000100',
  CSS: '#563d7c',
  Cuda: '#3A4E3A',
  D: '#ba595e',
  Dart: '#00B4AB',
  DataWeave: '#003a52',
  DM: '#447265',
  Dockerfile: '#384d54',
  Dogescript: '#cca760',
  Dylan: '#6c616e',
  E: '#ccce35',
  eC: '#913960',
  ECL: '#8a1267',
  Eiffel: '#946d57',
  Elixir: '#6e4a7e',
  Elm: '#60B5CC',
  'Emacs Lisp': '#c065db',
  EmberScript: '#FFF4F3',
  EQ: '#a78649',
  Erlang: '#B83998',
  'F#': '#b845fc',
  'F*': '#572e30',
  Factor: '#636746',
  Fancy: '#7b9db4',
  Fantom: '#14253c',
  FLUX: '#88ccff',
  Forth: '#341708',
  Fortran: '#4d41b1',
  FreeMarker: '#0050b2',
  Frege: '#00cafe',
  'Game Maker Language': '#71b417',
  GDScript: '#355570',
  Genie: '#fb855d',
  Gherkin: '#5B2063',
  Glyph: '#c1ac7f',
  Gnuplot: '#f0a9f0',
  Go: '#00ADD8',
  Golo: '#88562A',
  Gosu: '#82937f',
  'Grammatical Framework': '#79aa7a',
  Groovy: '#e69f56',
  Hack: '#878787',
  Harbour: '#0e60e3',
  Haskell: '#5e5086',
  Haxe: '#df7900',
  HiveQL: '#dce200',
  HTML: '#e34c26',
  Hy: '#7790B2',
  IDL: '#a3522f',
  Idris: '#b30000',
  Io: '#a9188d',
  Ioke: '#078193',
  Isabelle: '#FEFE00',
  J: '#9EEDFF',
  Java: '#b07219',
  JavaScript: '#f1e05a',
  Jolie: '#843179',
  JSONiq: '#40d47e',
  Jsonnet: '#0064bd',
  Julia: '#a270ba',
  'Jupyter Notebook': '#DA5B0B',
  Kotlin: '#F18E33',
  KRL: '#28430A',
  Lasso: '#999999',
  Lex: '#DBCA00',
  LFE: '#4C3023',
  LiveScript: '#499886',
  LLVM: '#185619',
  LOLCODE: '#cc9900',
  LookML: '#652B81',
  LSL: '#3d9970',
  Lua: '#000080',
  Makefile: '#427819',
  Mask: '#f97732',
  MATLAB: '#e16737',
  Max: '#c4a79c',
  MAXScript: '#00a6a6',
  mcfunction: '#E22837',
  Mercury: '#ff2b2b',
  Meson: '#007800',
  Metal: '#8f14e9',
  Mirah: '#c7a938',
  'Modula-3': '#223388',
  MQL4: '#62A8D6',
  MQL5: '#4A76B8',
  MTML: '#b7e1f4',
  NCL: '#28431f',
  Nearley: '#990000',
  Nemerle: '#3d3c6e',
  nesC: '#94B0C7',
  NetLinx: '#0aa0ff',
  'NetLinx+ERB': '#747faa',
  NetLogo: '#ff6375',
  NewLisp: '#87AED7',
  Nextflow: '#3ac486',
  Nim: '#37775b',
  Nit: '#009917',
  Nix: '#7e7eff',
  Nu: '#c9df40',
  'Objective-C': '#438eff',
  'Objective-C++': '#6866fb',
  'Objective-J': '#ff0c5a',
  OCaml: '#3be133',
  Omgrofl: '#cabbff',
  ooc: '#b0b77e',
  Opal: '#f7ede0',
  Oxygene: '#cdd0e3',
  Oz: '#fab738',
  P4: '#7055b5',
  Pan: '#cc0000',
  Papyrus: '#6600cc',
  Parrot: '#f3ca0a',
  Pascal: '#E3F171',
  Pawn: '#dbb284',
  Pep8: '#C76F5B',
  Perl: '#0298c3',
  'Perl 6': '#0000fb',
  PHP: '#4F5D95',
  PigLatin: '#fcd7de',
  Pike: '#005390',
  PLSQL: '#dad8d8',
  PogoScript: '#d80074',
  PostScript: '#da291c',
  PowerBuilder: '#8f0f8d',
  PowerShell: '#012456',
  Processing: '#0096D8',
  Prolog: '#74283c',
  'Propeller Spin': '#7fa2a7',
  Puppet: '#302B6D',
  PureBasic: '#5a6986',
  PureScript: '#1D222D',
  Python: '#3572A5',
  q: '#0040cd',
  QML: '#44a51c',
  Quake: '#882233',
  R: '#198CE7',
  Racket: '#3c5caa',
  Ragel: '#9d5200',
  RAML: '#77d9fb',
  Rascal: '#fffaa0',
  Rebol: '#358a5b',
  Red: '#f50000',
  "Ren'Py": '#ff7f7f',
  Ring: '#2D54CB',
  Roff: '#ecdebe',
  Rouge: '#cc0088',
  Ruby: '#701516',
  RUNOFF: '#665a4e',
  Rust: '#dea584',
  SaltStack: '#646464',
  SAS: '#B34936',
  Scala: '#c22d40',
  Scheme: '#1e4aec',
  sed: '#64b970',
  Self: '#0579aa',
  Shell: '#89e051',
  Shen: '#120F14',
  Slash: '#007eff',
  Slice: '#003fa2',
  Smalltalk: '#596706',
  Solidity: '#AA6746',
  SourcePawn: '#5c7611',
  SQF: '#3F3F3F',
  Squirrel: '#800000',
  'SRecode Template': '#348a34',
  Stan: '#b2011d',
  'Standard ML': '#dc566d',
  SuperCollider: '#46390b',
  Swift: '#ffac45',
  SystemVerilog: '#DAE1C2',
  Tcl: '#e4cc98',
  Terra: '#00004c',
  TeX: '#3D6117',
  'TI Program': '#A0AA87',
  Turing: '#cf142b',
  TypeScript: '#2b7489',
  UnrealScript: '#a54c4d',
  Vala: '#fbe5cd',
  VCL: '#148AA8',
  Verilog: '#b2b7f8',
  VHDL: '#adb2cb',
  'Vim script': '#199f4b',
  'Visual Basic': '#945db7',
  Volt: '#1F1F1F',
  Vue: '#2c3e50',
  wdl: '#42f1f4',
  WebAssembly: '#04133b',
  wisp: '#7582D1',
  X10: '#4B6BEF',
  xBase: '#403a40',
  XC: '#99DA07',
  XQuery: '#5232e7',
  XSLT: '#EB8CEB',
  Yacc: '#4B6C4B',
  YARA: '#220000',
  YASnippet: '#32AB90',
  ZAP: '#0d665e',
  Zephir: '#118f9e',
  Zig: '#ec915c',
  ZIL: '#dc75e5',
  Other: '#bbb',
};

const fetchData = (username) => {
  return fetch(
    `https://grpcgateway.codersrank.io/candidate/${username}/GetScoreProgress`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    },
  )
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
};

const stringToColor = (str = '') => {
  function hashCode(string) {
    let hash = 0;
    for (let i = 0; i < string.length; i += 1) {
      // eslint-disable-next-line
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    return hash;
  }

  function intToRGB(i) {
    // eslint-disable-next-line
    const c = (i & 0x00ffffff).toString(16).toUpperCase();

    return '00000'.substring(0, 6 - c.length) + c;
  }

  const hashedHexNumber = intToRGB(hashCode(str));
  return `#${hashedHexNumber}`.toLowerCase();
};

const getColor = (language) => {
  return languageColors[language]
    ? languageColors[language]
    : stringToColor(language, false);
};

const getChartData = (data = [], displaySkills = []) => {
  const scoresData = [...data];
  scoresData.reverse();

  const languagesList = [];
  scoresData.forEach((score) => {
    score.languages.forEach((languageData) => {
      if (displaySkills.length && !displaySkills.includes(languageData.language)) return;
      if (!languagesList.includes(languageData.language)) {
        languagesList.push(languageData.language);
      }
    });
  });

  const labels = scoresData.map((score) => score.date);
  const datasets = languagesList.map((language) => {
    const values = [];
    scoresData.forEach((score) => {
      const languageData = score.languages.filter(
        (langData) => langData.language === language,
      )[0];
      values.push(languageData ? languageData.score : 0);
    });
    return {
      label: language,
      color: getColor(language),
      values,
    };
  });

  datasets.sort((a, b) => {
    if (b.label === 'Other') return -1;
    return a.label > b.label ? 1 : -1;
  });

  return {
    labels,
    datasets,
  };
};

const formatLabel = (label) => {
  if (!label) return '';
  const formatter = Intl.DateTimeFormat('en', { year: 'numeric', month: 'short' });
  return formatter.format(new Date(label));
};

const renderChart = ({
  data,
  svgWidth: width,
  svgHeight: height,
  legend: showLegend,
  labels: showLabels,
} = {}) => {
  const { datasets, labels } = data;

  const getSummValues = () => {
    const summValues = [];
    datasets.forEach(({ values }) => {
      values.forEach((value, valueIndex) => {
        if (!summValues[valueIndex]) summValues[valueIndex] = 0;
        summValues[valueIndex] += value;
      });
    });
    return summValues;
  };

  const getPolygons = () => {
    const summValues = getSummValues();
    const polygons = [];
    if (!datasets.length) {
      return polygons;
    }
    const lastValues = datasets[0].values.map(() => 0);

    const maxValue = Math.max(...summValues);
    datasets.forEach(({ label, values, color }) => {
      const points = values.map((originalValue, valueIndex) => {
        lastValues[valueIndex] += originalValue;
        const value = lastValues[valueIndex];
        const x = (valueIndex / (values.length - 1)) * width;
        const y = height - (value / maxValue) * height;
        return `${x} ${y}`;
      });
      points.push(`${width} ${height} 0 ${height}`);

      polygons.push({
        label,
        points: points.join(' '),
        color,
      });
    });
    return polygons.reverse();
  };

  const getVisibleLabels = () => {
    const maxLabels = 8;
    if (!maxLabels || labels.length <= maxLabels) return labels;
    const skipStep = Math.ceil(labels.length / maxLabels);
    const filtered = labels.filter((label, index) => index % skipStep === 0);
    return filtered;
  };

  const polygons = getPolygons();
  const visibleLabels = getVisibleLabels();

  const labelsMargin = showLabels ? 10 : 0;

  const legendMargin = showLegend ? 40 : 0;
  const legendsPerLine = 8;
  const textLines = Array.from({ length: Math.ceil(datasets.length / legendsPerLine) });
  const textLineHeight = showLegend ? 30 : 0;

  // prettier-ignore
  return /* html */`
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 ${width} ${height + labelsMargin + legendMargin + textLines.length * textLineHeight}"
    >
    <style>
      text {
        font-size: 12px;
        font-family: Open Sans, Helvetica Neue, Helvetica, Arial, sans-serif;
      }
      #labels text {
        dominant-baseline: hanging;
        font-size: 10px;
        fill: rgba(0,0,0,0.5);
      }
      #legend {
        font-weight: 600;
      }
      #legend tspan {
        font-size: 15px;
      }
    </style>
      ${polygons.map((polygon) => /* html */`
      <polygon
        fill="${polygon.color}"
        fillRule="evenodd"
        points="${polygon.points}"
      />
      `).join('')}

      ${showLabels ? /* html */`
        <g id="labels">
        ${labels.map((label, index) => /* html */`
          ${visibleLabels.includes(label) ? /* html */`
          <text x="${index * width / labels.length}" y="${height + labelsMargin}">
            ${formatLabel(label)}
          </text>
          ` : ''}
        `).join('')}
        </g>
      ` : ''}

      ${showLegend ? textLines.map((line, index) => /* html */`
        <text text-anchor="middle" y="${height + labelsMargin + legendMargin + index * textLineHeight}" x="${width / 2}" id="legend">
          ${datasets.filter((d, i) => i >= index * legendsPerLine && i < (index + 1) * legendsPerLine).map((dataset) => /* html */`
          <tspan xml:space="preserve" fill="${dataset.color}">   ◉</tspan> ${dataset.label}
          `).join('')}
        </text>
      `).join('') : ''}

    </svg>
  `.trim();
};

async function handleRequest(request) {
  if (request.url.indexOf('username') < 0) {
    return new Response('<svg xmlns="http://www.w3.org/2000/svg"></svg>', {
      headers: {
        'content-type': 'image/svg+xml;charset=UTF-8',
      },
    });
  }
  const username = request.url.split('username=')[1].split('&')[0];
  let skills = [];
  if (request.url.indexOf('skills=') >= 0) {
    skills = request.url
      .split('skills=')[1]
      .split('&')[0]
      .split(',')
      .map((s) => s.trim())
      .filter((s) => !!s);
  }
  let width = 640;
  let height = 320;
  if (request.url.indexOf('width=') >= 0) {
    width = parseInt(request.url.split('width=')[1].split('&')[0] || 640, 10) || 640;
  }
  if (request.url.indexOf('height=') >= 0) {
    height = parseInt(request.url.split('height=')[1].split('&')[0] || 320, 10) || 320;
  }
  const data = await fetchData(username);
  const chartData = getChartData(data.scores, skills);
  const svg = renderChart({
    data: chartData,
    labels: true,
    legend: true,
    svgWidth: width,
    svgHeight: height,
  });
  return new Response(svg, {
    headers: {
      'content-type': 'image/svg+xml;charset=UTF-8',
    },
  });
}
// eslint-disable-next-line
addEventListener('fetch', (event) => {
  return event.respondWith(handleRequest(event.request));
});
