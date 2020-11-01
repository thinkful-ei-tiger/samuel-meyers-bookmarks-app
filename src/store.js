let bookmarks = [];
let editing = false;
let target = '';
let filter = 1;
let adding = false;
let message = "";

function status() {
    if (this.editing && this.adding) {
        return 'adding';
    }
    else if(this.editing && !this.adding) {
        return 'editing'; 
    } else {
        return 'list';
    }
}

function setFilterLevel(level) {
    this.filter = level;
}

function pushMessage(msg)
{
    this.message = msg;
}

function hasMessage() {
    return this.message !== "";
}

function displayMessage() {
    let msg = this.message;
    this.message = "";
    return msg;
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

function addMode() {
    this.adding = true;
    this.editing = true;
    this.bookmarks.push({
        id: '_tmp_adding',
        title: '',
        rating: 1,
        url: '',
        desc: '',
    });
    this.target = '_tmp_adding';
}

function endAdd() {
    this.editing = false;
    this.adding = false;
}

// ----- Exports -----

export default {
    bookmarks,
    editing,
    adding,
    target,
    filter,
    message,
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
    addListOfBookmarks,
    pushMessage,
    displayMessage,
    addMode,
    endAdd,
    hasMessage
};