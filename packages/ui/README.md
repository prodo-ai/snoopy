# Snoopy

<p className="markdown">
  <a href="https://circleci.com/gh/prodo-ai/snoopy/tree/master">
    <img
      src="https://circleci.com/gh/prodo-ai/snoopy/tree/master.svg?style=svg"
      alt="Current CircleCI build status."
    />
  </a>
  <a href="https://www.npmjs.org/package/@prodo-ai/snoopy">
    <img
      src="https://badge.fury.io/js/%40prodo-ai%2Fsnoopy.svg"
      alt="Current npm package version."
    />
  </a>
  <a href="https://spectrum.chat/snoopy">
    <img
      alt="Join the community on Spectrum"
      src="https://withspectrum.github.io/badge/badge.svg"
    />
  </a>
</p>

To get started, we recommend installing Snoopy with `yarn add --dev @prodo-ai/snoopy` or `npm install --save-dev @prodo-ai/snoopy`. Then you can run:

```shell
$ ./node_modules/.bin/snoopy
```

Alternatively, you can simply run this inside your project's root or source directory, but it might be slower:

```shell
$ npx @prodo-ai/snoopy
```

To interact with the UI, go to [localhost:3042/][local snoopy] (or a different port that the CLI will notify you about if this one is busy).

### Components

Snoopy will detect most exported components automatically.
If you find any that are missing, add `// @snoopy` above the export line to
display/preview/visualize it (and let us know so we can detect it in the future).
If you want Snoopy to ignore your component, put the `// @snoopy:ignore` tag
above the export line.

For pure components, you don't need to do anything else. If your component requires
props to be passed in, you will need to define examples.

Examples are defined in a separate `examples/` directory at the root of your
project (where your `package.json` file is). All source files in this directory
are searched, but the convention is to name the file `Component.example.jsx`).
The default export of this file is the component that the examples are for. All
other named exports are examples that will be displayed in the UI.

Here is a simple example:

```jsx
// src/components/Counter.tsx
import React from "react";

export default ({count}) => <p>{count}</p>;
```

```jsx
// examples/Counter.example.jsx
import Counter from "../src/components/Counter";

export default Counter;

export const count0 = <Counter count={0} />;
count0.title = "Count is 0";

export const count10 = <Counter count={10} />;
count10.title = "Count is 10";
```

You can also use Snoopy with TypeScript.

### Styles & Themes

If you use the `styled-components` ThemeProvider, you can also annotate your
exported themes with `// @snoopy:theme` to visualize your components in different
themes.

If you want to include any application-level CSS files, just put a `/* @snoopy:styles */` comment anywhere inside the file, and they will be applied to
all your examples.

## What is and isn't supported yet

We support many libraries and use cases, including:

- styled components with themes
- react-router
- hooks

Here's a list of things we don't support yet, most of which are on the roadmap:

- Redux
- React Context
- react-modal
- chroma.js (due to a chroma issue with parcel)
- some CSS attributes (for example absolute positioning)

There are a couple of cases where you may want to tweak something in your code
to get it fully working in Snoopy.

- Images should render in Snoopy, but if yours isn't, check how it's imported. If
  you're using `import * as image from ...` syntax, try replacing it with
  `import image from ...`.
- If you're seeing duplication, make sure you're not unintentionally running
  Snoopy on your build files.

## Examples

[Here](https://github.com/prodo-ai/snoopy/tree/master/examples/01-counter) is a
basic example of a Counter project set up for testing with Snoopy. In it, we test
the following components: `App`, `Button` and `Counter`.

We also test Snoopy with Snoopy, so you can check [our source
code](https://github.com/prodo-ai/snoopy/tree/master/packages/ui/src) directly.

## Contact

We'd love your feedback! You can reach us at [hello@prodo.ai][].

You can also talk to us directly on [Spectrum][spectrum].

[hello@prodo.ai]: mailto:hello@prodo.ai
[local snoopy]: http://localhost:3042
[spectrum]: https://spectrum.chat/snoopy
