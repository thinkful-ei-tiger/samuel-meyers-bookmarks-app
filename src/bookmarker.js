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

function render() {
    switch(store.status()) {
        case 'list':
            console.log('listing bookmarks');
            $('.main').html(temp.bookmarkListHome());
            break;
        case 'editing':
            console.log('editing', store.getCurrentEditTarget())
            $('.main').html(temp.bookmarkEditItem(store.getCurrentEditTarget(), false));
            break;
        case 'adding':
            console.log('adding new bookmark');
            $('.main').html(temp.bookmarkEditItem(store.getCurrentEditTarget(), true));
            break;
        case 'message':
            $('.main').html(temp.errorMessage(store.displayMessage()));
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

function handleBookmarkClicked() {
    $('.main').on('click', '.bookmark', function(evt) {
        if(!store.editing) {
            let id = $(this).data('item-id');
            store.toggleExpanded(id);
            render();
        }
    });
}

function handleGotoClicked() {
    $('.main').on('click', '.goto', function(evt) {
        let url = $(this).data('url');
        window.open(url, '_blank');
    });
}

function handleEditClicked() {
    $('.main').on('click', '.edit', function(evt) {
        let id = $(this).data('item-id');
        store.editBookmark(id);
        render();
    });
}

function handleSubmitClicked() {
    $('.main').on('click', '.submitEdit', function(evt) {
        evt.preventDefault();
        let newObj = $('.editform').extractForm();
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
            });
        });
    });
}

function handleNewClicked() {
    $('.main').on('click', '.addbutton', function(evt) {
        /*
        api.addNewBookmark("bookmark", "http://example.com").then((item) => {
            store.addBookmark(item);
            store.editBookmark(item.id);
            render();
        });
        */
       store.addMode();
       render();

    });
}

function handleAddClicked() {
    $('.main').on('click', '.additem', function(evt) {
        evt.preventDefault();
        let newObj = $('.editform').extractForm();
        if(!newObj.title || !newObj.rating ||!newObj.description || !newObj.url) {
            store.pushMessage("Must enter all required fields");
            render();
        }
        api.addNewBookmark(newObj.title, newObj.url, parseInt(newObj.rating), newObj.description).then((item) => {
            refresh(function() {
                store.endAdd();
            });
        }).catch(error => {store.pushMessage(error);render()});
    });
}

function handleSelectChanged() {
    $('.main').on('click', '.selectfilter', function(evt) {
        store.setFilterLevel($(this).val());
        render();
    });
}

function handleDeleteClicked() {
    $('.main').on('click', '.delete', function(evt) {
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
    $('.main').on('click', '.closemessage', function(evt) {
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