import store from './store';

function bookmarkItem(item) {
    if(store.filter <= item.rating) {
    
        let source = `<div class="bookmark flexbox" data-item-id="${item.id}" tabindex="0">
            <h3>${item.title}</h3><div>`;
        for(let i = 0; i < item.rating; i++) {
            source += `<i class="fas fa-star"></i>`;
        }
        source += "</div>";
        if(item.expanded) {
            source += `<button class="goto" data-url="${item.url}">Go to Bookmark</button>`;
            source += `<button class="edit" data-item-id="${item.id}">Edit</button>`;
            source += `<p>${item.desc}</p>`
        }
        source += `</div>`;
        return source;
    } else {
        return "";
    }
}

function bookmarkListHome() {
    let items = store.bookmarks;
    let source = `<div class="card flexbox">
    <div>
    <button class="addbutton">+ New</button>
    <select class="selectfilter">`;
    for(let i = 1; i <=5; i++) {
        source += `<option value="${i}" `;
        if(i == store.filter) {
            source += "selected";
        }
        source += `>${i}</option>`
    }
    source += "</select></div>";
    for(let item of items) {
        console.log(item);
        source += bookmarkItem(item);
    }
    source += `</div>`;
    return source;
}

function bookmarkEditItem(item, adding, message='') {
    let source = `<div class="bookmark flexbox">`;
    console.log("message is",store.message);
    console.log(message);
    if(store.hasMessage()) {
        source += `<p>${store.displayMessage()}</p>`;
    }
    source += `<form class="flexbox editform">
            <label for="title">Title: </label>
            <input name="title" id="title" value="${item.title}" required>
            <label for="rating">Rating: </label>
            <select name="rating" id="rating" required>`
    for(let i = 1; i <= 5; i++) {
        source += `<option value="${i}" `;
        if(i == item.rating) {
            source += "selected";
        }
        source += `>${i}</option>`;
    }
    source += `</select>
            <label for="url">URL: </label>
            <input name="url" id="url" value="${item.url}" required>
            <label for="description">Description: </label>
            <textarea name="description" required>${item.desc}</textarea>`;
    if(adding) {
        source += `<button class="additem">Create Bookmark</button>`;
    } else {
        source += `<button class="submitEdit" data-item-id="${item.id}">Submit</button>
            <button class="delete" data-item-id="${item.id}">Delete</button>`;
    }
    
    source += `</form>`;
    return source;
}

function errorMessage(message) {
    return `<div class="card">
    <p>${message}</p>
    <button class="closemessage">Back</button>
    </div>`;
}

export default {
    bookmarkItem,
    bookmarkListHome,
    bookmarkEditItem,
    errorMessage
}