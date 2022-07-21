function TriangleTool() {
	this.icon = "assets/icons/triangle.png";
	this.name = "Triangle";

	//these values store the location from the last frame and are set to -1 because we haven't started drawing yet
	let startMouseX = -1;
	let startMouseY = -1;
	//set drawing to false at first
	let drawing = false;


	this.draw = () => {
		//calculate left side of triangle to make sure is exactly opposite to its right side
		let opp_Dist = mouseX - startMouseX;
		//set cursor icon to CROSS
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
				//draw line from startMouseX and StartmouseY location to current mouseX and mouseY
				noFill();
				strokeWeight(helpers.stroke_Slider.value());
				triangle(startMouseX, startMouseY,
					startMouseX - opp_Dist, mouseY,
					mouseX, mouseY);

			}

		} else if (drawing) {
			//change the value of drawing to false and startmouseX and startmouseY back to -1 once drawing is finished
			drawing = false;
			startMouseX = -1;
			startMouseY = -1;
		}
	};

	this.unselectTool = () => {
		//change cursor to AUTO
		cursor(AUTO);
	};
}