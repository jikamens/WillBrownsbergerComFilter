// Saves options to chrome.storage
function save_options() {
  var names = document.getElementById('names').value;
  var replies = document.getElementById('replies').checked;
  chrome.storage.sync.set({
    names: names,
    replies: replies
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get({
    names: '',
    replies: false
  }, function(items) {
    document.getElementById('names').value = items.names;
    document.getElementById('replies').checked = items.replies;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
