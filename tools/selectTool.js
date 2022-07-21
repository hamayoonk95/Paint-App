function SelectTool() {
	//set an icon and a name for the object
	this.icon = "assets/icons/select.png";
	this.name = "Select";

	//help div
	let help_Div;

	//these values store the location from the last frame and are set to -1 because we haven't started drawing yet
	let startMouseX = -1;
	let startMouseY = -1;
	//set drawing to false at first
	let drawing = false;

	//stores image data 
	let data = null;


	this.draw = () => {
		//set cursor to CROSS
		cursor(CROSS);

		//calculate width and height of rectangle
		let rect_width = mouseX - startMouseX;
		let rect_height = mouseY - startMouseY;

		if (mouseIsPressed) {
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

				//get the pixels behind rectangular region as image and store them in data
				data = get(startMouseX, startMouseY, rect_width +1, rect_height + 1);

				// create a rectangle with white fill to remove the previous pixels
				fill(255);
				//nostroke
				noStroke();
				rect(startMouseX, startMouseY, rect_width + 1, rect_height + 1);
			}

		} else if (drawing) {
			//change the value of drawing to false and startmouseX and startmouseY back to -1 once drawing is finished
			drawing = false;
			startMouseX = -1;
			startMouseY = -1;

			//load pixels data from window
			loadPixels();
		}

		//if drawing is false and data is not empty
		if (!drawing && data !== null) {
			//if mouse is moved on canvas, load the image from data
			c.mouseMoved(() => {
				//update the window with the changed pixels
				updatePixels();
				//loads image where mouse moves
				image(data, mouseX - data.width / 2, mouseY - data.height / 2);
			});

			//if mouse is double clicked on canvas
			c.doubleClicked(() => {
				//mouseIspressed is false so it doenst attempt to create another image from pixels
				mouseIsPressed = false;
				//make mousemoved event false 
				c.mouseMoved(false)
				//loads image's center at mouseX and mouseY
				image(data, mouseX - data.width / 2, mouseY - data.height / 2);
				data = null;
			})
		}

	};

	//creates a div in the help menu under Help button for information on how to use the tool
	this.help = () => {
		//select help div from index.html
		const HelpMenu = select(".help");
		//creates a div with information on how to use the tool
		help_Div = createDiv("&#8226 The Select Tool works by copying the pixels of a selected rectangular region and pasting it onto anywhere on canvas using mouse double click. <br> &#8226 Start by dragging mouse over a region you wish to cut and then double click the mouse anywhere else on the canvas to paste the image.");
		//set helpmenu div as a parent to the help text
		help_Div.parent(HelpMenu);
	};

	//if tool is unselected
	this.unselectTool = () => {
		//cursor icon AUTO
		cursor(AUTO);

		//set stroke color back to selected colour from colourPalette
		stroke(colourP.selectedColour);

		//remove help_Div from help menu once tool is unselected
        help_Div.remove();

		//remove the mouseMoved event from canvas
		c.mouseMoved(false)
		
	};
}