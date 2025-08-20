# Handcrafter’s Hub

**Submitted by:** Rebecca Smith  
**Total Time Spent:** 32+ hours  

Handcrafter’s Hub is a community forum for crafters to share handmade projects, compete in contests, ask for help, and engage with fellow makers across categories like Sewing & Textiles and Woodworking. Users can create, edit, comment, and upvote posts in a clean, responsive interface.

---

## Features

- [x] **Post Creation Form**
  - Required: Post title
  - Optional: Post content and external image URL

- [x] **Home Feed**
  - Displays post title, creation time, and upvotes
  - Clicking a post leads to a full detail view

- [x] **Post Sorting and Searching**
  - Sort by: creation time or upvotes
  - Search by post title

- [x] **Post Detail Page**
  - Displays full post content, image, and comments
  - Users can leave comments
  - Posts include upvote buttons that increment vote count
  - Posts are individually upvotable multiple times

- [x] **Post Editing and Deletion**
  - Users can edit and delete their own posts
- [x] **Pseudo-authentication**
  - Each user gets a random ID on app launch
  - Users can only edit/delete their own posts or comments

- [x] **Voting with Supabase RLS and post_votes table**
- [x] **Comment upvoting and editing**
- [x] **Category-based post organization**
- [x] **Dynamic contest banners per category**
- [x] **Google Sign-In with synced avatar images**

---

## Additional Features

- Post sorting reorders category sections by newest or most popular
- Supabase RLS policies and triggers securely control post and vote access
- Optimistic UI updates for a snappy user experience

---

## Walkthrough Video

[Walkthrough Video](https://i.imgur.com/IFVmRk0.gif)  
> Created with [ScreenToGif](https://www.screentogif.com/)

---

## Notes

- Supabase Row-Level Security (RLS) required careful setup to allow voting without exposing edit access.
- Nested relationships (`profiles`, `post_categories`) in Supabase required thoughtful data loading.
- Optimistic updates were used for smoother UX in voting and commenting.

---

## Built With

- React + Vite
- Supabase (Database, Auth, Storage)
- React Router

---

## License

    Copyright 2025 Rebecca Smith

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
