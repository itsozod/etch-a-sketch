// Default values of the grid the and color that will draw
let color = 'black'; // default color
let currentSize = 16; // default size of the grid
let currentColor = '#177777'; // default color of the color picker

// Query selectors
const gridContainer = document.querySelector(".grid-container");
const blackBtn = document.querySelector('#blackBtn');
const randomBtn = document.querySelector('#randomBtn');
const eraserBtn = document.querySelector('#eraserBtn');
const clearBtn = document.querySelector('#clearBtn');
const updateSize = document.querySelector('.updateSize');
const sizeShow = document.querySelector('.sizeShow');
const universal = document.querySelector('.universal');
const colorPicker = document.querySelector('#colorPicker');
const info = document.querySelector('.info');
const year = document.querySelector('#current-year');

// UI
function createGrid(gridNumber) {
    gridContainer.style.gridTemplateColumns = `repeat(${gridNumber}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${gridNumber}, 1fr)`;
    blackBtn.classList.add('active');

    let gridArea = gridNumber * gridNumber;
    for (let i = 0; i < gridArea; i++) {
        let gridItem = document.createElement('div');
        gridContainer.appendChild(gridItem);
        gridItem.style.backgroundColor = "white";
    }
    
    let gridItems = gridContainer.querySelectorAll('div');
    gridItems.forEach(gridItem => gridItem.addEventListener("mouseover", changeColor));
}

// function to change the colors and buttons
function changeColor() {
    if (blackBtn || randomBtn || eraserBtn) {
        if (blackBtn && color === 'black') {
            randomBtn.classList.remove('active');
            eraserBtn.classList.remove('active');
            universal.classList.remove('active');
            blackBtn.classList.add('active');
            this.style.backgroundColor = 'black';
        } else if (randomBtn && color === 'random') {
            blackBtn.classList.remove('active');
            randomBtn.classList.add('active');
            eraserBtn.classList.remove('active');
            universal.classList.remove('active');
            this.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        } else if (eraserBtn && color === 'white') {
            eraserBtn.classList.add('active');
            blackBtn.classList.remove('active');
            randomBtn.classList.remove('active');
            universal.classList.remove('active');
            this.style.backgroundColor = "white";
        }
    }

    this.style.backgroundColor = color;
}

// Buttons
blackBtn.addEventListener("click", function() {
    color = 'black';
    blackBtn.classList.add('active');
    randomBtn.classList.remove('active');
    eraserBtn.classList.remove('active');
    universal.classList.remove('active');
});

randomBtn.addEventListener("click", function() {
    color = "random";
    blackBtn.classList.remove('active');
    randomBtn.classList.add('active');
    eraserBtn.classList.remove('active');
    universal.classList.remove('active');
});

eraserBtn.addEventListener("click", function() {
    color = "white";
    blackBtn.classList.remove('active');
    randomBtn.classList.remove('active');
    eraserBtn.classList.add('active');
    universal.classList.remove('active');
});

// Clear Button to return everything back to default
function clearGrid() {
    gridContainer.innerHTML = '';
    color = 'black';
    createGrid(currentSize); // Re-create the grid
    randomBtn.classList.remove('active');
    eraserBtn.classList.remove('active');
    universal.classList.remove('active');
}

clearBtn.addEventListener("click", clearGrid);


// Function to change the value of the slider and display it
sizeShow.addEventListener("mousemove", function(e) {
    updateSizeValue(e.target.value);
  });
sizeShow.oninput = function(e) {
    changeSize(e.target.value);
};

// function to update and display the value of grids
function updateSizeValue(value) {
    if (`${value} x ${value}` === "1 x 1") {
        info.innerHTML = "This is the smallest value!";
    } else if (`${value} x ${value}` === "64 x 64") {
        info.innerHTML = "This is the largest value!";
    } else {
        info.innerHTML = "Smallest to largest value...";
    }
    updateSize.innerHTML = `${value} x ${value}`;
}

function changeSize(value) {
    setCurrentSize(value);
    updateSizeValue(value);
    reloadGrid();
}

function setCurrentSize(value) {
    currentSize = value;
}

// function to reload grid everytime after choosing the new size and display it with the new size
function reloadGrid() {
    clearGrid();
    createGrid(currentSize);
}

// Color Picker button to pick whatever color you like
universal.addEventListener("click", universalBtn);

function universalBtn() {
color = currentColor;
universal.classList.add('active');
blackBtn.classList.remove('active');
randomBtn.classList.remove('active');
eraserBtn.classList.remove('active');
}

// Function to pick and use a color from color picker
function userColorSelection(e) {
    color = e.target.value;
}
colorPicker.addEventListener("change", userColorSelection, false);
colorPicker.addEventListener("input", userColorSelection, false);

// Function to detect a year
year.innerHTML = new Date().getFullYear();

// This is the createGrid function that we created in the beggining, we call in the bottom of all our codes
createGrid(16); 


