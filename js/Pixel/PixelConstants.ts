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
  Fuse,
  Stone,
  Portal
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
  Fuse: "sienna",
  Stone: "lightgrey",
  Portal: "purple"
};

/**
 * Resistance to damage
 */
const PixelDurabilities = {
  Default: 10,
  Block: Number.MAX_SAFE_INTEGER,
  Water: 6,
  Magma: 30,
  Stone: 29
};

/**
 * Physical weight 
 */
const PixelWeights = {
  Default: 20,
  Block: Number.MAX_SAFE_INTEGER,
  Water: 15,
  Magma: 18,
  Stone: 30
};

/**
 * Liquid viscosity.
 * Affects stacking of liquids
 */
const PixelViscosities = {
  Default: Number.MAX_SAFE_INTEGER,
  Oil: 10,
  Water: 6,
  Magma: 12
};

/**
 * Pixel size when inserted
 * (inserts a square of this size)
 */
const PixelInsertScales = {
  Default: 4,
  Clone: 4,
  Block: 4
};
