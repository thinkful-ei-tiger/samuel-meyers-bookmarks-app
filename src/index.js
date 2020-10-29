import $ from 'jquery';

import book from './bookmarker';
import store from './store';
import api from './api';

import './index.css';

$(() => {
    api.getAllBookmarks().then(list => {
        store.addListOfBookmarks(list);
        book.render();
    });
    book.setupEventHandlers();
});