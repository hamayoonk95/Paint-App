function SpraycanTool() {
    //set an icon and a name for the object
    this.icon = "assets/icons/sprayCan.jpg"
    this.name = "spraycanTool";

    //help div
    let help_Div;

    //variables to store points and spread value
    let points;
    let spread;

    this.draw = () => {
        //change cursor to custom cursor
        cursor("assets/cursors/spray.cur");

        //if mouse Is being pressed and mouse position is greater than -1
        if (mouseIsPressed && check_mouseInCanvas()) {

            //spread and points value change depending on slider value
            //min value set to 5 for proper use
            spread = max(5,helpers.stroke_Slider.value());
            points = max(5,helpers.stroke_Slider.value());
            strokeWeight(1); //stroke size 1 for all points
            //loops specified times and draws points on random locations around mouse
            for (let i = 0; i < points; i++) {
                point(random(mouseX - spread, mouseX + spread),
                    random(mouseY - spread, mouseY + spread));
            }
        }
    };

    //creates a div in the help menu under Help button for information on how to use the tool
	this.help = () => {
		//select help div from index.html
		const HelpMenu = select(".help");
		//creates a div with information on how to use the tool
		help_Div = createDiv("&#8226 The Spray can tool draws points onto canvas much like a paint spray. <br> &#8226 You can increase the spread area and number of points by using the Stroke Size slider" );
		//set helpmenu div as a parent to the help text
		help_Div.parent(HelpMenu);
	};


    this.unselectTool = () => {
        //sets cursor back to AUTO
        cursor(AUTO);
        //remove help_Div from help menu once tool is unselected
        help_Div.remove();
    };
}