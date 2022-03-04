const basePath = process.cwd();
const { NETWORK } = require(`${basePath}/constants/network.js`);
const fs = require("fs");
const sha1 = require(`${basePath}/node_modules/sha1`);
const { createCanvas, loadImage } = require(`${basePath}/node_modules/canvas`);
const {
  format,
  baseUri,
  description,
  background,
  uniqueDnaTorrance,
  layerConfigurations,
  rarityDelimiter,
  shuffleLayerConfigurations,
  debugLogs,
  extraMetadata,
  text,
  namePrefix,
  network,
  solanaMetadata,
  gif,
  fonts,
} = require(`${basePath}/src/config.js`);
const { formatDigit, digitPositions } = require("./config");
const {
  getElements,
  createDna,
  constructLayerToDna,
  loadLayerImg,
  isDnaUnique,
  drawElement,
  addMetadata,
  saveMetaDataSingleFile,
  filterDNAOptions,
} = require(`${basePath}/src/main.js`);
var metadataList = [];
var attributesList = [];
var dnaList = new Set();
const DNA_DELIMITER = "-";
const HashlipsGiffer = require(`${basePath}/modules/HashlipsGiffer.js`);

let hashlipsGiffer = null;

let primesCount = 12251;
let primes = require("@stdlib/datasets-primes-100k");

let primesList = primes().slice(0, primesCount);

// WORKFLOW: primes -> prime -> digit -> store -> background -> compose

primesList.map((prime) => {
  digits = [];
});

const createPrime = (prime) => {
  let amountDigits = digit.toString().length;
};
const canvas = createCanvas(format.width, format.height);
const ctx = canvas.getContext("2d");

const drawPrime = async (prime) => {
  let amountDigits = prime.toString().length;
  let _digitPositions = digitPositions[amountDigits];
  let _commaPosition = amountDigits > 3 ? digitPositions[0] : null;
  await drawBackground();
  for (let i = amountDigits - 1; i >= 0; i--) {
    await drawDigit(prime.toString()[i], _digitPositions.x[i], _digitPositions.y[i]);
  }

  saveImage(0);
};

const drawDigit = async (digit, x, y) => {
  let randomFontName = getRandomFontName();
  const layersDir = `${basePath}/layersDigits/${digit.toString()}/${randomFontName}`;

  let layersOrder = fonts.filter((o) => o.name === randomFontName)[0]
    .layersOrder;
  const layers = digitLayersSetup(layersOrder, layersDir);
  const chosenLayers = generateLayers(layers);
  let loadedLayers = [];
  chosenLayers.forEach((layer) => {
    loadedLayers.push(loadLayerImage(layer.layerPath));
  });

  await Promise.all(loadedLayers).then((renderObjectArray) => {
    renderObjectArray.forEach((renderObject) => {
      ctx.drawImage(
        renderObject.loadedImage,
        x,
        y,
        formatDigit.width,
        formatDigit.height
      );
    });
  });
  //     results.forEach((layer) => {
  //       loadedElements.push(loadLayerImg(layer));
  //     });

  //     await Promise.all(loadedElements).then((renderObjectArray) => {
  //         console.log(renderObjectArray);
  //   ctx.clearRect(0, 0, formatDigit.width, formatDigit.height);
  //   //  if (background.generate) {
  //   //     drawBackground();
  //   //   }
  //   renderObjectArray.forEach((renderObject, index) => {
  //     drawElement(renderObject, index, layersOrder.length);
  //   });
  //   saveImage(abstractedIndexes[0]);
  //   addMetadata(newDna, abstractedIndexes[0]);
  //   saveMetaDataSingleFile(abstractedIndexes[0]);
};

const drawBackground = async () => {
  const backgroundPath = `${basePath}/layersDigits/background/`;
  let backgroundLayer = [{ elements: getElements(backgroundPath) }];
  let chosenPath = generateLayers(backgroundLayer)[0].layerPath;

  let renderObject = await Promise.resolve(loadLayerImage(chosenPath));

  ctx.drawImage(renderObject.loadedImage, 0, 0, format.width, format.height);
};

const generateLayers = (_layers) => {
  let chosenLayers = [];
  _layers.forEach((layer) => {
    var totalWeight = 0;
    layer.elements.forEach((element) => {
      totalWeight += element.weight;
    });
    let random = Math.floor(Math.random() * totalWeight);
    for (var i = 0; i < layer.elements.length; i++) {
      random -= layer.elements[i].weight;
      if (random < 0) {
        return chosenLayers.push({
          layerPath: layer.elements[i].path,
        });
      }
    }
  });
  return chosenLayers;
};

const loadLayerImage = async (_path) => {
  try {
    return new Promise(async (resolve) => {
      const image = await loadImage(`${_path}`);
      resolve({ loadedImage: image });
    });
  } catch (error) {
    console.error("Error loading image:", error);
  }
};

const getRandomFontName = () => {
  let totalWeight = fonts.reduce((prev, curr) => ({
    weight: prev.weight + curr.weight,
  })).weight;
  let random = Math.floor(Math.random() * totalWeight);
  for (var i = 0; i < fonts.length; i++) {
    random -= fonts[i].weight;
    if (random < 0) {
      return fonts[i].name;
    }
  }
};

// elements: list of all elements of layer as object with {name, filename, path, weight}       id: index,
const digitLayersSetup = (layersOrder, layersDir) => {
  const layers = layersOrder.map((layerObj, index) => ({
    id: index,
    elements: getElements(`${layersDir}/${layerObj.name}/`),
    name:
      layerObj.options?.["displayName"] != undefined
        ? layerObj.options?.["displayName"]
        : layerObj.name,
  }));
  return layers;
};

const buildDir = `${basePath}/build`;
const saveImage = (_editionCount) => {
  fs.writeFileSync(
    `${buildDir}/images/${_editionCount}.png`,
    canvas.toBuffer("image/png")
  );
};

// drawDigit(0);
p = "000000"
drawPrime(p);
