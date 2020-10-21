/* eslint-disable no-bitwise */

// key - bg color
// value - foreground color
const colorsMap = {
  '#76CA61': '#fff',
  '#24565A': '#fff',
  '#FDD835': '#000',
  '#50B0BA': '#fff',
  '#FF5858': '#fff',
  '#B0753F': '#fff',
  '#25CDEB': '#000',
  '#387EED': '#fff',
  '#ED3DC6': '#fff',
  '#512DA8': '#fff',
};

function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i += 1) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  return hash;
}

function intToRGB(i) {
  const c = (i & 0x00ffffff).toString(16).toUpperCase();

  return '00000'.substring(0, 6 - c.length) + c;
}

function stringToColor(str = '', fromMap = true) {
  const hashedHexNumber = intToRGB(hashCode(str));
  if (!fromMap) {
    return `#${hashedHexNumber}`.toLowerCase();
  }
  const hashedDecNumber = parseInt(hashedHexNumber, 16);

  const colorsKeysDec = Object.keys(colorsMap).map((key) =>
    // eslint-disable-next-line
    parseInt(key.replace('#', ''), 16),
  ); // eslint-disable-line
  const closestColor = colorsKeysDec
    // eslint-disable-next-line
    .reduce((prev, curr) =>
      // eslint-disable-next-line
      Math.abs(curr - hashedDecNumber) < Math.abs(prev - hashedDecNumber) ? curr : prev,
    ) // eslint-disable-line
    .toString(16);

  const resultPair = [`#${closestColor}`, colorsMap[`#${closestColor.toUpperCase()}`]];
  return resultPair;
}

export { stringToColor };
