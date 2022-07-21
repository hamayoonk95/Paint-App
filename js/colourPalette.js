//Displays and handles the colour palette.
function ColourPalette() {

	//create a div and html colorpicker element and set initial color to black;
	const color_Div = createDiv("Colours:");	
	const colorPick = createColorPicker("#000000");

	//select colourPalette class from html and set it as colorpicker div & element's parent
	const colorpalette = select(".colourPalette");
	color_Div.parent(colorpalette);
	colorPick.parent(color_Div);
	colorPick.class("colorPicker");

	//set selectedcolour as the color value of Colorpick i.e. black
	this.selectedColour = colorPick.color();

	//gets the rgb values from the selected color and saves it as an array
	//used by marker in freehand tool
	this.current_color = [this.selectedColour.levels[0],this.selectedColour.levels[1],this.selectedColour.levels[2]];

	//onchange event on colorpicker to change stroke and fill color to that of the rgb levels of color picker
	colorPick.changed(() => {

		//set selectedcolour to be the new color of colorpicker
		this.selectedColour = colorPick.color();
		this.current_color = [this.selectedColour.levels[0],this.selectedColour.levels[1],this.selectedColour.levels[2]];

		//stroke color to be the r,g,b levels of colorpicker
		stroke(this.selectedColour);

		//fill color to be the r,g,b levels of the colorpicker
		fill(this.selectedColour);
		
	});
	
}
