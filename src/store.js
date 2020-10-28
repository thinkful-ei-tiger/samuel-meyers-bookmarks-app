const STORE = {
    bookmarks: [
        {
            id: 'c137',
            title: 'Google',
            rating: 5,
            url: 'https://www.google.com/',
            description: `lorem ipsum`,
            expanded: false,
        },
        {
            id: 'c138',
            title: 'Doggy',
            rating: 3,
            url: 'https://www.doggy.com/',
            description: `lorem ipsum`,
            expanded: false,
        }
    ],
    editing: false,
    target: '',
    filter: 0
};

function status() {
    if(STORE.editing) {
        return 'editing'; 
    } else {
        return 'list';
    }
}

// ----- Bookmark functions -----

function getBookmarks() {
    return STORE.bookmarks
}

function findBookmarkById(id) {
    return STORE.bookmarks.find((itm) => itm.id === id);
}

function toggleExpanded(id) {
    this.findBookmarkById(id).expanded = !this.findBookmarkById(id).expanded;
}

function editBookmark(id) {
    STORE.editing = true;
    STORE.target = id;
}

function getCurrentEditTarget() {
    return this.findBookmarkById(this.STORE.target);
}

function stopEdit() {
    STORE.editing = false;
    STORE.target = '';
}

function updateCurrentTarget(newObj) {
    Object.assign(this.findBookmarkById(STORE.target), newObj);
}

// ----- Exports -----

export default {
    STORE,
    status,
    getBookmarks,
    findBookmarkById,
    toggleExpanded,
    editBookmark,
    getCurrentEditTarget,
    stopEdit,
    updateCurrentTarget
};