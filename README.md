<div align="center">

  <!--<img src="assets/logo.png" alt="logo" width="200" height="auto" />-->
  <h1>Leffakirjasto</h1>
  
  <p>
    This is a personal project for a android app which you can add movies and tv shows to a firebase firestore and search for movies using the MovieDB API. This app is for us to know which movies and tv shows we own (Physically on DVD).
    Adding movies, deleting and editing (title) works.
    Searching for movies on the api works.
    Adding TV shows is not yet implemented
  </p>
</div>
<br />

<!-- Table of Contents -->
# :notebook_with_decorative_cover: Table of Contents

- [About the Project](#star2-about-the-project)
  * [Screenshots](#camera-screenshots)
  * [Tech Stack](#space_invader-tech-stack)
  * [Features](#dart-features)
  * [Color Reference](#art-color-reference)
- [Getting Started](#toolbox-getting-started)
  * [Prerequisites](#bangbang-prerequisites)
  * [Installation](#gear-installation)
  * [Running Tests](#test_tube-running-tests)
  * [Run Locally](#running-run-locally)
  * [Deployment](#triangular_flag_on_post-deployment)
- [Contact](#handshake-contact)
- [Acknowledgements](#gem-acknowledgements)

  

<!-- About the Project -->
## :star2: About the Project

<div>
  <p></p>
</div>

<!-- Screenshots -->
### :camera: Screenshots

<div align="center">
  <img src="https://github.com/SebuBergman/leffakirjasto/blob/main/assets/leffakirjasto.mp4" alt="screenshot"/>
</div>


<!-- TechStack -->
### :space_invader: Tech Stack

<details>
  <summary>Client</summary>
  <ul>
    <li><a href="https://reactnative.dev">React Native</a></li>
    <li><a href="https://www.typescriptlang.org">Typescript</a></li>
    <li><a href="https://redux.js.org">Redux</a></li>
  </ul>
</details>

<details>
  <summary>Database</summary>
  <ul>
    <li><a href="https://firebase.google.com">Firebase</a></li>
  </ul>
</details>

<!-- Features -->
### :dart: Features

- Movie list
- TV Show list
- Add movie & tv show
- Delete movie & tv show
- Edit movie & tv show title
- Edit tv show's owned seasons

<!-- Color Reference -->
### :art: Color Reference

| Color             | Hex                                                                |
| ----------------- | ------------------------------------------------------------------ |
| Primary Color | ![#121212](https://via.placeholder.com/10/121212?text=+) #121212 |
| Text Color | ![#FFFFFF](https://via.placeholder.com/10/#FFFFFF?text=+) #FFFFFF |


<!-- Getting Started -->
## 	:toolbox: Getting Started

<!-- Prerequisites -->
### :bangbang: Prerequisites

This project uses yarn as package manager

```bash
 yarn install
```

<!-- Installation -->
### :gear: Installation

Install my-project with yarn

```bash
  yarn install my-project
  cd my-project
```

<!-- Run Locally -->
### :running: Run Locally

Clone the project

```bash
  git clone https://github.com/SebuBergman/leffakirjasto.git
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  yarn install
```

Start the server

```bash
  yarn android
```


<!-- Build -->
### :triangular_flag_on_post: Build

To build this project

```bash
  eas build -p android --profile preview
```

<!-- Contact -->
## :handshake: Contact

Sebastian Bergman - https://www.instagram.com/sebu.bersman

Project Link: https://github.com/SebuBergman/leffakirjasto/


<!-- Acknowledgments -->
## :gem: Acknowledgements

Use this section to mention useful resources and libraries that you have used in your projects.

 - [Awesome README](https://github.com/matiassingers/awesome-readme)
 - [React Native docs]((https://reactnative.dev/docs/getting-started))
 - [React Cheat Sheet](https://www.freecodecamp.org/news/the-react-cheatsheet/)

