# Postify — Mini Social Media Frontend

The web client for **Postify**, a lightweight social media platform, built with **Angular 19** and **Angular Material**.

Users sign up, sign in, publish posts with text and images, browse a shared feed, like posts, and see their own posts on a profile page. All data comes from the Postify REST API.

![Angular](https://img.shields.io/badge/Angular-19-DD0031?logo=angular&logoColor=white)
![Angular Material](https://img.shields.io/badge/Angular%20Material-19-757575?logo=materialdesign&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript&logoColor=white)
![RxJS](https://img.shields.io/badge/RxJS-7.8-B7178C?logo=reactivex&logoColor=white)
![Backend](https://img.shields.io/badge/Backend-Spring%20Boot%203-6DB33F?logo=springboot&logoColor=white)

> **Backend:** the Spring Boot + MongoDB API for this app lives in a separate repository: [mini-social-media-app](https://github.com/abdelhedy/mini-social-media-app). It must be running for the frontend to work.
>
> Some identifiers and labels are in French.

---

## Table of Contents

- [Features](#features)
- [How It Works](#how-it-works)
- [Tech Stack](#tech-stack)
- [Pages and Routes](#pages-and-routes)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [API Usage](#api-usage)
- [Available Scripts](#available-scripts)
- [Known Limitations](#known-limitations)
- [Related Projects](#related-projects)
- [Authors](#authors)

---

## Features

### Accounts

- Sign up with first name, last name, email, phone number (8 digits), password (6+ characters) and date of birth, with form validation
- Sign in with email and password; the signed-in user's ID and name are kept in `localStorage`
- Log out from the sidebar

### Feed

- Shared feed of every post, with the author's name, text, images and like count
- Write a post inline at the top of the feed, or from the **Post** button that opens a Material dialog
- Attach several images to a post, with previews before publishing
- The feed refreshes automatically after a post is published

### Post actions

- Like and unlike posts
- Edit a post's text in place
- Delete a post after a confirmation prompt

### Profile

- Lists the posts written by the signed-in user

---

## How It Works

```
 Angular client (localhost:4200)                         Postify API (localhost:8080)
 ───────────────────────────────                         ────────────────────────────
 RegisterComponent ──► UserService.addUser()       ──►  POST /user/subscribe
 LoginComponent    ──► UserService.authenticate()  ──►  POST /user/authenticate
        │                                                       │
        └── stores userId, nom, prenom in localStorage ◄── UserDto

 PostsComponent    ──► PostService.getAllPosts()   ──►  GET  /post/all
 AddPostDialog     ──► PostService.createPost()    ──►  POST /post/create  (multipart: authorId, content, images[])
 ProfileComponent  ──► PostService.getPostsByAuthorId() ► GET /post/author/{authorId}
        │
        └── renders imageURLs directly ──────────────────►  GET  /files/{name}
```

The client stores no files itself: the API returns ready-to-use media URLs (`http://localhost:8080/files/<name>`), which the templates put straight into `<img>` tags.

---

## Tech Stack

| Layer      | Technology                                                                 |
| ---------- | -------------------------------------------------------------------------- |
| Framework  | Angular 19 (NgModule-based components, Angular Router)                     |
| UI         | Angular Material 19 and Angular CDK (dialog, form fields, datepicker, tabs, sidenav, menu) |
| Forms      | Reactive Forms with built-in validators                                    |
| HTTP       | Angular `HttpClient` with RxJS 7 observables                               |
| Language   | TypeScript 5.6, SCSS                                                       |
| Testing    | Karma and Jasmine                                                          |
| Backend    | Spring Boot 3 + MongoDB ([mini-social-media-app](https://github.com/abdelhedy/mini-social-media-app)) |

---

## Pages and Routes

| Route            | Component           | Description                                   |
| ---------------- | ------------------- | --------------------------------------------- |
| `/`              | `FirstPageComponent`| Landing page with links to sign in or sign up |
| `/register`      | `RegisterComponent` | Sign-up form                                  |
| `/login`         | `LoginComponent`    | Sign-in form; redirects to `/home/posts`      |
| `/home`          | `HomeComponent`     | Shell with the sidebar, **Post** button and logout |
| `/home/posts`    | `PostsComponent`    | Shared feed: create, like, edit and delete posts |
| `/home/profile`  | `ProfileComponent`  | The signed-in user's posts                    |

---

## Project Structure

```
postify_material/
├── src/
│   ├── app/
│   │   ├── app.module.ts                  # Root module: Material modules, forms, HTTP
│   │   ├── app-routing.module.ts          # Route definitions
│   │   ├── first-page/                    # Landing page
│   │   ├── register/                      # Sign-up form
│   │   ├── login/                         # Sign-in form
│   │   ├── home/                          # Main shell: sidebar, post dialog, logout
│   │   ├── posts/                         # Feed, inline composer, likes, edit, delete
│   │   ├── add-post-dialog/               # "New post" Material dialog
│   │   ├── profile/                       # Signed-in user's posts
│   │   ├── layout/                        # Layout pieces (top bar, side panels)
│   │   ├── notification/ · recherche/     # Not routed yet (see Known Limitations)
│   │   └── shared/
│   │       ├── DTO/
│   │       │   ├── user.ts                # RegisterRequest, AuthenticationRequest, UserDto
│   │       │   └── post.ts                # PostCreateInput, PostUpdateInput, PostResponseDto
│   │       └── services/
│   │           ├── user.service.ts        # /user endpoints
│   │           └── post.service.ts        # /post endpoints
│   ├── assets/                            # Logo and images
│   ├── index.html
│   ├── main.ts
│   └── styles.scss                        # Global styles and Material theme
├── angular.json
├── package.json
└── tsconfig.json
```

---

## Getting Started

### Prerequisites

- **Node.js 18.19 or newer** (Node 20 LTS recommended). Angular CLI 19 refuses to start on older versions.
- npm (bundled with Node.js)
- The [Postify API](https://github.com/abdelhedy/mini-social-media-app) running on `http://localhost:8080`, with its MongoDB connection configured

The Angular CLI does not need to be installed globally: the npm scripts use the project's local copy.

### 1. Start the backend

Follow the [backend setup guide](https://github.com/abdelhedy/mini-social-media-app#getting-started), then check that it responds:

```bash
curl http://localhost:8080/post/all
```

It should return a JSON array (empty on a fresh database).

### 2. Clone and install

```bash
git clone https://github.com/MariemAbdennadher11/postify_material.git
cd postify_material
npm install
```

### 3. Run the app

```bash
npm start
```

Open **http://localhost:4200**. The app reloads automatically when you change a source file.

Keep the default port 4200: the API only accepts cross-origin requests from `http://localhost:4200`.

---

## Configuration

The API base URLs are set at the top of each service:

| File                                   | Constant  | Default                       |
| -------------------------------------- | --------- | ----------------------------- |
| `src/app/shared/services/user.service.ts` | `baseUrl` | `http://localhost:8080/user` |
| `src/app/shared/services/post.service.ts` | `baseUrl` | `http://localhost:8080/post` |

Change both if the API runs on another host or port. If the frontend runs on a different origin, also update the `@CrossOrigin` setting in the backend controllers.

---

## API Usage

The services call these API endpoints. The full reference, with request and response formats, is in the [backend README](https://github.com/abdelhedy/mini-social-media-app#api-reference).

| Service method                 | Request                                   |
| ------------------------------ | ----------------------------------------- |
| `UserService.addUser`          | `POST /user/subscribe`                    |
| `UserService.authenticate`     | `POST /user/authenticate`                 |
| `PostService.getAllPosts`      | `GET /post/all`                           |
| `PostService.getPostById`      | `GET /post/{postId}`                      |
| `PostService.getPostsByAuthorId` | `GET /post/author/{authorId}`           |
| `PostService.createPost`       | `POST /post/create` (`multipart/form-data`) |
| `PostService.updatePost`       | `PUT /post/{postId}`                      |
| `PostService.deletePost`       | `DELETE /post/delete/{id}`                |
| `PostService.addLike`          | `POST /post/{postId}/like/{userId}`       |
| `PostService.deleteLike`       | `DELETE /post/{postId}/dislike/{userId}`  |

---

## Available Scripts

| Command         | Description                                              |
| --------------- | -------------------------------------------------------- |
| `npm start`     | Start the dev server on `http://localhost:4200`          |
| `npm run build` | Production build into `dist/postify/`                    |
| `npm run watch` | Development build that rebuilds on file changes          |
| `npm test`      | Run the unit tests with Karma                            |

---

## Known Limitations

- **Feed and dialog use a fixed user ID.** `PostsComponent` and `AddPostDialogComponent` publish and like posts as a hardcoded `userId` instead of the signed-in user's ID from `localStorage`. The profile page already uses the signed-in user.
- **Images only.** The API accepts videos, but the post composer only lets users pick images.
- **No route guards.** `/home` pages can be opened without signing in.
- **Unfinished pages.** Search (`recherche/`) and notifications (`notification/`) exist as components but are not routed, and editing or deleting a post from the profile page is not wired up yet.

---

## Related Projects

- **[mini-social-media-app](https://github.com/abdelhedy/mini-social-media-app)**: Spring Boot 3 + MongoDB REST API for this frontend, by [@abdelhedy](https://github.com/abdelhedy)

---

## Authors

- [@MariemAbdennadher11](https://github.com/MariemAbdennadher11)
- **Yasmine Abdelhedi** · [@abdelhedy](https://github.com/abdelhedy)
- [@walaa407](https://github.com/walaa407)

Academic project (NoSQL databases), FSEGS.
