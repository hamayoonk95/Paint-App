// Global variables that will store the toolbox colour palette
// and the helper functions.
let toolbox = null;
let colourP = null;
let helpers = null;
let c = null;
let canvasContainer;
let ctx;

//variables to save loaded fonts into
let font_Handwriting;
let font_Arial;
let font_bitter;

//preload function: loads files at the beginning of program loading
function preload() {

	//loads fonts from fonts folder and saves them into variables
	font_Handwriting = loadFont("fonts/handwriting.ttf");
	font_Arial = loadFont("fonts/arial.ttf");
	font_bitter = loadFont("fonts/bitter.ttf");
}



function setup() {

	//create a canvas to fill the content div from index.html
	canvasContainer = select('#content');
	c = createCanvas(canvasContainer.size().width, canvasContainer.size().height);
	c.parent("#content");
	//defines canvas rendering context i.e 2d
	ctx = drawingContext;

	//create helper functions and the colour palette
	helpers = new HelperFunctions();
	colourP = new ColourPalette();

	//create a toolbox for storing the tools
	toolbox = new Toolbox();


	//add the tools to the toolbox.
	toolbox.addTool(new FreehandTool());
	toolbox.addTool(new Symmetry());
	toolbox.addTool(new ShapesTool());
	toolbox.addTool(new SelectTool());
	toolbox.addTool(new TextTool());
	toolbox.addTool(new SpraycanTool());
	toolbox.addTool(new mirrorDrawTool());
	toolbox.addTool(new BucketTool());
	toolbox.addTool(new EraserTool());
	toolbox.addTool(new EffectsTool());
	background(255);

}

function draw() {
	//call the draw function from the selected tool.
	//hasOwnProperty is a javascript function that tests
	//if an object contains a particular method or property
	//if there isn't a draw method the app will alert the user
	if (toolbox.selectedTool.hasOwnProperty("draw")) {
		toolbox.selectedTool.draw();
	} else {
		alert("it doesn't look like your tool has a draw method!");
	}
}

//checks if mouse is within canvas
//this function is called everytime with mouseIsPressed to ensure mouse press only works when pointer is inside canvas.
//Fixes a tiny bug when mouse is clicked outside of canvas and still draw on the edges of canvas 
function check_mouseInCanvas() {
	if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
		return true;
	}
}