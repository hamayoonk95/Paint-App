function StarTool() {
	this.name = "star";
	this.icon = "assets/icons/star.jpg";


	let startMouseX = -1;
	let startMouseY = -1;
	let drawing = false;

	this.draw = () => {
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
				//set strokeWeight value to that of slider value
				strokeWeight(helpers.stroke_Slider.value());
				//set transparency to full
				noFill();
				//calling star method with mouse positions as parameters
				star(startMouseX,
					startMouseY,
					mouseX - startMouseX,
					mouseY - startMouseY,
					5);
			}

		} else if (drawing) {
			//change the value of drawing to false and startmouseX and startmouseY back to -1 once drawing is finished
			drawing = false;
			startMouseX = -1;
			startMouseY = -1;
		}
	};

	this.unselectTool = () => {
		//changing cursor back to AUTO
		cursor(AUTO);
	};

	//function calculates the shape of the star and draws onto canvas
	const star = (x, y, radius1, radius2, npoints) => {
		angleMode(RADIANS);
		let angle = TWO_PI / npoints;
		let halfAngle = angle / 2.0;
		beginShape();
		for (let a = 0; a < TWO_PI; a += angle) {
			let sx = x + cos(a) * radius2;
			let sy = y + sin(a) * radius2;
			vertex(sx, sy);
			sx = x + cos(a + halfAngle) * radius1;
			sy = y + sin(a + halfAngle) * radius1;
			vertex(sx, sy);
		}
		endShape(CLOSE);
	};
}