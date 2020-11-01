# https://thinkful-ei-tiger.github.io/samuel-meyers-bookmarks-app/


This is a simple app that allows you to organize bookmarks, similar to the bookmarks bar found on many popular web browsers, but more intuitive and less integrated.


1. I can add bookmarks to my bookmarks list. Bookmarks contain:
  * title
  * url link
  * description
  * rating (1-5)
2. I can see a list of my bookmarks when I first open the app
  * All bookmarks in the list default to a "condensed" view showing only title and rating
3. I can click on a bookmark to display the "detailed" view
  * Detailed view expands to additionally display description and a "Visit Site" link
4. I can remove bookmarks from my bookmark list
5. I receive appropriate feedback when I cannot submit a bookmark
  * Check all validations in the API documentation (e.g. title and url field required)
6. I can select from a dropdown (a <select> element) a "minimum rating" to filter the list by all bookmarks rated at or above the chosen selection
7. (Extension feature - optional) I can edit the rating and description of a bookmark in my list
