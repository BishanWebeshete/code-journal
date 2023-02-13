var photoUrlInput = document.querySelector('#photourl');
var img = document.querySelector('img');
photoUrlInput.addEventListener('input', function (event) {
  img.setAttribute('src', event.target.value);
});
