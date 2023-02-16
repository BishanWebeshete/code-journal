var $photoUrlInput = document.querySelector('#photourl');
var $img = document.querySelector('img');
var $form = document.querySelector('form');
var $entriesNav = document.querySelector('.entries-nav');
var $newEntryButton = document.querySelector('#entry-form-tag');
var $idTitle = document.getElementById('entry-title');
var $ul = document.querySelector('ul');

$newEntryButton.addEventListener('click', function (event) {
  event.preventDefault();
  $form.reset();
  viewSwap('entry-form');
  $idTitle.textContent = 'New Entry';
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

  toggleNoEntries();

  if (data.editing === null) {
    data.nextEntryId++;
    data.entries.unshift($formInfo);
    $img.setAttribute('src', '/images/placeholder-image-square.jpg');
    $ul.prepend(renderEntry($formInfo));
  } else {
    $formInfo.entryId = data.editing.entryId;
    for (let i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === $formInfo.entryId) {
        data.entries[i] = $formInfo;
      }
    }
    var $editedEntry = renderEntry($formInfo);
    var $liElements = document.querySelectorAll('li');
    for (let i = 0; i < $liElements.length; i++) {
      if (Number($liElements[i].getAttribute('data-entry-id')) === data.editing.entryId) {
        $liElements[i].replaceWith($editedEntry);
      }
    }
    data.editing = null;
  }
  viewSwap('entries');
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

  var $iconContainer = document.createElement('div');
  $iconContainer.className = 'title-icon-container';
  $secondColumnDiv.appendChild($iconContainer);

  var $h2Element = document.createElement('h2');
  $h2Element.textContent = entry.title;
  $iconContainer.appendChild($h2Element);

  var $iconElement = document.createElement('i');
  $iconElement.className = 'fa fa-pencil edit - icon';
  $h2Element.appendChild($iconElement);

  var $pElement = document.createElement('p');
  $pElement.textContent = entry.notes;
  $secondColumnDiv.appendChild($pElement);

  $liElement.setAttribute('data-entry-id', entry.entryId);

  return $liElement;
}

$ul.addEventListener('click', function (event) {
  var $closestLi = event.target.closest('li');
  if (!event.target.matches('i')) {
    return null;
  } else {
    for (let i = 0; i < data.entries.length; i++) {
      if (Number($closestLi.getAttribute('data-entry-id')) === data.entries[i].entryId) {
        data.editing = data.entries[i];
        $form.elements.title.value = data.editing.title;
        $form.elements.photourl.value = data.editing.photoUrl;
        $form.elements.textarea.value = data.editing.notes;
        $idTitle.textContent = 'Edit Entry';
        viewSwap('entry-form');
        var $buttonElement = document.querySelector('button');
        $buttonElement.classList.remove('hidden-button');
      }
    }
  }
});

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
