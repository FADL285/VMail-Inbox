# VMail-Inbox

VMail-Inbox is a Gmail clone built using Vue 3 and JSON-server to serve the db.json file. This project is a part of the [Vue Mastery](https://www.vuemastery.com/courses/build-a-gmail-clone-with-vue3/) course, where you can learn about the new concepts in Vue 3 such as Composition API, Reactivity System, and Suspense Component.

![Project View](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2FBuildGmail1.opt.jpg?alt=media&token=904236ca-d1bb-4fc3-92df-7a05c04f5955)
![Project View](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2FBuildGmail2.opt.jpg?alt=media&token=2b2b2b0f-0b0f-4b0f-9b0f-8c1b2b2b2b2b)

## Features

- Check email
- Mark email as read or archived
- Navigation using keyboard shortcuts
- Perform bulk actions

## Tools and Packages

- [Vue 3](https://v3.vuejs.org/)
- [JSON-server](https://github.com/typicode/json-server)
- [Axios](https://github.com/axios/axios)
- [marked](https://github.com/markedjs/marked)

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin), or use [WebStorm](https://www.jetbrains.com/webstorm/)

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

### Clone the repo

```sh
git clone https://github.com/FADL285/VMail-Inbox.git
```

### Install dependencies

```sh
npm install
```

### Run json-server to serve data from db.json

> Note: You need to have [json-server](https://www.npmjs.com/package/json-server) installed globally
```sh
json-server --watch db.json
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Contributing

If you have any suggestions or bug fixes, please feel free to create a pull request.

## License

This project is licensed under the MIT License.
