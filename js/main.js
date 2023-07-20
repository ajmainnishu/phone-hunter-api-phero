// input field
document.getElementById('btn-search').addEventListener('click', function () {
    spinner(true);
    const inputField = document.getElementById('input-field');
    const inputFieldText = inputField.value;
    inputField.value = '';
    loadingFetchData(inputFieldText);
});

// input field fetch data
const loadingFetchData = async (searchText) => {
    try {
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        // const url = `https://openapi.programming-hero.com/api/phones?search=iphone`;
        const res = await fetch(url);
        const data = await res.json();
        displayFetchData(data.data);
    }
    catch (error) {
        console.log(error);
    }
}

// display input fetch data
const displayFetchData = (phones) => {
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.textContent = '';
    phones = phones.slice(0, 5);
    dataFoundMessage(phones);
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
    spinner(false);
}

// data found or not message
const dataFoundMessage = (phones) => {
    const notFoundMessage = document.getElementById('not-found-message');
    if (phones.length === 0) {
        notFoundMessage.classList.remove('d-none');
    }
    else {
        notFoundMessage.classList.add('d-none');
    }
}

// display spinner
const spinner = isLoading => {
    const spinnerLoader = document.getElementById('spinner');
    if (isLoading) {
        spinnerLoader.classList.remove('d-none');
    }
    else {
        spinnerLoader.classList.add('d-none');
    }
}


// loadingFetchData();