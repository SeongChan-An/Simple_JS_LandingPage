// 캡틴판교 : https://joshua1988.github.io/web-development/javascript/js-async-await/    
// Fetch the items from the JSON file
function loadItems() {
  let dataUrl = "data/data.json";
  return fetch(dataUrl)
  .then( response => response.json() )
  .then( json => {
    // console.log(json)
    return json.items;
  });
}

// Create HTML list item from the fiven data item
function createHTMLString(item) {
  return `
    <li class="item">
      <img src="${item.image}" alt="${item.type}" class="item__thumbnail">
      <span class="item__description">${item.gender}, ${item.size}</span>
    </li>
  `;
}

// Update the list with the given items
function displayItems(items) {
  const container = document.querySelector(".items");
  container.innerHTML = items.map(item => createHTMLString(item)).join("");
}

// main 
async function main() {
  try {
    let items = await loadItems();
    console.log(items);
    displayItems(items);
    setEventListeners(items);
  } catch (error) {
    console.log(error);
  }
}

function onButtonClick(event, items) {
  // console.log(event.target.dataset.key);
  // console.log(event.target.dataset.value);
  const dataset = event.target.dataset;
  const key = dataset.key;
  const value = dataset.value;

  if (key == null || value == null) {
    return;
  }

  const filtered = items.filter(item => item[key] === value);
  console.log(filtered);
  displayItems(filtered);
  // updateItems(items, key, value);
}

// function updateItems(items, key, value) {  
//   items.forEach(item => {
//     const li = item.querySelector("li") 
//     if (item.dataset[key] === value) {
//       console.log("add")
//       li.classList.add("invisible");
//     } else {      
//       console.log("remove")
//       li.classList.remove("invisible");
//     }
//   });
// }

function setEventListeners(items) {
  const logo = document.querySelector(".logo");
  const buttons = document.querySelector(".buttons");
  logo.addEventListener("click", () => displayItems(items));
  buttons.addEventListener("click", event => onButtonClick(event, items));
}

// loadItems()
//   .then(items => {
//     console.log(items);
//     displayItems(items);
//     setEventListeners(items);
//   })
//   .catch(console.log);

main();