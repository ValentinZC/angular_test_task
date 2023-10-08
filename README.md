# SocialFeedTestTask

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.3.

Node v18.16.1

[API Specs](https://realworld-docs.netlify.app/docs/specs/frontend-specs/swagger/)

[Demo](https://valentinzc.github.io/angular_test_task/)

## Description

This project is a test task.

A simple social news feed in which you can leave posts, comment on them, follow the authors of articles.

The application allows users to view and interact with posts from their friends. Each post should have the following properties:

- Author: The user who created the post.
- Content: The text content of the post.
- Timestamp: The date and time when the post was created.
- Likes: The number of likes the post has received.
- Comments: An array of comments on the post, each containing a commentary and the comment text.

## Requirements

- [x] Create a post service that handles retrieving posts from a RESTful API. Use Angular's HttpClient module to communicate with the API.
- [x] Implement a feed component that displays a list of posts from the user's friends. Include pagination to load more posts as the user scrolls.
- [x] Add a post component that allows users to create new posts. Use Angular's Reactive Forms for validation and capturing user input.
- [x] Implement a "Like" functionality that allows users to like/unlike posts. Update the like count accordingly.
- [x] Implement a "Comment" functionality that allows users to add comments to posts. Display the comments on the post and update the comment count.
- [x] Use Angular Material components for the user interface elements, such as cards, buttons, and forms.
- [x] Apply proper error handling and display meaningful error messages to the user in case of API failures or validation errors.
