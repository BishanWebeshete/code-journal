var $photoUrlInput = document.querySelector('#photourl');
var $img = document.querySelector('img');
var $form = document.querySelector('form');

$photoUrlInput.addEventListener('input', function (event) {
  $img.setAttribute('src', event.target.value);
});

$form.addEventListener('submit', function (event) {
  event.preventDefault();
  var $formInfo = {
    title: $form.elements.title.value,
    photoUrl: $form.elements.photourl.value,
    notes: $form.elements.textarea.value,
    entryId: data.nextEntryId
  };
  data.nextEntryId++;
  data.entries.push($formInfo);
  $img.setAttribute('src', 'images/placeholder-image-sqaure.jpg');
  $form.reset();
});
