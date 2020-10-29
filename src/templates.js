import store from './store';

function bookmarkItem(item) {
    if(store.filter <= item.rating) {
    
        let source = `<div class="bookmark flexbox" data-item-id="${item.id}">
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

function bookmarkEditItem(item) {
    let source = `<div class="bookmark flexbox">
        <form class="flexbox editform">
            <label for="title">Title: </label>
            <input name="title" id="title" value="${item.title}"/>
            <label for="rating">Rating: </label>
            <select name="rating" id="rating">`
    for(let i = 1; i <= 5; i++) {
        source += `<option value="${i}" `;
        if(i == item.rating) {
            source += "selected";
        }
        source += `>${i}</option>`;
    }
    source += `</select>
            <label for="url">URL: </label>
            <input name="url" id="url" value="${item.url}"/>
            <label for="description">Description: </label>
            <textarea name="description">${item.desc}</textarea>
            <button class="submitEdit" data-item-id="${item.id}">Submit</button>
            <button class="delete" data-item-id="${item.id}">Delete</button>
    </form>`;
    return source;
}

export default {
    bookmarkItem,
    bookmarkListHome,
    bookmarkEditItem
}