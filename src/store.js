let bookmarks = [];
let editing = false;
let target = '';
let filter = 1;

function status() {
    if(this.editing) {
        return 'editing'; 
    } else {
        return 'list';
    }
}

function setFilterLevel(level) {
    this.filter = level;
}

// ----- Bookmark functions -----

function getBookmarks() {
    return this.bookmarks;
}

function findById(id) {
    return this.bookmarks.find((itm) => itm.id === id);
}

function toggleExpanded(id) {
    this.findById(id).expanded = !this.findById(id).expanded;
}

function editBookmark(id) {
    this.editing = true;
    this.target = id;
}

function getCurrentEditTarget() {
    return this.findById(this.target);
}

function stopEdit() {
    this.editing = false;
    this.target = '';
}

function updateCurrentTarget(newObj) {
    Object.assign(this.findById(this.target), newObj);
}

function addBookmark(obj) {
    this.bookmarks.push(obj);
    this.findById(obj.id).expanded = false;
}

function addListOfBookmarks(list) {
    for(let item of list) {
        let itm = item;
        itm.expanded = false;
        this.addBookmark(itm);
    }
}

// ----- Exports -----

export default {
    bookmarks,
    editing,
    target,
    filter,
    status,
    setFilterLevel,
    getBookmarks,
    findBookmarkById: findById,
    findById,
    toggleExpanded,
    editBookmark,
    getCurrentEditTarget,
    stopEdit,
    updateCurrentTarget,
    addBookmark,
    addListOfBookmarks
};