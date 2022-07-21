function mirrorDrawTool() {
	this.name = "mirrorDraw";
	this.icon = "assets/icons/mirrorDraw.jpg";

	let help_Div;

	//variable for button to be created in populate options
	let button;

	//which axis is being mirrored (x or y) x is default
	this.axis = "x";
	//line of symmetry is halfway across the screen
	this.lineOfSymmetry = width / 2;

	// `this` changes in the click handler. So storing it as a
	// variable `self` now means we can still access it in the handler

	let self = this;

	//where was the mouse on the last time draw was called.
	//set it to -1 to begin with
	let previousMouseX = -1;
	let previousMouseY = -1;

	//mouse coordinates for the other side of the Line of symmetry
	let previousOppositeMouseX = -1;
	let previousOppositeMouseY = -1;

	this.draw = () => {
		cursor("assets/cursors/pencil.cur");
		//display the last save state of pixels
		updatePixels();

		//do the drawing if the mouse is pressed
		if (mouseIsPressed && check_mouseInCanvas()) {
			//if the previous values are -1 set them to the current mouse location
			//and mirrored positions
			if (previousMouseX === -1) {
				previousMouseX = mouseX;
				previousMouseY = mouseY;
				previousOppositeMouseX = this.calculateOpposite(mouseX, "x");
				previousOppositeMouseY = this.calculateOpposite(mouseY, "y");
			}

			//if there are values in the previous locations
			//draw a line between them and the current positions
			else {
				//sets strokeWight to slider value
				strokeWeight(helpers.stroke_Slider.value());
				line(previousMouseX, previousMouseY, mouseX, mouseY);
				previousMouseX = mouseX;
				previousMouseY = mouseY;

				//these are for the mirrored drawing the other side of the
				//line of symmetry
				let oX = this.calculateOpposite(mouseX, "x");
				let oY = this.calculateOpposite(mouseY, "y");
				line(previousOppositeMouseX, previousOppositeMouseY, oX, oY);
				previousOppositeMouseX = oX;
				previousOppositeMouseY = oY;
				strokeWeight(1);
			}
		}
		//if the mouse isn't pressed reset the previous values to -1
		else {
			previousMouseX = -1;
			previousMouseY = -1;

			previousOppositeMouseX = -1;
			previousOppositeMouseY = -1;
		}

		//after the drawing is done save the pixel state. We don't want the
		//line of symmetry to be part of our drawing

		loadPixels();

		//push the drawing state so that we can set the stroke weight and colour
		push();
		strokeWeight(3);
		stroke("red");
		//draw the line of symmetry
		if (this.axis === "x") {
			line(width / 2, 0, width / 2, height);
		} else {
			line(0, height / 2, width, height / 2);
		}
		//return to the original stroke
		pop();

	};

	/*calculate an opposite coordinate the other side of the
	 *symmetry line.
	 *@param n number: location for either x or y coordinate
	 *@param a [x,y]: the axis of the coordinate (y or y)
	 *@return number: the opposite coordinate
	 */
	this.calculateOpposite = (n, a) => {
		//if the axis isn't the one being mirrored return the same
		//value
		if (a != this.axis) {
			return n;
		}

		//if n is less than the line of symmetry return a coorindate
		//that is far greater than the line of symmetry by the distance from
		//n to that line.
		if (n < this.lineOfSymmetry) {
			return this.lineOfSymmetry + (this.lineOfSymmetry - n);
		}

		//otherwise a coordinate that is smaller than the line of symmetry
		//by the distance between it and n.
		else {
			return this.lineOfSymmetry - (n - this.lineOfSymmetry);
		}
	};

	//creates a div in the help menu under Help button for information on how to use the tool
	this.help = () => {
		//select help div from index.html
		const HelpMenu = select(".help");
		//creates a div with information on how to use the tool
		help_Div = createDiv("&#8226 The Mirror draw tool works by drawing a line of symmetry either vertical or horizental in the middle of the canvas. <br> &#8226 If a user draws on one side of the symmetry line then a similar drawing is created on the other side as well." );
		//set helpmenu div as a parent to the help text
		help_Div.parent(HelpMenu);
	};



	//when the tool is deselected update the pixels to just show the drawing and
	//hide the line of symmetry. Also clear options
	this.unselectTool = () => {
		updatePixels();

		//remove the button when tool is unselected
		button.remove();
		//change cursor back to AUTO
		cursor(AUTO);

		//remove help_Div from help menu once tool is unselected
        help_Div.remove();
	};

	//adds a button and click handler to the options area. When clicked
	//toggle the line of symmetry between horizonatl to vertical
	this.populateOptions = () => {
		//creates a button and set options div as its parent
		button = createButton("Make Horizental");
		button.parent("options");
		// const button = select(".button")

		button.html("Make Horizental");
		//click handler
		button.mouseClicked(() => {
			if (self.axis === "x") {
				self.axis = "y";
				self.lineOfSymmetry = height / 2;
				button.html('Make Vertical');
			} else {
				self.axis = "x";
				self.lineOfSymmetry = width / 2;
				button.html('Make Horizontal');
			}
		});
	};
}