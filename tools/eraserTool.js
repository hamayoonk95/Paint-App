function EraserTool() {
	//set an icon and a name for the object
	this.icon = "assets/icons/eraser.png";
	this.name = "eraser";

	let help_Div;

	//to smoothly erase we'll draw a line from the previous mouse location
	//to the current mouse location. The following values store
	//the locations from the last frame. They are -1 to start with because
	//we haven't started drawing yet.
	let previousMouseX = -1;
	let previousMouseY = -1;

	this.draw = () => {
		//set eraser cursor to custom icon
		cursor("assets/cursors/eraser.cur");
		//if the mouse is pressed
		if (mouseIsPressed && check_mouseInCanvas()) {
			//check if they previousX and Y are -1. set them to the current
			//mouse X and Y if they are.
			if (previousMouseX === -1) {
				previousMouseX = mouseX;
				previousMouseY = mouseY;
			} else {
				//set eraser stroke to white to erase
				stroke(255);
				//set eraser stroke value to that of slider value
				strokeWeight(helpers.stroke_Slider.value());
				//draw a white line from previousMousex and previousMouseY to current mouseX and mouseX,
				line(previousMouseX, previousMouseY, mouseX, mouseY);
				//change the previousMouseX and Y to current mouseX and Y for smooth drawing
				previousMouseX = mouseX;
				previousMouseY = mouseY;
			}
		}
		//if the user has released the mouse we want to set the previousMouse values 
		//back to -1.
		else {
			previousMouseX = -1;
			previousMouseY = -1;
		}
	};

	//creates a div in the help menu under Help button for information on how to use the tool
	this.help = () => {
		//select help div from index.html
		const HelpMenu = select(".help");
		//creates a div with information on how to use the tool
		help_Div = createDiv("&#8226 The Eraser tool erases the drawing on canvas by drawing strokes with white colour. <br>&#8226 Simply drag the mouse over any area you wish to remove and it will be removed.<br>&#8226 You can also change the size of the eraser by dragging the stroke size slider." );
		//set helpmenu div as a parent to the help text
		help_Div.parent(HelpMenu);
	};

	this.unselectTool = () => {
		//set cursor back to AUTO
		cursor(AUTO);
		//change stroke color to selected colour from colour palette
		stroke(colourP.selectedColour);

		//remove help_Div from help menu once tool is unselected
        help_Div.remove();
	};
}