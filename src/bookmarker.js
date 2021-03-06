import $ from 'jquery';

import store from './store';
import temp from './templates';
import api from './api';

$.fn.extend({
    serializeJson: function() {
        const formData = new FormData(this[0]);
        const o = {};
        formData.forEach((val, name) => o[name] = val);
        return JSON.stringify(o);
    },
    extractForm: function() {
        const formData = new FormData(this[0]);
        const o = {};
        formData.forEach((val, name) => o[name] = val);
        return o;
    }
});

function render(message = '') {
    console.log(store.status())
    switch(store.status()) {
        case 'list':
            console.log('listing bookmarks');
            $('main').html(temp.bookmarkListHome());
            break;
        case 'editing':
            console.log('editing', store.getCurrentEditTarget())
            $('main').html(temp.bookmarkEditItem(store.getCurrentEditTarget(), false, message));
            break;
        case 'adding':
            console.log('adding new bookmark');
            $('main').html(temp.bookmarkEditItem(store.getCurrentEditTarget(), true, message));
            break;
        default:
            break;
    }
}

function refresh(callback=function(){}) {
    api.getAllBookmarks().then((data) => {
        store.bookmarks = [];
        store.addListOfBookmarks(data);
        callback();
        render();
    })
}

function pushBookmarkError(message) {
    store.pushMessage(message);
    console.log("Incomplete submission:",store.message);
    render();
}

function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
  }

function handleGotoClicked() {
    $('main').on('click', '.goto', function(evt) {
        let url = $(this).data('url');
        window.open(url, '_blank');
    });
    $('main').on('keypress', '.goto', function(evt) {
        let url = $(this).data('url');
        window.open(url, '_blank');
    });
}

function handleEditClicked() {
    $('main').on('click', '.edit', function(evt) {
        let id = $(this).data('item-id');
        store.editBookmark(id);
        render();
    });
    $('main').on('keypress', '.edit', function(evt) {
        let id = $(this).data('item-id');
        store.editBookmark(id);
        render();
    });
}

function handleBookmarkClicked() {
    $('main').on('keypress', '.bookmark', function(evt) {
        if(!store.editing) {
            let id = $(this).data('item-id');
            store.toggleExpanded(id);
            render();
        }
    });
    $('main').on('click', '.bookmark', function(evt) {
        if(!store.editing) {
            let id = $(this).data('item-id');
            store.toggleExpanded(id);
            render();
        }
    });
}

function handleSubmitClicked() {
    $('main').on('click', '.submitEdit', function(evt) {
        evt.preventDefault();
        let newObj = $('.editform').extractForm();
        
        if(!newObj.title) {
            pushBookmarkError("Must enter a title");
            return;
        }
        if(!newObj.rating) {
            pushBookmarkError("Must enter a rating");
            return;
        }
        if(!newObj.url) {
            pushBookmarkError("Must enter a URL");
            return;
        }
        if(!validURL(newObj.url)) {
            pushBookmarkError("Invalid URL");
            return;
        }
        if(!newObj.description) {
            pushBookmarkError("Must enter a description");
            return;
        }
        
        let id = $(this).data('item-id');
        let sendObj = {
            title: newObj.title,
            rating: parseInt(newObj.rating),
            desc: newObj.description,
            url: newObj.url
        }
        api.editBookmark(id, sendObj).then((data) => {
            //store.updateCurrentarget();
            refresh(function() {
                store.stopEdit();
                render();
            });
        });
    });
}

function handleNewClicked() {
    $('main').on('click', '.addbutton', function(evt) {
       store.addMode();
       render();

    });
}

function handleAddClicked() {
    $('main').on('click', '.additem', function(evt) {
        evt.preventDefault();
        let newObj = $('.editform').extractForm();
        if(!newObj.title) {
            pushBookmarkError("Must enter a title");
            return;
        }
        if(!newObj.rating) {
            pushBookmarkError("Must enter a rating");
            return;
        }
        if(!newObj.url) {
            pushBookmarkError("Must enter a URL");
            return;
        }
        if(!validURL(newObj.url)) {
            pushBookmarkError("Invalid URL");
            return;
        }
        if(!newObj.description) {
            pushBookmarkError("Must enter a description");
            return;
        }
        
        /*|| !newObj.rating ||!newObj.description || !newObj.url) {
            store.pushMessage("Must enter all required fields");
            console.log("Incomplete submission:",store.message);
            render();
            return;
        }*/
        console.log(newObj);
        api.addNewBookmark(newObj.title, newObj.url, parseInt(newObj.rating), newObj.description).then((item) => {
            refresh(function() {
                store.endAdd();
            });
        }).catch(error => {
            console.log(error);
            store.pushMessage(error);
            render()}
        );
    });
}

function handleSelectChanged() {
    $('main').on('click', '.selectfilter', function(evt) {
        store.setFilterLevel($(this).val());
        render();
    });
}

function handleDeleteClicked() {
    $('main').on('click', '.delete', function(evt) {
        evt.preventDefault();
        let id = $(this).data('item-id');
        api.deleteBookmark(id).then((resp) => {
            refresh(function() {
                store.stopEdit();
            });
            render();
        });
    })
}

function handleCloseMessage() {
    $('main').on('click', '.closemessage', function(evt) {
        store.message = "";
        render();
    });
}

function setupEventHandlers() {
    handleBookmarkClicked();
    handleGotoClicked();
    handleEditClicked();
    handleSubmitClicked();
    handleNewClicked();
    handleSelectChanged(); 
    handleDeleteClicked();
    handleAddClicked();
    handleCloseMessage();
}

export default {
    render,
    setupEventHandlers
};