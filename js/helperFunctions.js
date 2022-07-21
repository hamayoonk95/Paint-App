function HelperFunctions() {

	//************************************//
	//   Event Handler for clear button   //
	//          Clears Canvas             //
	//************************************//
	select("#clearButton").mouseClicked(() => {
		//turn the background back to white
		background(255);
		//call loadPixels to update the drawing state
		loadPixels();
	});

	//************************************//
	//   Event Handler for save button    //
	//    Saves images on local system    //
	//************************************//
	select("#saveImageButton").mouseClicked(() => {
		saveCanvas('newcanvas', 'jpg');
	});


	//*******************************//
	//   Upload images onto canvas   //
	//      File Input Handler       //
	//*******************************//

	// stores fileInput DOM element in a variable
	const fileInput = select("#fileinput");

		//event listener on change to fileInput i.e. when file is uploaded. 
		fileInput.changed(pic => {
			//if file is uploaded to the element
			if (pic.target.files) {
				//save the first uploaded file from the event to file variable
				const file = pic.target.files[0];
	
				//file reader object allows web apps to read contents of files
				const reader = new FileReader();
				//this method reads content of the file and return binary data as strings
				reader.readAsDataURL(file);
	
				//when filereader has loaded the file
				reader.onloadend = e => {
	
					//javascript image constructor creating new image element onto canvas
					const uploaded_Image = new Image();
					//image source to be the result of uploaded image
					uploaded_Image.src = e.target.result;
					//javascript image onload event handler to draw image onto canvas
					uploaded_Image.onload = () => {
						//drawing the image onto canvas
						ctx.drawImage(uploaded_Image, 0, 0, uploaded_Image.width, uploaded_Image.height);
					};
	
				};
			}
		});

	//*********************************************//
	//   Creates slider for stroke  and Font Size  //
	//                                             //
	//*********************************************//

	//select options div
	const optionsDiv = select(".options");

	//create a div and slider for stroke size and set optionsdiv as its parent
	const stroke_Div = createDiv("Stroke Size:");
	stroke_Div.id("strokeSlider");
	this.stroke_Slider = createSlider(1, 50, 1, 1);
	stroke_Div.parent(optionsDiv);
	this.stroke_Slider.parent(stroke_Div);


	//*********************************************//
	// 				  HELP BUTTON    			   //
	//  contains information on how to use the app //
	//*********************************************//

	//select helpButton and helpDiv
	const help_Button = select("#helpButton");
	const help_div = select(".help");

	//if helpButton is clicked and helpdiv does not have active class then add active class from css to it 
	help_Button.mouseClicked(() => {
		if (!help_div.hasClass("active")){
			help_div.addClass("active");
			help_Button.html("Close Help");
		}
		else {
			help_div.removeClass("active");
			help_Button.html("Help");
		}
	});




	//*********************************************//
	// 			UNDO and REDO functions    		   //
	// 		Undo and redo previous drawing		   //
	//*********************************************//

	//this constructor creates stack data structure for undo/redo implementation
	function Stack() {
		this.arr = [];

		//push method to add data to the end of the stack
		this.push = function (e) {
			this.arr.push(e);
		};

		//peek method to access the last element of the stack only
		this.peek = function () {
			return this.arr[this.arr.length - 1];
		};

		//pop method to remove the last element of the stack 
		this.pop = function () {
			if (this.arr.length == 0) {
				return "Stack underflow";
			} else {
				return this.arr.pop();
			}
		};

		//check if the stack is empty
		this.isEmpty = function () {
			return this.arr.length == 0;
		};
	}

	//stack data structure to store canvas states as images for undo and redo
	let undoStack = new Stack();
	let redoStack = new Stack();

	// the moment mouse is detected on canvas, push the state of canvas as an image into undoStack
	c.mousePressed(() => {
		undoStack.push(c.elt.toDataURL());
	});

	//if undo button is clicked
	select("#undoButton").mouseClicked(() => {
		// if undoStack is not empty then push the state of canvas as image into redoStack
		if (!undoStack.isEmpty()) {
			redoStack.push(c.elt.toDataURL());
		}


		// if undoStack is empty
		// return
		if (undoStack.isEmpty()) {
			return;
		}
		
		//create a new image element using javascript image constructor
		const screenShot = new Image();
		//set the source of the image to the last item saved in undoStack
		screenShot.src = undoStack.peek();
		//when image loads
		screenShot.onload = () => {
			//draw the image on canvas with specified source and destination parameters 
			ctx.drawImage(screenShot, 0, 0, screenShot.width, screenShot.height, 0, 0, c.width, c.height);
		};

		//if undoStack is not empty then remove the last image saved in the stack
		if (!undoStack.isEmpty()) {
			undoStack.pop();
		}
	});


	//if redo button is clicked
	select("#redoButton").mouseClicked(() => {
		//if redoStack is not empty
		if (!redoStack.isEmpty()) {
			//create a new image element using javascript image constructor
			const screenShot = new Image();
			//define the source of the image to the last item saved in redoStack
			screenShot.src = redoStack.peek();
			//when image loads
			screenShot.onload = () => {
				//draw the image on canvas with specified source and destination parameters 
				ctx.drawImage(screenShot, 0, 0, screenShot.width, screenShot.height, 0, 0, c.width, c.height);
			};
		}

		//pop the image from the stack once its drawn to canvas
		redoStack.pop();
	});

}