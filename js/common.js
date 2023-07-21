// button
const loadingButtonData = (dataLimit) => {
    spinner(true);
    const inputField = document.getElementById('input-field');
    const inputFieldText = inputField.value;
    loadingFetchData(inputFieldText, dataLimit);
    // inputField.value = '';
}