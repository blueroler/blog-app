const databaseUrl = 'https://website-blueroler-default-rtdb.firebaseio.com';

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

function replaceDashWithSpace(input) {
    return input.replace(/-/g, " ");
}