var PixelType;
(function (PixelType) {
    PixelType[PixelType["Empty"] = 0] = "Empty";
    PixelType[PixelType["Sand"] = 1] = "Sand";
    PixelType[PixelType["Water"] = 2] = "Water";
})(PixelType || (PixelType = {}));
/**
 * Default (blank) pixel
 */
var Pixel = /** @class */ (function () {
    /**
     * Returns a default pixel
     * @param pos Pixel position
     */
    function Pixel(pos) {
        this.position = pos;
    }
    /**
     * Gets the render color for this pixel
     */
    Pixel.prototype.GetColor = function () {
        return "black";
    };
    Pixel.prototype.GetType = function () {
        return PixelType.Empty;
    };
    return Pixel;
}());
/**
 * Abstract view of the game world
 */
var World = /** @class */ (function () {
    function World(size) {
        // Initialize empty board
        this.board = [];
        for (var y = 0; y < size.y; y++) {
            this.board.push([]);
            for (var x = 0; x < size.x; x++) {
                this.board[y].push(new Pixel({ x: x, y: y }));
            }
        }
    }
    World.prototype.RenderAll = function (renderMethod) {
        for (var y = 0; y < this.size.y; y++) {
            for (var x = 0; x < this.size.x; x++) {
                if (this.board[y][x].GetType() == PixelType.Empty)
                    continue;
                renderMethod({ x: x, y: y }, this.board[y][x].GetColor()); // TODO
            }
        }
    };
    World.prototype.GetSize = function () {
        return this.size;
    };
    return World;
}());
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Basic sand pixel
 */
var SandPixel = /** @class */ (function (_super) {
    __extends(SandPixel, _super);
    function SandPixel(pos) {
        return _super.call(this, pos) || this;
    }
    SandPixel.prototype.GetColor = function () {
        return "#ffc22d"; // yellow ish
    };
    SandPixel.prototype.GetType = function () {
        return PixelType.Sand;
    };
    return SandPixel;
}(Pixel));
var PIXEL_SIZE = 2;
/**
 * Does the gritty graphics stuff
 */
var Game = /** @class */ (function () {
    function Game(size, context) {
        var _this = this;
        this.size = size;
        this.context = context;
        this.world = new World({ x: size.x / PIXEL_SIZE, y: size.y / PIXEL_SIZE });
        // Register event handlers
        this.context.canvas.addEventListener("mousedown", function () {
            _this.isMouseDown = true;
        });
        this.context.canvas.addEventListener("mouseup", function () {
            _this.isMouseDown = false;
        });
        this.context.canvas.addEventListener("mousemove", function (event) {
            console.log(event);
        });
    }
    Game.prototype.render = function () {
        var _this = this;
        this.context.clearRect(0, 0, this.size.x, this.size.y);
        this.world.RenderAll((function (pos, color) {
            _this.context.fillStyle = color;
            _this.context.fillRect(pos.x, pos.y, PIXEL_SIZE, PIXEL_SIZE);
        }));
    };
    return Game;
}());
//# sourceMappingURL=app.js.map