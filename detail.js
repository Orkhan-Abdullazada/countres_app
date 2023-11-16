let nameCommon = new URLSearchParams(document.location.search).get("name")
let detailBody = document.getElementById("detailBody")
let baseURL = `https://restcountries.com/v3.1/name/${nameCommon}?fullText=true`

let button = document.getElementById("back")
fetch(`${baseURL}`).then((res) => res.json())
    .then(data => {

        renderDetail(data);

    })
    .catch(err => console.log(err))


function renderDetail(detail) {
    let innerHTML = "";
    for (let i = 0; i < detail.length; i++) {


        console.log(Object.entries(detail[i].currencies)[0][1].name)
        innerHTML = `<div class="imgdiv"><img src="${detail[i].flags.png}" alt=""></div>
        <div class="data1Div">
            <h2>${detail[i].name.common}</h2>
            <p><b>Native Name: </b>${detail[i].name.common} </p>
            <p><b>Population:</b>${detail[i].population}</p>
            <p><b>Region:</b> ${detail[i].region}</p>
                <p><b>Sub Region:</b>${detail[i].subregion}</p>
                <p><b>Capital:</b>${detail[i].capital}</p>
                <p><b>Border:</b>${detail[i].borders ? detail[i].borders : "Not border"}</p>
        </div>
        <div class="data2Div">
           
            <p><b>Top Level Domain:
        
            </b></p>
            <p><b>Currencies:</b>${Object.entries(detail[i].currencies)[0][1].name} </p>
            <p><b>Languages: </b>${Object.entries(detail[i].languages)[0][1]}</p></div>
        `
    }
  
    detailBody.innerHTML = innerHTML
}

button.addEventListener("click", () => {
    window.history.back()
})