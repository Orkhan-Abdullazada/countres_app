let baseUrl = "https://restcountries.com/v3.1/all"
let cardsDiv = document.getElementById("cardsDiv")
let searchInput = document.getElementById("searchInput")
let selectDiv = document.getElementById("selectDiv")
let countryData = [];

fetch(`${baseUrl}`).then((res) => res.json())
    .then(data => {
        countryData = data
        renderUI(data);
        renderSelect(data)
    })
    .catch(err => console.log(err))


function renderUI(array) {
    let innerHTML = "";
    for (let i = 0; i < array.length; i++) {
        innerHTML += `
                <a class="country-card" href="detail.html?name=${array[i].name.common}">
                <img src="${array[i].flags.png}" alt="">
                    <h2>${array[i].name.common}</h2>
                    <p><b>Population:</b> ${array[i].population}</p>
                    <p><b>Region:</b> ${array[i].region}</p>
                 <p><b>Capital:</b> ${array[i].capital}</p>
               </a>
            `;

    }

    cardsDiv.innerHTML = innerHTML;
}

function renderSelect(array) {
    let selectHTML = `<select name="" id="selectValue">`;
    let uniqueRegions = [];

    for (let i = 0; i < array.length; i++) {
        if (!uniqueRegions.includes(array[i].region)) {
            uniqueRegions.push(array[i].region);
            selectHTML += `<option value="${array[i].region}">${array[i].region}</option>`;
        }
    }

    selectHTML += `</select>`;
    selectDiv.innerHTML = selectHTML;
}


function searchCountry(search) {
    const newSearchCountry = countryData.filter(country =>
        country.name.common.toLowerCase().includes(search.toLowerCase()));
    renderUI(newSearchCountry)
}

searchInput.addEventListener("keyup", (e) => {
    e.preventDefault();
    let newSearch = searchInput.value;
    searchCountry(newSearch)
})

function renderSelect(array) {
    let selectHTML = `<select name="" id="selectValue">`;
    selectHTML += `<option value="all">All</option>`;

    let uniqueRegions = [];

    for (let i = 0; i < array.length; i++) {
        if (!uniqueRegions.includes(array[i].region)) {
            uniqueRegions.push(array[i].region);
            selectHTML += `<option value="${array[i].region}">${array[i].region}</option>`;
        }
    }

    selectHTML += `</select>`;
    selectDiv.innerHTML = selectHTML;
}

selectDiv.addEventListener("change", (e) => {
    const selectedRegion = e.target.value;
    if (selectedRegion === "all") {
        renderUI(countryData);
    } else {
        const filteredCountries = countryData.filter(country => country.region === selectedRegion);
        renderUI(filteredCountries);
    }
});