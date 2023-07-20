// input field part
document.getElementById('btn-search').addEventListener('click', function () {
    const inputField = document.getElementById('input-field');
    const inputFieldText = inputField.value;
    console.log(inputFieldText);
});

// input field fetch data part
const loadingFetchData = async (searchText) => {
    try {
        // const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        const url = `https://openapi.programming-hero.com/api/phones?search=iphone`;
        const res = await fetch(url);
        const data = await res.json();
        displayFetchData(data.data);
    }
    catch (error) {
        console.log(error);
    }
}


const displayFetchData = (phones) => {
    const phonesContainer = document.getElementById('phones-container');
    phones.forEach(phone => {
        console.log(phone)
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card h-100">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">This is a short card.</p>
                <a href="" class="btn btn-primary">Details</a>
            </div>
        </div>
        `
        phonesContainer.appendChild(phoneDiv);
    })
}
loadingFetchData();