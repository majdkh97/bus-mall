'use strict';

let leftImg = document.getElementById('left-image');
let middleImg = document.getElementById('middle-image');
let rightImg = document.getElementById('right-image');
let leftIndex;
let middleIndex;
let rightIndex;
let counter = 0;
let maxAttempts = 25;
let arrayofProducts = [];
let button1 = document.getElementById('Results');

function Products(name,source){
  this.name=name;
  this.source = source;
  this.votes = 0;
  this.seen = 0;
  this.shown = false;
  arrayofProducts.push(this);
}


new Products('bag','../img/bag.jpg');
new Products('banana','../img/banana.jpg' );
new Products('bathroom','../img/bathroom.jpg' );
new Products('boots','../img/boots.jpg' );
new Products('bubblegum','../img/bubblegum.jpg' );
new Products('chair','../img/chair.jpg' );
new Products('cthulhu','../img/cthulhu.jpg' );
new Products('dog-duck','../img/dog-duck.jpg' );
new Products('dragon','../img/dragon.jpg' );
new Products('pet-sweep','../img/pet-sweep.jpg' );
new Products('scissors','../img/scissors.jpg' );
new Products('shark','../img/shark.jpg' );
new Products('sweep','../img/sweep.png' );
new Products('tauntaun','../img/tauntaun.jpg' );
new Products('unicorn','../img/unicorn.jpg' );
new Products('usb','../img/usb.gif' );
new Products('water-can','../img/water-can.jpg' );
new Products('wine-glass','../img/wine-glass.jpg' );


function generateRandomIndex(){
  return Math.floor(Math.random() *arrayofProducts.length);
}

function renderImgs(){
  leftIndex = generateRandomIndex();
  middleIndex = generateRandomIndex();
  rightIndex = generateRandomIndex();

  if(leftIndex === middleIndex || leftIndex === rightIndex)
  {
    leftIndex = generateRandomIndex();
  }
  else if (rightIndex === middleIndex || rightIndex === leftIndex)
  {
    rightIndex = generateRandomIndex();
  }
  else if (middleIndex === leftIndex || middleIndex === rightIndex)
  {
    middleIndex = generateRandomIndex();
  }

  leftImg.src = arrayofProducts[leftIndex].source;
  middleImg.src = arrayofProducts[middleIndex].source;
  rightImg.src = arrayofProducts[rightIndex].source;
  arrayofProducts[leftIndex].seen++;
  arrayofProducts[middleIndex].seen++;
  arrayofProducts[rightIndex].seen++;
  arrayofProducts[leftIndex].shown=true;
  arrayofProducts[middleIndex].shown=true;
  arrayofProducts[rightIndex].shown=true;

  console.log(arrayofProducts);
}

renderImgs();

leftImg.addEventListener('click',handleClicking);
middleImg.addEventListener('click',handleClicking);
rightImg.addEventListener('click',handleClicking);
function handleClicking(event){
  counter++;
  console.log(counter);
  if(maxAttempts>=counter)
  {
    if(event.target.id ==='left-image')
    {
      arrayofProducts[leftIndex].votes++;
    }
    else if(event.target.id ==='middle-image')
    {
      arrayofProducts[middleIndex].votes++;
    }
    else if(event.target.id ==='right-image')
    {
      arrayofProducts[rightIndex].votes++;
    }
    arrayofProducts[leftIndex].shown=false;
    arrayofProducts[middleIndex].shown=false;
    arrayofProducts[rightIndex].shown=false;
    renderImgs();
  }
  else
  {
    button1.addEventListener('click',renderList);
    leftImg.removeEventListener('click', handleClicking);
    middleImg.removeEventListener('click', handleClicking);
    rightImg.removeEventListener('click', handleClicking);
  }
}

function renderList(){
  let ul = document.getElementById('List');
  for(let i = 0 ; i < arrayofProducts.length;i++){
    let li = document.createElement('li');
    ul.appendChild(li);
    li.textContent = `${arrayofProducts[i].name} had ${arrayofProducts[i].votes} Votes and was seen ${arrayofProducts[i].seen} times `;
  }
}
