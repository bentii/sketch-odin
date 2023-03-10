let btn;

window.onload = grid();

function gridSizeMeter() {
  const gridSizer = document.getElementById("gridSize").value;
  document.getElementById("gridSizeMeter").innerHTML = gridSizer;
}

function removeGrid() {
  const grid = document.querySelector("#main-container");
  grid.innerHTML = "";
}

function grid() {
  const mainContainer = document.querySelector("#main-container");
  const gridSizeValue = document.getElementById("gridSize").value;
  const backgroundColor = document.getElementById("backgroundColor").value;

  removeGrid();

  let numGridTotal = gridSizeValue ** 2;
  for (let i = 0; i < numGridTotal; i++) {
    const blockGrid = document.createElement("div");
    blockGrid.classList.add("blockGrid");
    mainContainer.appendChild(blockGrid);
    blockGrid.style.width = `${16 / gridSizeValue}cm`;
    blockGrid.style.height = `${16 / gridSizeValue}cm`;
    blockGrid.style.backgroundColor = backgroundColor;
    blockGrid.addEventListener("mouseover", changeMainColor);
  }
}

function clickBtn(idBtn) {
  btn = idBtn.id;
}

function changeMainColor(e) {
  const color = document.getElementById("mainColor").value;
  let randomColor = Math.floor(Math.random() * 16777215).toString(16);
  let x = RGBToHex(e.target.style.backgroundColor);
  e.target.className = e.target.style.backgroundColor;

  if (btn == "rainbow") {
    e.target.style.backgroundColor = `#${randomColor}`;
  } else if (btn == "darker") {
    e.target.style.backgroundColor = colorShader(x, -30);
  } else if (btn == "lighter") {
    e.target.style.backgroundColor = colorShader(x, 30);
  }else {
    e.target.style.backgroundColor = color;
  }
}

function changeBackColor() {
  const color = document.getElementById("backgroundColor").value;
  const item = document.getElementsByClassName("blockGrid");
  for (let i = 0; i < item.length; i++) {
    item[i].style.backgroundColor = color;
  }
}

//Funçao roubada
function colorShader(hexColor, magnitude) {
  hexColor = hexColor.replace(`#`, ``);
  if (hexColor.length === 6) {
    const decimalColor = parseInt(hexColor, 16);
    let r = (decimalColor >> 16) + magnitude;
    r > 255 && (r = 255);
    r < 0 && (r = 0);
    let g = (decimalColor & 0x0000ff) + magnitude;
    g > 255 && (g = 255);
    g < 0 && (g = 0);
    let b = ((decimalColor >> 8) & 0x00ff) + magnitude;
    b > 255 && (b = 255);
    b < 0 && (b = 0);
    let x = `${(g | (b << 8) | (r << 16)).toString(16)}`;
    while([...x].length < 6){
      x = "0" + x;
    }
    return '#' + x;
  } else {
    return hexColor;
  }
}

// Funçao Roubada
function RGBToHex(rgb) {
  // Choose correct separator
  let sep = rgb.indexOf(",") > -1 ? "," : " ";
  // Turn "rgb(r,g,b)" into [r,g,b]
  rgb = rgb.substr(4).split(")")[0].split(sep);

  let r = (+rgb[0]).toString(16),
    g = (+rgb[1]).toString(16),
    b = (+rgb[2]).toString(16);

  if (r.length == 1) r = "0" + r;
  if (g.length == 1) g = "0" + g;
  if (b.length == 1) b = "0" + b;
  b = (+rgb[2]).toString(16);

  if (r.length == 1) r = "0" + r;
  if (g.length == 1) g = "0" + g;
  if (b.length == 1) b = "0" + b;
  return "#" + r + g + b;
}