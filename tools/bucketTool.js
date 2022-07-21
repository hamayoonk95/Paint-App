function BucketTool() {
  //set an icon and a name for the object
  this.icon = "assets/icons/bucket.png";
  this.name = "Bucket";

  let help_Div;

  this.draw = () => {

    cursor("assets/cursors/bucket.cur");
    //if mouse is clicked on canvas, call flood fill function
    c.mouseClicked(() => {
      floodFill(mouseX, mouseY);
    })
  };

  const floodFill = (xPos, yPos) => {
    let stack = [];
    let pixelList = [];

    //position of initial mouse position as object key/value pair 
    let first = {
      'x': xPos,
      'y': yPos
    };
    //push position object in stack
    stack.push(first);

    //assigns a value of 1 to the first coordinates 
    pixelList[getKey(first)] = 1;

    //loads pixel data to be manipulated
    loadPixels();

    //get the colour of where mouse was clicked
    const oldcolor = get(xPos, yPos);
    while (stack.length > 0) {
      //removes element at the end of the array and saves it into pos1
      const pos1 = stack.pop();
      //sets the colour of pos1 to r,g,b values of selectedcolour from colorpalette
      set(pos1.x, pos1.y, color(colourP.selectedColour));


      //these variables saves the position of all the pixel positions in all four direction from where mouse was clicked
      
      //pixels above the mouseClick
      const up = {
        'x': pos1.x,
        'y': pos1.y - 1
      };
      //pixels below the mouseClick
      const dn = {
        'x': pos1.x,
        'y': pos1.y + 1
      };
      //pixels to the left of mouseCLick
      const le = {
        'x': pos1.x - 1,
        'y': pos1.y
      };
      //pixels to the right of mouseclick
      const ri = {
        'x': pos1.x + 1,
        'y': pos1.y
      };

      //checks the pixels coordinates and pushes them into stack and gives them a value to 1 if they have same color
      const addPixelToDraw = pos => {
        if (checkPixel(pos, pixelList)) {
          stack.push(pos);
          pixelList[getKey(pos)] = 1;
        }
      };

      //checks pixels in all for directions to see if their colors match the color of where mouse was clicked and calls addPixeltoDraw to push them into stack 
      if (0 <= up.y && up.y < height && matchColour(up, oldcolor)) {
        addPixelToDraw(up);
      }
      if (0 <= dn.y && dn.y < height && matchColour(dn, oldcolor)) {
        addPixelToDraw(dn);
      }
      if (0 <= le.x && le.x < width && matchColour(le, oldcolor)) {
        addPixelToDraw(le);
      }
      if (0 <= ri.x && ri.x < width && matchColour(ri, oldcolor)) {
        addPixelToDraw(ri);
      }

    }
    //updates the window with the changed pixles
    updatePixels();


  };

  //matches colours of current pixel to the colour of all the pixels around it
  const matchColour = (pos, oldColour) => {
    //gets the colors of pixels around the pixel where mouse was clicked to match
    let current = get(pos.x, pos.y);
    //returns true if all pixels have the same colour until it finds a boundary where it returns false
    return (current[0] === oldColour[0] && current[1] === oldColour[1] &&
      current[2] === oldColour[2] && current[3] === oldColour[3]);
  };

  //returns position x and y as pair
  const getKey = pos => {
    return pos.x + "," + pos.y;
  };

  //check if each pixel is given a value of 1 to determine if the color needs to be changed
  const checkPixel = (pos, positionSet) => {
    return !positionSet.hasOwnProperty(getKey(pos));
  };


  //creates a div in the help menu under Help button for information on how to use the tool
  this.help = () => {
      //select help div from index.html
      const HelpMenu = select(".help");
      //creates a div with information on how to use the tool
      help_Div = createDiv("&#8226 The Bucket tool fills an area or a shape based on colour similarity. <br> &#8226 It matches the colors of the current pixel where mouse is clicked with all the adjacent pixels and changes its colour to the selected colour from Colour Palette Tool. <br> &#8226 The tool works quickly when filling shapes however, while using it on the whole canvas can take a few seconds so please be patient.");
      //set helpmenu div as a parent to the help text
      help_Div.parent(HelpMenu);
  };

  
  //if this tool is unselected
  this.unselectTool = () => {
    //set cursor back to AUTO
    cursor(AUTO);
    //remove help_Div from help menu once tool is unselected
    help_Div.remove();

    //mouseClicked event false
    c.mouseClicked(false);
  };

}