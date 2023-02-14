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
  data.entries.unshift($formInfo);
  $img.setAttribute('src', 'images/placeholder-image-sqaure.jpg');
  $form.reset();
});

function renderEntry(entry) {
  var $liElement = document.createElement('li');

  var $rowDiv = document.createElement('div');
  $rowDiv.className = 'row';
  $liElement.appendChild($rowDiv);

  var $firstColumnDiv = document.createElement('div');
  $firstColumnDiv.className = 'column-half';
  $rowDiv.appendChild($firstColumnDiv);

  var $imageElement = document.createElement('img');
  $imageElement.setAttribute('src', entry.photoUrl);
  $firstColumnDiv.appendChild($imageElement);

  var $secondColumnDiv = document.createElement('div');
  $secondColumnDiv.className = 'column-half';
  $rowDiv.appendChild($secondColumnDiv);

  var $h2Element = document.createElement('h2');
  $h2Element.textContent = entry.title;
  $secondColumnDiv.appendChild($h2Element);

  var $pElement = document.createElement('p');
  $pElement.textContent = entry.notes;
  $secondColumnDiv.appendChild($pElement);

  return $liElement;
}

var $ul = document.querySelector('ul');

function toggleNoEntries() {
  var $noEntriesText = document.querySelector('.no-entries-text');
  if ($noEntriesText.className === 'hidden') {
    $noEntriesText.className = '.no-entries-text';
  } else if ($noEntriesText.className === 'no-entries-text') {
    $noEntriesText.className = 'hidden';
  }
}
toggleNoEntries();

function viewSwap(view) {
  data.view = view;
  var $entryForm = document.querySelector('.entry-form');
  var $entries = document.querySelector('.entries');
  if (view === 'entry-form') {
    $entries.classList.add('hidden');
  } else if (view === 'entries') {
    $entryForm.classList.add('hidden');
  }
}
viewSwap();

document.addEventListener('DOMContentLoaded', function (event) {
  data.entries.forEach(entry => {
    $ul.append(renderEntry(entry));
  });
});
