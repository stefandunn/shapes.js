# Shapes.js Global State Management

This project takes the idea of [Recoil.js](https://recoiljs.org/)(no longer maintained) and [Jotai](https://jotai.org/) but simplifies it moreso to avoid any dependencies within React other than React itself. This means the project is very small, and be tree-shaken and do not require any Context providers to work.

A "Shape" is a small, primitive state which can be read or written much like any state in React. You can also create morphic shapes which derive their value from other shapes.

## Installation

Install by running

```shell
yarn i shapesjs-gsm
```

## Features:

### Use anywhere 🌎

Because this library does not require any Context providers, you can simply install the library and create states anywhere. You can even read and write values without the need for hooks.

#### Within components

```tsx
// Exported from another file to enable HMR.
export const nameShape = shape('');

// Main app
export function App() {
  const [name, setName] = useShape(nameShape);

  return (
    <>
      <input
        value={name}
        onChange={({ currentTarget: { value } }) => setName(value)}
      />
      My name is {name}
    </>
  );
}
```

#### Within helper functions

```typescript
export const updateName = (name: string) => nameShape.setValue(name);
```

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

### State Persistance through Storage 📦

Support for any [Storage](https://developer.mozilla.org/en-US/docs/Web/API/Storage) class to manage a persistant state of any shape.

You can modify the above to use localStorage to maintain the shape's value on page navigation.

```tsx
export const buttonCount = shape(0, window.localStorage);
```

You can use any custom storage class usage which implements `setItem` and `getItem` interfaces.

### Derivative state values

You can create a "shapeMorph" which is a state value (similar to how you may use `useMemo`) derived from values from given dependency updates.

For example:

```typescript
export const nameShape = shape('Fred');
export const ageShape = shape(55);
export const blurbShape = shapeMorph(
  (get) => {
    const name = get(nameShape);
    const age = get(ageShape);
    return `${name} is ${age} years old`;
  },
  [ageShape, nameShape],
);
```

The `blurbShape` above gives us short-cut access to `get`, a helper function which equates to `.getValue()` directly on a shape. We are able to retrieve the values of both `nameShape` and `ageShape` to derive a `blurbShape` which could be rendered to the page. You notice an array supplied to `shapeMorph` (`[ageShape, nameShape]`) and these signify when the derived value of the shapeMorph should re-calculate.

```tsx
export function App() {
  const [name, setName] = useShape(nameShape);
  const [age, ageShape] = useShape(ageShape);
  const blurb = useShapeValue(blurbShape);

  return (
    <>
      <input
        placeholder="Name"
        value={name}
        onChange={({ currentTarget: { value } }) => setName(value)}
      />
      <input
        type="number"
        placeholder="Age"
        value={age}
        onChange={({ currentTarget: { value } }) => setAge(value)}
      />
      <h1>{blurb}</h1>
    </>
  );
}
```

### Typescript support ✅

Typed for convenience.

### HMR ♻️

The library supports hot module reloading and maintains the values of the "shapes" (states) between HMR re-renders during development.
