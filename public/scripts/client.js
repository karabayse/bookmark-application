// Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

// Save bookmark
function saveBookmark(e) {
  console.log('in saveBookmark');

  // Get form values
  var siteName = document.getElementById('siteName').value;
  var siteUrl = document.getElementById('siteUrl').value;

  if (!validateForm(siteName, siteUrl)) {
    return false;
  }

  var bookmark = {
    name: siteName,
    url: siteUrl
  };

  // Local Storage Test -> stores strings only
  // localStorage.setItem('test', 'Hello World');
  // localStorage.getItem('test');
  // localStorage.removeItem('test');

  // Test if bookmarks is null -> nothing in bookmarks
  if (localStorage.getItem('bookmarks') === null) {
    // Initialize array
    var bookmarks = [];
    // Add to array
    bookmarks.push(bookmark);
    // Set to LocalStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  } else {
    // Get bookmarks from LocalStorage -> turns a string back into JOSN
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Add bookmark to array
    bookmarks.push(bookmark);
    // Rest back to LocalStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }

  // Clear form
  document.getElementById('myForm').reset();

  // Fetch bookmarks again
  fetchBookmarks();

  // Prevent form from submitting
  e.preventDefault();
}

// Delete bookmark
function deleteBookmark(url) {
  // Get bookmarks from LocalStorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  // Look through bookmarks
  for (var i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].url == url) {
      // Remove from array
      bookmarks.splice(i, 1);
    }
  }
  // Reset Local Storage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  // Fetch bookmarks again
  fetchBookmarks();
}

// Fetch bookmarks
function fetchBookmarks() {
  // Get bookmarks from LocalStorage -> turns a string back into JOSN
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  // Get output id
  var bookmarksResults = document.getElementById('bookmarksResults');
  // Build output -> innerHTML: put whatever HTML we give it into that spot
  bookmarksResults.innerHTML = '';
  // Loop through bookmarks in Local Storage
  for (var i = 0; i < bookmarks.length; i++) {
    // bookmarks[i] is the current iteration
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;
    bookmarksResults.innerHTML += '<div class="card bg-light text-dark card-body">'+
                                  '<h3>'+name+
                                  ' <a class="btn btn-primary" target="_blank" href="'+url+'">Visit</a> ' +
                                  ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> ' +
                                  '</h3>'+
                                  '</div>'+
                                  '<br>';
  }
} // end fetchBookmarks

function validateForm(siteName, siteUrl) {
  // Prevent blank entry submission
  if (!siteName || !siteUrl) {
    alert('Please fill in the form');
    return false;
  }

  // Set regular expression to format a URL
  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if (!siteUrl.match(regex)) {
    alert('Please use a valid URL');
    return false;
  }
  // If it passes, return true
  return true;
}
