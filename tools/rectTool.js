function RectTool() {
	//set an icon and a name for the object
	this.icon = "assets/icons/rectangle.png";
	this.name = "Rectangle";

	//these values store the location from the last frame and are set to -1 because we haven't started drawing yet
	let startMouseX = -1;
	let startMouseY = -1;
	//set drawing to false at first
	let drawing = false;


	this.draw = () => {
		//set cursor to CROSS
		cursor(CROSS);

		//calculate width and height of rectangle
		let rect_Width = mouseX - startMouseX;
		let rect_Height = mouseY - startMouseY;

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
				//change stroke size to what the slider value is
				strokeWeight(helpers.stroke_Slider.value());
				//draw rect based on mouse location
				rect(startMouseX, startMouseY, rect_Width, rect_Height);

			}

		} else if (drawing) {
			//change the value of drawing to false and startmouseX and startmouseY back to -1 once drawing is finished
			drawing = false;
			startMouseX = -1;
			startMouseY = -1;
		}
	};

	this.unselectTool = () => {
		//cursor icon AUTO
		cursor(AUTO);
	};
}