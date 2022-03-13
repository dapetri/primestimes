const { formatDigit } = require("./config");
const fs = require("fs");

const basePath = process.cwd();
let pathPencil = basePath + "/layersPencils/0/la/block.png";
let pathImage = basePath + "/layersDigits/0/la/block/rainbow.png";
const { createCanvas, loadImage } = require(`${basePath}/node_modules/canvas`);

const canvas = createCanvas(formatDigit.width, formatDigit.height);
const ctx = canvas.getContext("2d");

const main = () => {
  cutPencil(pathPencil, pathImage);
};

const cutPencil = async (_pathPencil, _pathImage) => {
  ctx.clearRect(0, 0, formatDigit.width, formatDigit.height);

  let image = await loadImage(_pathImage);
  let pencil = await loadImage(_pathPencil);

  ctx.drawImage(pencil, 0, 0, formatDigit.width, formatDigit.height);

  ctx.globalCompositeOperation = "source-in";
  ctx.drawImage(image, 0, 0, formatDigit.width, formatDigit.height);

  //   ctx.restore();

  saveImage(111);
};
const buildDir = `${basePath}/build`;
const saveImage = (_editionCount) => {
  fs.writeFileSync(
    `${buildDir}/images/${_editionCount}.png`,
    canvas.toBuffer("image/png")
  );
};

// main();
// let i = fs.readFileSync(pathPencil, "utf-8")
// console.log(i);
let x = "abcr/asd/asdasd/asd"
console.log(x.split("/").slice(-3,-1).join("/"));
