/**
 * Represents all possible Pixel types
 */
enum PixelType {
  Empty,
  Block,
  Sand,
  Water,
  Magma,
  Clone,
  Oil,
  Fuse
}

/**
 * Colors each pixel will be rendered as
 */
const PixelColors = {
  Block: "grey",
  Sand: "#ffc22d", // yellow ish
  Water: "blue",
  Magma: "red",
  Clone: "#b29966",
  Oil: "brown",
  Fuse: "sienna"
};

const PixelDurabilities = {
  Default: 10,
  Block: Number.MAX_SAFE_INTEGER,
  Water: 6,
  Magma: 30
};

const PixelWeights = {
  Default: 20,
  Block: Number.MAX_SAFE_INTEGER,
  Water: 15,
  Magma: 18,
};

const PixelViscosities = {
  Default: Number.MAX_SAFE_INTEGER,
  Oil: 3,
  Water: 6,
  Magma: 30
};

const PixelInsertScales = {
  Default: 2,
  Clone: 4,
  Block: 4
};
