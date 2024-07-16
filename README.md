# Shapes.js Global State Management

This project takes the idea of Recoil.js and Jotai but simplifies it moreso to avoid any dependencies within React other than React itself. This means the project is very small, and be tree-shaken and do not require any Context providers to work.

## Installation

Install by running

```shell
yarn i shapesjs
```

## Features:

### Use anywhere 🌎

Because this library does not require any Context providers, you can simply install the library and create states anywhere. You can even read and write values without the need for hooks.

### Familiar syntax 💪

The library uses very similar syntax to `React.useState` so it's super easy to pick up.

A simple example:

```tsx
// Exported from another file to enable HMR.
export const buttonCount = shape(0);

// Main app
export function App() {
  const [count, setCount] = useShape(buttonCount);

  const increment = () => setCount((i) => i + 1);

  return <button onClick={increment}>Button has been click {count} times</button>;
}
```

### HMR ♻️

The library supports hot module reloading and maintains the values of the "shapes" (states) between HMR re-renders during development.
