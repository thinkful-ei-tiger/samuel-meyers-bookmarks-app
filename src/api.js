const url = "http://thinkful-list-api.herokuapp.com/samuel-meyers/bookmarks";

function addNewBookmark(title, uurl) {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({title: title, url: uurl, rating: 5})
    }).then(response => response.json());
}

function getAllBookmarks() {
    return fetch(url).then(response => response.json());
}

function editBookmark(id, bookmark) {
    return fetch(url+"/"+id, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookmark)
    }).then(response => response.json());
}

export default {
    addNewBookmark,
    getAllBookmarks,
    editBookmark
}