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
            $('.main').html(temp.bookmarkListHome());
            break;
        case 'editing':
            //console.log("Editing ",store.getCurrentEditTarget() )
            $('.main').html(temp.bookmarkEditItem(store.getCurrentEditTarget()));
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
        console.log(id);
        store.editBookmark(id);
        console.log(store.status())
        console.log(store.target);
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
        console.log(sendObj);
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
        api.addNewBookmark("bookmark", "http://example.com").then((item) => {
            store.addBookmark(item);
            store.editBookmark(item.id);
            render();
        });
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
            console.log("THEN");
            refresh(function() {
                store.stopEdit();
            });
            render();
        });
    })
}

function setupEventHandlers() {
    handleBookmarkClicked();
    handleGotoClicked();
    handleEditClicked();
    handleSubmitClicked();
    handleNewClicked();
    handleSelectChanged();
    handleDeleteClicked();
}

export default {
    render,
    setupEventHandlers
};