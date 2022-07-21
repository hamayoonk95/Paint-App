function ShapesTool() {
    this.name = "shapes";
    this.icon = "assets/icons/shapes.jpg";

    //help div
    let help_Div;

    const self = this;

    this.tools = [];
    this.selectedTool = null;

    //calls the draw function of the selected shape
    this.draw = function () {
        this.selectedTool.draw();
    };


    this.addShape = tool => {
        //check that the object tool has an icon and a name
        if (!tool.hasOwnProperty("icon") || !tool.hasOwnProperty("name")) {
            alert("make sure your tool has both a name and an icon");
        }
        this.tools.push(tool);
        // this.selectedTool = this.tools[0];
        addToolIcon(tool.icon, tool.name);
        // if no tool is selected (ie. none have been added so far)
        // make this tool the selected one.
        if (this.selectedTool == null) {
            this.selectTool(tool.name);
        }
    };

    //add a new tool icon to the html page
    const addToolIcon = (icon, name) => {
        let shapesitem = createDiv("<img style= width:50px;height:50px;border-radius:50%; src='" + icon + "'></div>");
        shapesitem.parent("shapesDiv");
        shapesitem.class("shapes");
        shapesitem.id(name + "shape");
        shapesitem.style("border-radius","50%");
        shapesitem.style("cursor","pointer");
        shapesitem.mouseClicked(toolbarItemClick);
    };

    this.selectTool = toolName => {
        for (let i = 0; i < this.tools.length; i++) {
            if (this.tools[i].name == toolName) {
                if (this.selectedTool != null && this.selectedTool.hasOwnProperty("unselectTool")) {
                    this.selectedTool.unselectTool();
                }
                this.selectedTool = this.tools[i];

                select("#" + toolName + "shape").style("border", "2px solid blue");
                //if the tool has an options area. Populate it now.
                if (this.selectedTool.hasOwnProperty("populateOptions")) {
                    this.selectedTool.populateOptions();
                }
            }
        }
    };

    const toolbarItemClick = function () {
        //remove any existing borders
        const items = selectAll(".shapes");
        for (let i = 0; i < items.length; i++) {
            items[i].style('border', '0');
        }

        const toolName = this.id().split("shape")[0];
        self.selectTool(toolName);


        //call loadPixels to make sure most recent changes are saved to pixel array
        loadPixels();
    };

    //creates a div in the help menu under Help button for information on how to use the tool
	this.help = () => {
		//select help div from index.html
		const HelpMenu = select(".help");
		//creates a div with information on how to use the tool
		help_Div = createDiv("&#8226 The shapes tool adds tools to the bottom of the html page in the div with the class .options. <br> &#8226 After selecting Shapes Tool, click on any of the tools at the bottom of the page to draw different shapes on canvas using mouse. <br> &#8226 The shapes include Circle, Ellipse, Rectangle, Square, Star and Triangles");
		//set helpmenu div as a parent to the help text
		help_Div.parent(HelpMenu);
	};

    this.unselectTool = () => {
        //clear options
        select(".shapesDiv").html("");

        //remove help_Div from help menu once tool is unselected
        help_Div.remove();
    };
}