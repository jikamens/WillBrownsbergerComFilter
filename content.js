chrome.storage.sync.get({
    names: '',
    replies: true
}, function(items) {
    var namesToFilter = items.names.split(/\s*;\s*/);
    var hideReplies = items.replies;

    var stopAt = hideReplies ? 'LI' : 'ARTICLE';
    // Convert to Array because if we modify the DOM while we're iterating over
    // it some nodes get missed.
    var names = Array.from(document.getElementsByClassName('fn'));
    for (var node of names) {
        if (namesToFilter.includes(node.textContent)) {
            while (node.tagName.toUpperCase() != stopAt) {
                console.log(node.tagName);
                node = node.parentNode;
            }
            node.innerHTML = '<p><em>Comment' +
                (hideReplies ? ' and its replies' : '') +
                ' removed because you don\'t want to read it.</em></p>';
        }
    }
});
