const STORE = {
    bookmarks: [],
    editing: false,
    target: '',
    filter: 1
};

function status() {
    if(STORE.editing) {
        return 'editing'; 
    } else {
        return 'list';
    }
}

function setFilterLevel(level) {
    STORE.filter = level;
}

// ----- Bookmark functions -----

function getBookmarks() {
    return STORE.bookmarks;
}

function findById(id) {
    return STORE.bookmarks.find((itm) => itm.id === id);
}

function toggleExpanded(id) {
    this.findById(id).expanded = !this.findById(id).expanded;
}

function editBookmark(id) {
    STORE.editing = true;
    STORE.target = id;
}

function getCurrentEditTarget() {
    return this.findById(this.STORE.target);
}

function stopEdit() {
    STORE.editing = false;
    STORE.target = '';
}

function updateCurrentTarget(newObj) {
    Object.assign(this.findById(STORE.target), newObj);
}

function addBookmark(obj) {
    STORE.bookmarks.push(obj);
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
    STORE,
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