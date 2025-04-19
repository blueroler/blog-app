const databaseUrl = 'https://website-blueroler-default-rtdb.firebaseio.com';
const topics = ['politics', 'sports', 'technology', 'entertainment', 'economy', 'life', 'world'];

function textOutput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
}

function capitalizeFirstLetter(input) {
    return input.charAt(0).toUpperCase() + input.slice(1);
}

function capitalizeAllLetter(input) {
    return input.toUpperCase();
}