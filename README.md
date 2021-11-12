# React-app-initializer

This project contains a script in javascript which initialize a react application based on:

- Create-react-app
- Typescript
- Scss
- Material UI

As prerequisites, you need to install `node`, `npm` and `npx`:

[Here](https://nodejs.org/en/download/) is the `node`installation documentation.

```bash
npm install -g npm
```

```bash
npm install -g npx
```

Just start the script with node:

```bash
node initializer.js [path to your directory where you want your project folder] [your project name (uppercases are not allowed)]
```

Example:

```bash
node ./initializer.js /Users/rael/Documents/react-projects initialized-project
```

Or, you can set the initializer.js as an executable:

```bash
sudo chmod +x ./initializer.js
```

Then start it:

```bash
initializer.js [path to your directory where you want your project folder] [your project name (uppercases are not allowed)]
```

Example:

```bash
./initializer.js /Users/rael/Documents/react-projects initialized-project
```

The process needs a few minutes to finish.

Enjoy!
