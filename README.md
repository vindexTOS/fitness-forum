# Fithub Forum

**Live Link**: [https://fithub-forum.netlify.app](https://fithub-forum.netlify.app)

## Initialisation

1. Install all dependencies by running `yarn install` or `npm install` in both the client and server folders.
2. Create a `.env` file inside the server folder and add the following environment variables:
   - `MONGO_URL`: Your own MongoDB Atlas database link.
   - `JWT_STRING`: A password of your choice for authentication.
3. Start the server by running `yarn start` or `npm start`.
4. Start the front-end development server by running `yarn run dev`.

## App Features

- **Roles**: Fithub Forum supports two user roles: `admin` and `user`.
- **Post and Comment Operations**: Users can create posts, make comments, and perform CRUD operations on their own content.
- **Profile Management**: All users can manage their profiles and update their profile information.
- **Thread Creation**: Admins have the additional ability to create threads (subs) for different fitness topics.
- **Upvote Functionality**: Users can upvote posts and comments.
- **Notifications**: Users receive notifications for replies and new posts.
- **Navigation**: Users can navigate through different threads and pages.

---

