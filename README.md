# React-app-initializer

This project contains a script in javascript which initialize a react application based on:

- Create-react-app
- Typescript
- Scss
- Material UI

As prerequisites, you need to install `node`, `npm` and `npx`:

[Here](https://nodejs.org/en/download/) is the `node` installation documentation.

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

Notes:
In case of ERR401, be sure to target the right npm registry.
You can set it creating a `.npmrc` file in the root content of your user.
You can set it to target the public official npm registry by putting the following line in the `.npmrc` file:

```txt
registry=https://registry.npmjs.org
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
