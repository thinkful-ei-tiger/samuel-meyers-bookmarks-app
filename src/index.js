import $ from 'jquery';

import book from './bookmarker';

import './index.css';

$(() => {
    book.render();
    book.setupEventHandlers();
});