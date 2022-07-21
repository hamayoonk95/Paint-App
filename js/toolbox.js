//container object for storing the tools. Functions to add new tools and select a tool
function Toolbox() {

	const self = this;

	this.tools = [];
	this.selectedTool = null;

	const toolbarItemClick = function() {
		//remove any existing borders
		let items = selectAll(".sideBarItem");
		for (let i = 0; i < items.length; i++) {
			items[i].style('border', '0');
		}

		const toolName = this.id().split("sideBarItem")[0];
		self.selectTool(toolName);
		

		//call loadPixels to make sure most recent changes are saved to pixel array
		loadPixels();
	};

	//add a new tool icon to the html page
	const addToolIcon = (icon, name) => {
		let sideBarItem = createDiv("<img style= height:40px;width:40px;border-radius:50%; src='" + icon + "'></div>");
		sideBarItem.class("sideBarItem");
		sideBarItem.id(name + "sideBarItem");
		sideBarItem.parent("sidebar");

		//rounded borders for icons
		sideBarItem.style("border-radius","50%");
		
		//cursor as pointer when hovered over icons
		sideBarItem.style("cursor","pointer");
		sideBarItem.mouseClicked(toolbarItemClick);

	};

	//add a tool to the tools array
	this.addTool = tool => {
		//check that the object tool has an icon and a name
		if (!tool.hasOwnProperty("icon") || !tool.hasOwnProperty("name")) {
			alert("make sure your tool has both a name and an icon");
		}
		this.tools.push(tool);
		addToolIcon(tool.icon, tool.name);
		//if no tool is selected (ie. none have been added so far)
		//make this tool the selected one.
		if (this.selectedTool === null) {
			this.selectTool(tool.name);
		}
	};

	this.selectTool = toolName => {
		//search through the tools for one that's name matches
		//toolName
		for (let i = 0; i < this.tools.length; i++) {
			if (this.tools[i].name == toolName) {
				//if the tool has an unselectTool method run it.
				if (this.selectedTool != null && this.selectedTool.hasOwnProperty(
						"unselectTool")) {
					this.selectedTool.unselectTool();
				}
				//select the tool and highlight it on the toolbar
				this.selectedTool = this.tools[i];

				//if selected tool is shapes tool then call addShape() from shapes constructor and add shapes into options
				if(this.selectedTool.name === "shapes")
				{
					this.selectedTool.addShape(new CircleTool());
					this.selectedTool.addShape(new EllipseTool());
					this.selectedTool.addShape(new LineToTool);
					this.selectedTool.addShape(new RectTool());
					this.selectedTool.addShape(new SquareTool());
					this.selectedTool.addShape(new StarTool());
					this.selectedTool.addShape(new TriangleTool());
				}

				//if selected tool is effects then call addEffects() from effects tool which add buttons into options 
				if(this.selectedTool.name === "effects")
				{
					this.selectedTool.addEffect();
				}

				select("#" + toolName + "sideBarItem").style("border", "2px solid blue");

				//if the tool has an options area. Populate it now.
				if (this.selectedTool.hasOwnProperty("populateOptions")) {
					this.selectedTool.populateOptions();
				}

				//if the tool has a help function, call it
				if(this.selectedTool.hasOwnProperty("help")) {
					this.selectedTool.help();
				}
			}
		}
	};


}
