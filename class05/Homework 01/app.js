// Homework 1

// Task 1
// Create an html page with a table and a button. When the button is clicked show results for the first 10 planets
//  from the Star Wars api. The information in the table are:
// Planet Name
// Population
// Climate
// Gravity
// There should be a function that makes the call to the api for the planets ( should have URL for a parameter ) 
// There should be a function that prints planets in to the table 
// **API URL: ** https://swapi.dev/api/planets/?page=1

// Task 2
// After the user clicks the button to get the first 10 planets, a button should be shown below the table 
// that says: NEXT 10. When the button is clicked you should make another call and get the next 10 planets 
// and change the table contents with information about the next 10 planets.. 
// After the next 10 planets are shown the button NEXT 10 should disapear and a new button PREVIOUS 10 should appear.
//  The previous button should return the first 10 planets in the table and hide the PREVIOUS 10 button 
//  and show the NEXT 10 button.
// **API URL: ** https://swapi.dev/api/planets/?page=2

const body = document.body;
const divTable = document.getElementById("div-table");
const table = document.getElementById("planets");
const allTbodyRows = document.querySelectorAll(".row");
const button = document.getElementById("getData");

async function getDataFromApi(url) {
    try {
        const data = await fetch(url);
        const res = await data.json();
        const planets = res.results;

        fillTable(allTbodyRows, planets);

    } catch (error) {
        console.log("Something went wrong, please try again later", error);
        const h1 = document.createElement("h1");
        h1.textContent = "Something went wrong, please try again later";
        body.appendChild(h1);
    }
}

button.addEventListener("click", ev => {
    removeNextSiblings(divTable);

    getDataFromApi("https://swapi.dev/api/planets/?page=1");

    const buttonNext = createButton("next-btn", "Next 10");
    const buttonPrevious = createButton("previous-btn", "Previous 10", "hidden");

    body.appendChild(buttonNext);
    body.appendChild(buttonPrevious);

    buttonNext.addEventListener("click", ev => {
        getDataFromApi("https://swapi.dev/api/planets/?page=2");
        toggleClass(buttonNext, buttonPrevious, "hidden");
    })

    buttonPrevious.addEventListener("click", ev => {
        getDataFromApi("https://swapi.dev/api/planets/?page=1");
        toggleClass(buttonNext, buttonPrevious, "hidden");
    })
})

function removeNextSiblings(element) {
    while (element.nextElementSibling) {
        element.nextElementSibling.remove();
    }
}

function createButton(id, innerText, cssClass = null) {
    const btn = document.createElement("button");
    btn.setAttribute("id", id);
    btn.innerText = innerText;
    btn.classList.add(cssClass);
    return btn;
}

function toggleClass(elem1, elem2, cssClass) {
    elem1.classList.toggle(cssClass);
    elem2.classList.toggle(cssClass);
}

function fillTable(elements, data) {
    for (let i = 0; i < elements.length; i++) {
        elements[i].children[0].textContent = data[i].name;
        elements[i].children[1].textContent = data[i].population;
        elements[i].children[2].textContent = data[i].climate;
        elements[i].children[3].textContent = data[i].gravity;
    }
}
