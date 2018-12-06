# pixel-game
Inspired by dan-ball's java powder game

Demo available [here](http://www.andrew.cmu.edu/user/ibhargav/pixel-game/)

The code is organized as follows
 - `index.html` - Also contains game entry point in a `<script>`
 - `style.css`
 - `app.js` - Not included, generated by `tsc`, application bundle
 - `js/`
   - `Pixel/` - holds all Pixel implementations
    - `PixelConstants.ts` - game constants for pixels e.g. size, colors, etc.
   - `Tool/` - holds all Tool implementations
    - `ToolConstants.ts` - tool constants/parameters
   - `Pixel.ts`/`Tool.ts` - base class for pixels/tools
   - `PixelFactory.ts`/`ToolFactory.ts` - Converts `PixelType`/`ToolType` to the appropriate classes
   - `Game.ts` - handles interfacing with HTML
   - `World.ts` - handles interfacing with the board as a whole
   - `Util.ts` - misc. functions such as ES7 extensions, math functions 

The project is based around the `Pixel` class, which has 3 primary subclasses:
`SandPixel`, `WaterPixel`, and `BlockPixel`. Most other pixel types inherit from one of these.
The `SandPixel` type is for solid pixels which participate in physics. The `WaterPixel` type is for
liquids, which have properties such as allowing solids to pass through and automatically balancing
out liquid levels. 

The game loop first updates all pixels in order from top left to bottom right. The `World` object holds
a 2D array corresponding to every possible pixel location, with `null` representing blank space. This allows
for more efficient physics code as finding neighbors is a constant-time operation. When moving more than one pixel
at a time, every pixel in the path is checked to ensure pixels don't clip through others.

For the purpose of physics, pixels outside the game's bounds are treated as of type `PixelType.Block`. The `World`
object provides functions to treat pixels outside bounds as `null`. Which one is used depends on context. 