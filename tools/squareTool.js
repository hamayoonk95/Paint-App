function SquareTool() {
	//set an icon and a name for the object
	this.icon = "assets/icons/square.png";
	this.name = "Square";

	//these values store the location from the last frame and are set to -1 because we haven't started drawing yet
	let startMouseX = -1;
	let startMouseY = -1;
	//set drawing to false at first
	let drawing = false;


	this.draw = () => {
		//calculate area of the square
		let area = dist(startMouseX, startMouseY, mouseX, mouseY);

		//set cursor to CROSS shape
		cursor(CROSS);

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
				//set strokeWeight to that to slider value
				strokeWeight(helpers.stroke_Slider.value());
				//draw squares
				rect(startMouseX, startMouseY, area, area);

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