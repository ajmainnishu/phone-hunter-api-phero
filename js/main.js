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

// display input fetch data
const displayFetchData = (phones) => {
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.textContent = '';
    phones = phones.slice(0, 5);
    dataFoundMessage(phones);
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card h-100">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">This is a short card.</p>
                <a onclick="phoneDetails('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetails">Details</a>
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

// button fetch data
const phoneDetails = async id => {
    try {
        const url = `https://openapi.programming-hero.com/api/phone/${id}`;
        const res = await fetch(url);
        const data = await res.json();
        console.log(data.data);
        modalPhoneDetails(data.data);
    }
    catch (error) {
        console.log(error);
    }
}

// display button modal
const modalPhoneDetails = phone => {
    const phoneDetailsLabel = document.getElementById('phoneDetailsLabel');
    phoneDetailsLabel.innerText = phone.name;
    const modalBody = document.getElementById('body-modal');
    modalBody.innerHTML = `
        <p><b>Brand:</b> ${phone.brand ? phone.brand : 'Not Found'}</p>
        <p><b>Release Date:</b> ${phone.releaseDate 
        ? phone.releaseDate : 'Not Found'}</p>
        <p><b>Storage:</b> ${phone.mainFeatures ? phone.mainFeatures.storage : 'Not Found'}</p>
        <p><b>Chipset:</b> ${phone.mainFeatures ? phone.mainFeatures.chipSet : 'Not Found'}</p>
        <p><b>Memory:</b> ${phone.mainFeatures ? phone.mainFeatures.memory : 'Not Found'}</p>
        <p><b>Display:</b> ${phone.mainFeatures ? phone.mainFeatures.displaySize : 'Not Found'}</p>
        <p><b>Bluetooth:</b> ${phone.others ? phone.others.Bluetooth : 'Not Found'}</p>
        <p><b>NFC:</b> ${phone.others ? phone.others.NFC : 'Not Found'}</p>
    `
}
loadingFetchData();