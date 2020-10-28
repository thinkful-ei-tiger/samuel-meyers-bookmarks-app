import $ from 'jquery';

import store from './store';
import temp from './templates';

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
            console.log("Editing ",store.getCurrentEditTarget() )
            $('.main').html(temp.bookmarkEditItem(store.getCurrentEditTarget()));
            break;
        default:
            break;
    }
}

function handleBookmarkClicked() {
    $('.main').on('click', '.bookmark', function(evt) {
        if(!store.STORE.editing) {
            let id = $(this).data('item-id');
            console.log("Bookmark clicked:",id);
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
        render();
    });
}

function handleSubmitClicked() {
    $('.main').on('click', '.submitEdit', function(evt) {
        evt.preventDefault();
        let newObj = $('.editform').extractForm();
        store.updateCurrentTarget(newObj);
        store.stopEdit();
        render();
    });
}

function setupEventHandlers() {
    handleBookmarkClicked();
    handleGotoClicked();
    handleEditClicked();
    handleSubmitClicked();
}

export default {
    render,
    setupEventHandlers
};