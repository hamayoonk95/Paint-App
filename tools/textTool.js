function TextTool() {
	this.icon = "assets/icons/text.jpg";
	this.name = "text";

	//help div
	let help_Div;

	//these values store the location from the last frame and are set to -1 because we haven't started drawing yet
	let startMouseX = -1;
	let startMouseY = -1;

	//array to store created inputs
	let inputs = [];

	//local variables for storing the div, slider and dropdown menu for font size and type
	let font_Div;
	let font_slider;
	let font_Style;
	let font_type;
	let removeinput_Btn;

	//the textinput is initilised here so that it's value can be accessed by other functions
	let textinput;

	this.draw = () => {

		//mouseclicked on canvas to create input
		c.mouseClicked(() => {
			startMouseX = mouseX;
			startMouseY = mouseY;
			//loads pixel data to be manipulated
			loadPixels();
			//the if statement is to fix a bug where if mouse was clicked on outside of canvas then a text input was created
			if (startMouseX > 0 && startMouseY < height) {
				//create input field for text
				textinput = createInput("");
				//push the  into textinput into inputs array
				inputs.push(textinput);
				//position the input field exactly behind mouse click
				textinput.position(startMouseX + 60, startMouseY + 25);
			}

		});

		//if Enter key is pressed after writing then add input's value to canvas and remove the textinput
		if (keyIsPressed && keyCode == 13) {
			updatePixels();

			//set strokeWeight to one to avoid clashing with stroke slider
			strokeWeight(1);
			//text size depending on slider value
			textSize(font_slider.value());

			//switch operator to check which font has been selected to change textFont accordingly
			switch (font_type.value()) {
				case "Arial":
					textFont(font_Arial);
					break;

				case "Bitter":
					textFont(font_bitter);
					break;

				case "Fantasy":
					textFont("fantasy");
					break;

				case "Monospace":
					textFont("Monospace");
					break;

				case "Handwriting":
					textFont(font_Handwriting);
					break;

				case "Cursive":
					textFont("cursive");
					break;


			}

			//fill colour to be selected color from Colour palette
			fill(colourP.selectedColour);
			//add userinput text to canvas where mouse was clicked
			text(textinput.value(), startMouseX, startMouseY);
			//remove textinput after its value has been printed to canvas
			textinput.remove();
		}

		//if additional input fields are created then clicking removeinput_btn button would remove them all
		removeinput_Btn.mouseClicked(() => {
			//remove any additional input fields from the input array thus from canvas
			for (let i in inputs) {
				inputs[i].remove();
			}
		});

	};

	//create a div and slider for font size and set optionsdiv as its parent
	this.populateOptions = () => {

		const optionsDiv = select(".options");

		//create a div and a slider for fontsize and set optionDiv as its parent
		font_Div = createDiv("Font" + '&nbsp  &nbsp ' + "Size:");
		font_Div.id("fontSlider");
		font_slider = createSlider(10, 100, 10, 5);
		font_Div.parent(optionsDiv);
		font_slider.parent(font_Div);

		//create a div and dropdown menu for font styles and set OptionsDiv as its parent
		font_Style = createDiv("Font" + '&nbsp ' + "Type:");
		font_type = createSelect();
		font_Style.parent(optionsDiv);
		font_type.parent(font_Style);

		//fill the dropdown menu with options
		font_type.option("Arial");
		font_type.option("Bitter");
		font_type.option("Cursive");
		font_type.option("Fantasy");
		font_type.option("Handwriting");
		font_type.option("Monospace");

		//button to remove any additional input fields 
		removeinput_Btn = createButton("Remove Inputfields");
		removeinput_Btn.parent(options);
	};

	//creates a div in the help menu under Help button for information on how to use the tool
	this.help = () => {
		//select help div from index.html
		const HelpMenu = select(".help");
		//creates a div with information on how to use the tool
		help_Div = createDiv("&#8226 The text tool works by rendering text that the user inputs into the html input tag. <br> Start by clicking on the canvas to insert an input field. <br> &#8226 Click on the input field and type the text and then press enter to render it onto the canvas. <br> &#8226 You can choose different fonts from the dropdown menu and also change font size by using the slider. <br> &#8226 You can also remove any accidental input fields created by clicking the Remove Inputfields Button");
		//set helpmenu div as a parent to the help text
		help_Div.parent(HelpMenu);
	};

	this.unselectTool = () => {
		//set strokeWeight back to the slider value
		strokeWeight(helpers.stroke_Slider.value());
		//remove the font size slider and button once different tool is selected
		font_Div.remove();
		font_Style.remove();
		removeinput_Btn.remove();

		//remove help_Div from help menu once tool is unselected
		help_Div.remove();

		//mouseCLick event false so textbox are not inserted when other tools are selected
		c.mouseClicked(false);
	};


}