function EllipseTool() {
	//set an icon and a name for the object
	this.icon = "assets/icons/ellipse.jpg";
	this.name = "ellipse";

	//these values store the location from the last frame and are set to -1 because we haven't started drawing yet
	let startMouseX = -1;
	let startMouseY = -1;
	//set drawing to false at first
	let drawing = false;

	this.draw = () => {
		//set cursor to CROSS
		cursor(CROSS);

		//if mouse is pressed
		if (mouseIsPressed && check_mouseInCanvas()) {
			if (startMouseX === -1) {
				//changes startMouseX value to mouseX and startMouseY to mouseY
				startMouseX = mouseX;
				startMouseY = mouseY;
				//change drawing from false to true
				drawing = true;
				//this loads the pixel data from the window into an array called pixels to be manipulated
				loadPixels();
			} else {
				//updates the window with the changed pixel data from the pixels array once we complete drawing
				updatePixels();
				//set full transparency
				noFill();
				//set strokeweight to slider value
				strokeWeight(helpers.stroke_Slider.value());
				ellipse(startMouseX, startMouseY, mouseX - startMouseX, mouseY - startMouseY);
			}

		} else if (drawing) {
			//change the value of drawing to false and startmouseX and startmouseY back to -1 once drawing is finished
			drawing = false;
			startMouseX = -1;
			startMouseY = -1;
		}
	};

	this.unselectTool = () => {
		//set cursor back to AUTO
		cursor(AUTO);
	};

}