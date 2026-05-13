async function bubbleSort(arr) {
  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < (arr.length - i - 1); j++) {

      const elem1 = document.getElementById(arr[j]);
      const elem2 = document.getElementById(arr[j+1]); 

      if (arr[j] > arr[j + 1]) {
        swap(elem1, elem2, j, j+1); 
        await finish(elem1, elem2); 
        var temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      } else {
        await skip(elem1, elem2); 
      }

    }
  }
}

async function insertionSort(arr) {
  for (var i = 1; i < arr.length; i++) {
    var j = i;
    while (j != 0 && arr[j] < arr[j - 1]) {

      const elem1 = document.getElementById(arr[j-1]);
      const elem2 = document.getElementById(arr[j]);

      swap(elem1, elem2, j-1, j);
      await finish(elem1, elem2);

      var temp = arr[j];
      arr[j] = arr[j - 1];
      arr[j - 1] = temp;
      j -= 1;

    } 
  }
}

async function selectionSort(arr) {
  for (var i = 0; i < arr.length; i++) {

    console.log(arr.slice());

    var target = arr[i];
    var index = i;
    for (var j = i; j < arr.length; j++) {
      if (arr[j] < target) {
        target = arr[j];
        index = j;
      }
    }

    const elem1 = document.getElementById(arr[i]);
    const elem2 = document.getElementById(arr[index]);

    swap(elem1, elem2, i, index);
    await finish(elem1, elem2);

    var temp = arr[i]; //first 
    arr[i] = target; //target 
    arr[index] = temp;

  }
}

function swap(elem1, elem2, i, index) {

  elem1.classList.remove("move");
  elem2.classList.remove("move");

  elem1.style.backgroundColor = "rgb(116, 106, 179)";
  elem2.style.backgroundColor = "rgb(116, 106, 179)";

  const diff = index - i; 
  const [ before1, after1 ] = calcElem(elem1, diff);
  const [ before2, after2 ] = calcElem(elem2, -1*diff);

  elem1.style.setProperty("--from", before1);
  elem1.style.setProperty("--to", after1);
  elem2.style.setProperty("--from", before2);
  elem2.style.setProperty("--to", after2);

  requestAnimationFrame(() => requestAnimationFrame(() => {
    elem1.classList.add("move");
    elem2.classList.add("move");
  }));

}

function calcElem(elem, diff) {
  var before;
  var after;
  if (elem.style.left === "") {
    before = "0px";
    after = (diff * 75) + "px";
  } else {
    before = elem.style.left.slice(0, elem.style.left.indexOf("p"));
    after = parseInt(before) + (diff * 75);

    before = before += "px"
    after = after += "px"
  }
  return [ before, after ];
}

function finish(elem1, elem2) {
  return new Promise(resolve => {
    elem1.addEventListener("animationend", () => {
      const before1 = elem1.style.getPropertyValue("--from");
      const after1 = elem1.style.getPropertyValue("--to");
      elem1.style.left = after1;
      elem1.classList.remove("move");
      elem1.style.backgroundColor = "rgb(191, 195, 238)";
      const before2 = elem2.style.getPropertyValue("--from");
      const after2 = elem2.style.getPropertyValue("--to");
      elem2.style.left = after2;
      elem2.classList.remove("move");
      elem2.style.backgroundColor = "rgb(191, 195, 238)";
      resolve();
    }, { once: true });
  });
}

function skip(elem1, elem2) {
  return new Promise(resolve => {
    elem1.style.backgroundColor = "rgb(147, 141, 187)";
    elem2.style.backgroundColor = "rgb(147, 141, 187)";
    setTimeout(() => {
      elem1.style.backgroundColor = "rgb(191, 195, 238)";
      elem2.style.backgroundColor = "rgb(191, 195, 238)";
      resolve();
    }, 250);
  });
}

function createScreen(array) {
  createSorts(array); 
  createButtons(array);   
}

function createSorts(array) {
  for (var i = 0; i < array.length; i++) {
    const element = document.createElement("div");
    element.classList.add("box");
    element.id = array[i];

    element.style.height = (array[i] * 50) + "px";
    element.style.width = "70px";

    const sorts = document.getElementsByClassName("sorts");
    sorts[0].appendChild(element);
  }
}

function createButtons(array) {
  var buttons = document.getElementsByClassName("button");
  for (var i = 0; i < buttons.length; i++) {
    const sortType = buttons[i].id.slice(0, 1);
    if (sortType == "b") {
      buttons[i].textContent = "bubble sort";
      buttons[i].style.width = "15vw"; 
    } else if (sortType == "i") {
      buttons[i].textContent = "insertion sort";
      buttons[i].style.width = "17vw"; 
    } else if (sortType == "s") {
      buttons[i].textContent = "selection sort";
      buttons[i].style.width = "17vw"; 
    } else {
      buttons[i].textContent = "reset";
      buttons[i].style.width = "10vw"; 
    }
  }
}

// function createInfo(array) {
//   const bg = document.createElement("div");
//   bg.classList.add("popup"); 
//   bg.classList.add("hide");
//   bg.id = "bg"; 

//   const toggle = document.createElement("div"); 
//   toggle.classList.add("popup"); 
//   toggle.classList.add("hide"); 
//   toggle.id = "toggle"; 
//   toggle.textContent = "X"; 

//   const tabs = document.createElement("div"); 
//   tabs.classList.add("popup");
//   tabs.classList.add("hide");
//   tabs.id = "tabs";

//   for (var i = 0; i < array.length; i++) {
//     const tab = document.createElement("div");
//     tab.classList.add("popup");
//     tab.classList.add("hide");
//     tab.id = array[i];
//   }

//   const abouts = document.getElementsByClassName("about");
//   abouts[0].appendChild(bg);
//   abouts[0].appendChild(toggle); 
// }

function shuffleArray(array) {
  var currentIndex = array.length;
  while (currentIndex != 0) {
    var randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}

function clearScreen(array) {
  var main = document.getElementsByClassName("sorts");
  while (main[0].firstChild) {
    main[0].removeChild(main[0].firstChild);
  }
}

//START 
var array = [6, 2, 3, 5, 9, 4, 8, 7, 1];
var sorts = ["bSort", "iSort", "sSort"]; 
shuffleArray(array); 
createScreen(array); 
// createInfo(sorts); 

const bSort = document.getElementById("bSort"); 
const iSort = document.getElementById("iSort");
const sSort = document.getElementById("sSort");
const reset = document.getElementById("reset"); 
// const info = document.getElementById("info"); 
// const closeInfo = document.getElementById("toggle"); 

bSort.addEventListener("click", () => {
  bubbleSort(array);
});
iSort.addEventListener("click", () => {
  insertionSort(array);
});
sSort.addEventListener("click", () => {
  selectionSort(array);
});
reset.addEventListener("click", () => {
  clearScreen(array);
  shuffleArray(array);
  createScreen(array);
}); 
// info.addEventListener("click", () => {
//   const popups = document.getElementsByClassName("popup");
//   for (var i = 0; i < popups.length; i++) {
//     popups[i].classList.remove("hide");
//   }
// });
// closeInfo.addEventListener("click", () => {
//   const popups = document.getElementsByClassName("popup");
//   for (var i = 0; i < popups.length; i++) {
//     popups[i].classList.add("hide");
//   }
// });
bSort.addEventListener("mouseover", () => {
  bSort.style.backgroundColor = "rgb(106, 130, 179)";  
}); 
bSort.addEventListener("mouseout", () => {
  bSort.style.backgroundColor = "rgb(158, 185, 239)"; 
}); 
iSort.addEventListener("mouseover", () => {
  iSort.style.backgroundColor = "rgb(106, 130, 179)";
});
iSort.addEventListener("mouseout", () => {
  iSort.style.backgroundColor = "rgb(158, 185, 239)";
}); 
sSort.addEventListener("mouseover", () => {
  sSort.style.backgroundColor = "rgb(106, 130, 179)";
});
sSort.addEventListener("mouseout", () => {
  sSort.style.backgroundColor = "rgb(158, 185, 239)";
}); 
reset.addEventListener("mouseover", () => {
  reset.style.backgroundColor = "rgb(106, 130, 179)";
});
reset.addEventListener("mouseout", () => {
  reset.style.backgroundColor = "rgb(158, 185, 239)";
}); 
// info.addEventListener("mouseover", () => {
//   info.style.backgroundColor = "rgb(113, 106, 179)";
// });
// info.addEventListener("mouseout", () => {
//   info.style.backgroundColor = "rgb(191, 195, 238)";
// }); 
// closeInfo.addEventListener("mouseover", () => {
//   closeInfo.style.backgroundColor = "rgb(113, 106, 179)";
// });
// closeInfo.addEventListener("mouseout", () => {
//   closeInfo.style.backgroundColor = "rgb(191, 195, 238)";
// }); 