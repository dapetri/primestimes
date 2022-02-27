const basePath = process.cwd();
const {
    fonts,
} = require(`${basePath}/src/config.js`)
const {
    createDna,
} = require(`${basePath}/src/main.js`)
let x=fonts.filter((o) => o.name === 'pix')[0].layersOrder
console.log(createDna(x));