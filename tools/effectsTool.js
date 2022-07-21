function EffectsTool() {
    this.name = "effects";
    this.icon = "assets/icons/effects.png";

    let help_Div;

    //buttons and div for filters
    let filtersDiv;
    let blurButton;
    let greyscale_btn;
    let invert_btn;
    let opaque_btn;
    let erode_btn;
    let dilate_btn;

    this.draw = () => {
        //if blur button is clicked
        blurButton.mouseClicked(() => {
            //apply BLUR filter with a value of 1
            filter(BLUR,5);
        });

        //if greyscale button is clicked
        greyscale_btn.mouseClicked(() => {
            //apply grayscale filter
            filter(GRAY);
        });

        //if invert button is clicked
        invert_btn.mouseClicked(() => {
            //apply invert filter
            filter(INVERT);
        });

        opaque_btn.mouseClicked(() => {
            filter(OPAQUE);
        });

        erode_btn.mouseClicked(() => {
            filter(ERODE);
        });

        dilate_btn.mouseClicked(() => {
            filter(DILATE);
        });
    };

    //adds effects to the options html element
    //called in toolbox.js when tool is selected
    this.addEffect = () => {
        //selects tag with options class from html
        const options = select(".options");
        filtersDiv = createDiv("Filters: ");
        filtersDiv.parent(options);
        filtersDiv.style("");

        //Creates buttons for filters and sets their parent as html element with the class .options
        blurButton = createButton("Blur");
        blurButton.parent(filtersDiv);
        
        greyscale_btn = createButton("Greyscale");
        greyscale_btn.parent(filtersDiv);

        invert_btn = createButton("Invert Colors");
        invert_btn.parent(filtersDiv);

        opaque_btn = createButton("Opaque");
        opaque_btn.parent(filtersDiv);

        erode_btn = createButton("Erode");
        erode_btn.parent(filtersDiv);

        dilate_btn = createButton("Dilate");
        dilate_btn.parent(filtersDiv);
    };

    //creates a div in the help menu under Help button for information on how to use the tool
	this.help = () => {
		//select help div from index.html
		const HelpMenu = select(".help");
		//creates a div with information on how to use the tool
		help_Div = createDiv("&#8226This tool applies pre-defined p5js filters to canvas such as Blur, Greyscale and Inverted colours.<br>&#8226 The Blur effect takes time to load, please be patient &#128522" );
		//set helpmenu div as a parent to the help text
		help_Div.parent(HelpMenu);
	};

    //if the tool in unselected
    this.unselectTool = () => {
        //remove the filterDiv along with the buttons
        filtersDiv.remove();

        //remove help_Div from help menu once tool is unselected
        help_Div.remove();
    };
}