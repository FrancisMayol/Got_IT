let lostItems = JSON.parse(localStorage.getItem("lost")) || [];
let foundItems = JSON.parse(localStorage.getItem("found")) || [];

// Lost item form submission
if(document.getElementById("lostForm")){
  document.getElementById("lostForm").addEventListener("submit", function(e){
    e.preventDefault();
    const fileInput = document.getElementById("itemImage");
    const reader = new FileReader();

    reader.onload = function(){
      let item = {
        name: document.getElementById("name").value,
        location: document.getElementById("location").value,
        contact: document.getElementById("contact").value,
        image: reader.result
      };
      lostItems.push(item);
      localStorage.setItem("lost", JSON.stringify(lostItems));
      alert("Lost item reported");
      document.getElementById("lostForm").reset();
    }

    if(fileInput.files[0]){
      reader.readAsDataURL(fileInput.files[0]);
    } else {
      reader.onload();
    }
  });
}

// Found item form submission
if(document.getElementById("foundForm")){
  document.getElementById("foundForm").addEventListener("submit", function(e){
    e.preventDefault();
    const fileInput = document.getElementById("itemImage");
    const reader = new FileReader();

    reader.onload = function(){
      let item = {
        name: document.getElementById("name").value,
        location: document.getElementById("location").value,
        contact: document.getElementById("contact").value,
        image: reader.result
      };
      foundItems.push(item);
      localStorage.setItem("found", JSON.stringify(foundItems));
      alert("Found item reported");
      document.getElementById("foundForm").reset();
    }

    if(fileInput.files[0]){
      reader.readAsDataURL(fileInput.files[0]);
    } else {
      reader.onload();
    }
  });
}

// Search function
function searchItem(){
  let keyword = document.getElementById("searchInput").value.toLowerCase();
  let results = document.getElementById("results");
  results.innerHTML = "";

  lostItems.forEach(item => {
    if(item.name.toLowerCase().includes(keyword)){
      results.innerHTML += createItemCard(item, "Lost");
    }
  });

  foundItems.forEach(item => {
    if(item.name.toLowerCase().includes(keyword)){
      results.innerHTML += createItemCard(item, "Found");
    }
  });
}

// Admin panel functions
function loadLost(){
  let container = document.getElementById("adminResults");
  container.innerHTML = "";
  lostItems.forEach(item => {
    container.innerHTML += createItemCard(item, "Lost");
  });
}

function loadFound(){
  let container = document.getElementById("adminResults");
  container.innerHTML = "";
  foundItems.forEach(item => {
    container.innerHTML += createItemCard(item, "Found");
  });
}

// Helper: create item card
function createItemCard(item, type){
  return `<div class="item-card">
    ${item.image ? `<img src="${item.image}" alt="${item.name}">` : ''}
    <div class="item-info">
      <b>${type}:</b> ${item.name} <br>
      <b>Location:</b> ${item.location} <br>
      <b>Contact:</b> ${item.contact}
    </div>
  </div>`;
}