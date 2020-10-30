const url = "https://thinkful-list-api.herokuapp.com/samuel-meyers/bookmarks";

function addNewBookmark(title, uurl, rating, desc) {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({title: title, url: uurl, rating, desc})
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

function deleteBookmark(id) {
    return fetch(url+"/"+id, {
        method: 'DELETE',
    });
}

export default {
    addNewBookmark,
    getAllBookmarks,
    editBookmark,
    deleteBookmark
}