var $photoUrlInput = document.querySelector('#photourl');
var $img = document.querySelector('img');
var $form = document.querySelector('form');
var $entriesNav = document.querySelector('.entries-nav');
var $newEntryButton = document.querySelector('#entry-form-tag');

$newEntryButton.addEventListener('click', function (event) {
  viewSwap('entry-form');
});

$entriesNav.addEventListener('click', function (event) {
  viewSwap('entries');
});

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
  $img.setAttribute('src', '/images/placeholder-image-square.jpg');
  $form.reset();

  renderEntry($formInfo);
  $ul.prepend(renderEntry($formInfo));
  viewSwap('entries');

  toggleNoEntries();
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
  if (data.entries.length === 0) {
    $noEntriesText.classList.remove('hidden');
  } else {
    $noEntriesText.classList.add('hidden');
  }
}

var $views = document.querySelectorAll('.view');

function viewSwap(view) {
  for (let i = 0; i < $views.length; i++) {
    if ($views[i].getAttribute('data-view') === view) {
      $views[i].classList.remove('hidden');
    } else {
      $views[i].classList.add('hidden');
    }
  }
  data.view = view;
}

document.addEventListener('DOMContentLoaded', function (event) {
  data.entries.forEach(entry => {
    $ul.append(renderEntry(entry));
  });
  toggleNoEntries();
  viewSwap(data.view);
});
