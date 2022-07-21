function Symmetry() {
    this.name = "symmetry";
    this.icon = "assets/icons/symmetry.jpg";

    //help div
    let help_Div;

    //variables for symmetry div and dropdown menu
    let symmetryDiv;
    let symmetryValue;

    this.draw = () => {

        //change cursor icon to a custom cursor in assets folder
		cursor("assets/cursors/pencil.cur");

        
        //if mouse is pressed and mouse is inside the canvas
        if (mouseIsPressed && check_mouseInCanvas()) {

            //translate the points of drawing to center of canvas
            translate(width / 2, height / 2);

            //loop through the symmetry value
            for (let i = 0; i < symmetryValue.value(); i++) {

                //change anglemode to degrees
                angleMode(DEGREES);
                //calculate the angle to rotate the drawing with
                let angle = 360 / symmetryValue.value();
                //rotate function with angle value as parameter
                rotate(angle);
                //set stroke value to the value of slider in helper function
                strokeWeight(helpers.stroke_Slider.value());

                //pmouseX and pmouseY stores the mouse position from the previous frame to the current frame
                //draws line from mousex and mouseY in the previous frame to the current frame
                line(mouseX - width / 2, mouseY - height / 2, pmouseX - width / 2, pmouseY - height / 2);

                //save the current drawing state
                push();
                //scale the vertical direction by -100% to draw another line opposite to the current line on the Y-axis
                scale(1,-1);
                line(mouseX - width / 2, mouseY - height / 2, pmouseX - width / 2, pmouseY - height / 2);
                //restore the drawing state
                pop();
            }

        }
    };

    this.populateOptions = () => {
        //create a div and a dropdown menu for number of reflections for the symmetry drawing
        const options = select(".options");
        symmetryDiv = createDiv("No. of Symmetries:");
        symmetryDiv.parent(options);
        symmetryValue = createSelect();
        symmetryValue.parent(symmetryDiv);

        //populate the dropdown menu with even number of reflections upto 20
        for (let i = 4; i <= 20; i += 2) {
            symmetryValue.option(i);
        }

    };

    //creates a div in the help menu under Help button for information on how to use the tool
	this.help = () => {
		//select help div from index.html
		const HelpMenu = select(".help");
		//creates a div with information on how to use the tool
		help_Div = createDiv("&#8226 The symmetry tool works by drawing symmetrical drawings on opposite side of the current mouse position on canvas.<br> &#8226 You can change the number of symmetrical lines by choosing a desired number upto 20 from the dropdown menu. ");
		//set helpmenu div as a parent to the help text
		help_Div.parent(HelpMenu);
	};


    //if tool is unselected
    this.unselectTool = () => {
        //translate drawing points back to (0,0)
        translate(0,0);
        //remove the symmetry div and the dropdown menu
        symmetryDiv.remove();
        //cursor back to pointer after tool is unselected
        cursor(AUTO);

        //remove help_Div from help menu once tool is unselected
        help_Div.remove();
    };
}