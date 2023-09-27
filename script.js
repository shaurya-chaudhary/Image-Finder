const accesskey = "SQ0oxQubp0XNSF9GYndqRGDbrh6n0uZIphQjL5gy5XY";
const form1 = document.querySelector("form");
const input1 = document.getElementById("input-search");

const searchResult = document.querySelector(".search-results");
const showMore = document.getElementById("show-more");
let inputData = "";
let page = 1;

async function searchImages() {
  inputData = input1.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accesskey}`;
  const response = await fetch(url);
  const data = await response.json();
  const results = data.results;
  if (page === 1) {
    searchResult.innerHTML = "";
  }
  results.map((result) => {
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("search-img");
    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;
    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.textContent = result.alt_description;
    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
    searchResult.appendChild(imageWrapper);
  });
  page++;
  if (page > 1) {
    showMore.style.display = "block";
  }
}
form1.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchImages();
});
showMore.addEventListener("click", (event) => {
  searchImages();
});
