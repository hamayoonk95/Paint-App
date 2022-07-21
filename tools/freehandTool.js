function FreehandTool() {
	//set an icon and a name for the object
	this.icon = "assets/icons/freehand.jpg";
	this.name = "freehand";

	let help_Div;

	//var for brushtypes dropdown and div
	let brushDiv;
	let brushTypes;

	//The following values store the locations from the last frame. They are -1 to start with because
	//we haven't started drawing yet.
	let previousMouseX = -1;
	let previousMouseY = -1;

	this.draw = () => {
		
		//change cursor icon to a custom cursor in assets folder
		cursor("assets/cursors/pencil.cur");
		//if the mouse is pressed
		if (mouseIsPressed && check_mouseInCanvas()) {

			//check if they previousX and Y are -1. set them to the current
			//mouse X and Y if they are.
			if (previousMouseX === -1) {
				previousMouseX = mouseX;
				previousMouseY = mouseY;
			}
			//if we already have values for previousX and Y we can draw a line from 
			//there to the current mouse location
			else {
				//switch operator evaluationg the value of the brush type dropdown menu to execute the case accordingly
				switch(brushTypes.value()) {
					//if value of the dropdown is pen then
					case "pen":
						//change stroke size to what the slider value is
						strokeWeight(helpers.stroke_Slider.value());
						//draw line from prev mouseX and mouseY to current mouseX and mouseY
						line(previousMouseX, previousMouseY, mouseX, mouseY);
						break;

					//if value of the drop down is fountainpen then
					case "fountainpen":
						//change stroke size to slider value
						strokeWeight(helpers.stroke_Slider.value());
						//draw line from previous location to current location of mouse
						line(previousMouseX - 2, previousMouseY - 2, mouseX + 2, mouseY + 2);
						break;
					
					//if value of dropdown menu is marker then
					case "marker":
						//using spread operator to expand values of current_color array from colourPalette constructor as fill color
						fill(...colourP.current_color,40);

						//remove stroke 
						noStroke();
						//constrain the size of elipses between 20 and 40
						let size = constrain(helpers.stroke_Slider.value(),20,40);
						//draw ellipses
						ellipse(previousMouseX,previousMouseY,size);
						//change stroke size values back to slider value
						stroke(helpers.stroke_Slider.value());
						break;

					//if value is dropdown then execute this case
					case "colorful stroke":
						//change color mode to HSB
						colorMode(HSB);
						//generates a value for hue with each framecount
						const hue = (frameCount * 10) % 360;
						//gets the color with hue, stauration and brightness values 
						const hsbaColor = color(hue,100,100);
						stroke(hsbaColor);
						strokeWeight(helpers.stroke_Slider.value());
						line(previousMouseX, previousMouseY, mouseX, mouseY);

						//changing the color mode back to RGB
						colorMode(RGB);
						//changing the stroke color back to selected color from the color palette
						stroke(colourP.selectedColour);
						break;

					//if value is dropdown then execute this case
					case "wiggle":
						//calculates distance from prev mouse and current mouse location
						const distance = dist(mouseX, mouseY, pmouseX, pmouseY);

						// find the midpoint between the current and previous mouse points
						const midX = (mouseX + pmouseX) / 2;
						const midY = (mouseY + pmouseY) / 2;

						//angle mode to radians
						angleMode(RADIANS);
						// find the angle of the direction the mouse is moving in
						const angle = Math.atan2(mouseY - pmouseY, mouseX - pmouseX);

						// find which way to flip the arc
						const flip = (frameCount % 2) * PI;

						noFill();
						strokeWeight(helpers.stroke_Slider.value());
						// draw the arc as a half circle 
						arc(midX, midY, distance, distance, angle + flip, angle + PI + flip);
						break;


				}
				
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

	//creates a dropdown menu at the bottom of page in the div with .options class
	this.populateOptions = () => {
		//create div and dropdown menu and sets their parents div
		brushDiv = createDiv("Change Brush: ");
		brushDiv.class("brushes");
		brushTypes = createSelect();
		const options = select(".options");
		brushTypes.parent(brushDiv);
		brushDiv.parent(options);

		//fill the dropdown menu with values
		brushTypes.option("pen");
		brushTypes.option("fountainpen");
		brushTypes.option("marker");
		brushTypes.option("colorful stroke");
		brushTypes.option("wiggle");
	};

	//creates a div in the help menu under Help button for information on how to use the tool
	this.help = () => {
		//select help div from index.html
		const HelpMenu = select(".help");
		//creates a div with information on how to use the tool
		help_Div = createDiv("&#8226 This tool draws pencil like lines on canvas when mouse is pressed. <br>&#8226 You can change the size of the stroke with the slider and can also change the brush type to draw different types of lines on canvas by selecting a value from the dropdown menu");
		//set helpmenu div as a parent to the help text
		help_Div.parent(HelpMenu);
	};

	//unselectTool property to remove created div and sets cursor back to AUTO
	this.unselectTool = () => {
		//set cursor back to AUTO
		cursor(AUTO);

		//remove the brush div with dropdown menu once tool is unselected
		brushDiv.remove();

		//remove help_Div from help menu once tool is unselected
		help_Div.remove();
	};

}