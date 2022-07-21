function LineToTool() {
	//set an icon and a name for the object
	this.icon = "assets/icons/line.jpg";
	this.name = "LineTo";

	//these values store the location from the last frame and are set to -1 because we haven't started drawing yet
	let startMouseX = -1;
	let startMouseY = -1;
	//set drawing to false at first
	let drawing = false;

	this.draw = () => {
		//sets cursor to CROSS
		cursor(CROSS);
		//if mouse is pressed
		if (mouseIsPressed && check_mouseInCanvas()) {
			//if startMouseX value is -1
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
				//sets strokeWeight to slider value
				strokeWeight(helpers.stroke_Slider.value());
				//draw line from startMouseX and StartmouseY location to current mouseX and mouseY
				line(startMouseX, startMouseY, mouseX, mouseY);

			}

		} else if (drawing) {
			//change the value of drawing to false and startmouseX and startmouseY back to -1 once drawing is finished
			drawing = false;
			startMouseX = -1;
			startMouseY = -1;
		}
	};

	this.unselectTool = () => {
		//sets cursor back to AUTO
		cursor(AUTO);
	};
}