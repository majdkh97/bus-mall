/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
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
let arrayofNames = [];
let button1 = document.getElementById('Results');
let arrayOfTest=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

function Products(name,source){
  this.name=name;
  this.source = source;
  this.votes = 0;
  this.seen = 0;
  this.shown = false;
  arrayofProducts.push(this);
  arrayofNames.push(this.name);
}

let arrayOfVotes =[];
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
  while(arrayofProducts[leftIndex].shown===true)
    leftIndex=generateRandomIndex();
  while(middleIndex===leftIndex || arrayofProducts[middleIndex].shown===true){
    middleIndex=generateRandomIndex();
  }
  while(rightIndex===middleIndex || rightIndex === leftIndex || arrayofProducts[rightIndex].shown===true){
    rightIndex=generateRandomIndex();
  }

  for(let i = 0 ; i <arrayofProducts.length;i++)
    arrayofProducts[i].shown=false;

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
      arrayOfVotes[leftIndex]=(arrayofProducts[leftIndex].votes);
      arrayOfTest[leftIndex] += 1;
      console.log(arrayOfVotes);
    }
    else if(event.target.id ==='middle-image')
    {
      arrayofProducts[middleIndex].votes++;
      arrayOfVotes[middleIndex]=(arrayofProducts[middleIndex].votes);
      arrayOfTest[middleIndex] += 1;
      console.log(arrayOfVotes);
    }
    else if(event.target.id ==='right-image')
    {
      arrayofProducts[rightIndex].votes++;
      arrayOfVotes[rightIndex]=(arrayofProducts[rightIndex].votes);
      arrayOfTest[rightIndex] += 1;
      console.log(arrayOfVotes);
    }
    localStorage.setItem('Names',JSON.stringify(arrayofNames));
    // localStorage.setItem('Votes',JSON.stringify(arrayOfVotes));
    saveToLs();
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

function saveToLs(){
  // console.log(Coffee.drinks);
  // console.log(JSON.stringify(Coffee.drinks));
  let arrStr = JSON.stringify(arrayOfTest);
  localStorage.setItem('Votes', arrStr);
}

let arrOfVotes = [];
let arrOfSeen = [];

function renderList(){
  let ul = document.getElementById('List');
  for(let i = 0 ; i < arrayofProducts.length;i++){
    arrOfVotes.push(arrayofProducts[i].votes);
    arrOfSeen.push(arrayofProducts[i].seen);
    let li = document.createElement('li');
    ul.appendChild(li);
    li.textContent = `${arrayofProducts[i].name} had ${arrayofProducts[i].votes} Votes and was seen ${arrayofProducts[i].seen} times `;
  }
  console.log(arrayOfTest);
  button1.removeEventListener('click',renderList);
  let ctx = document.getElementById('myChart').getContext('2d');
  let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: arrayofNames,
      datasets: [{
        label: '# of Votes',
        data: arrOfVotes,
        backgroundColor: [
          'red',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1
      },{
        label:'# of Seen',
        data:arrOfSeen,
        backgroundColor: [
          'blue',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1
      }]
    },
  });
}

function votesLS(){
  let data = localStorage.getItem('Votes');
  let voteLs = JSON.parse(data);
  if(voteLs!==null)
    arrayOfTest=voteLs;
}

votesLS();

