# Contribution Guidelines
Pull requests are encouraged and always welcome. [Pick an issue](https://github.com/Rakish-Labs/imbuejs-color/issues) or select an item on our [roadmap](https://github.com/Rakish-Labs/imbuejs-color#roadmap) and help us out!

To install and work on @imbuejs/color locally:
```
git clone https://github.com/Rakish-Labs/imbuejs-color.git
cd imbuejs-color
pnpm install
```

To build the compiler and all the other modules included in the package:
```
pnpm build
```

To watch for changes and continually rebuild the package (this is useful if you're using npm link to test out changes in a project locally):
```
pnpm dev
```

## Running Tests
We strive for 100% test coverage, so PRs won't be approved unless all lines are coveered. Generally, this doesn't mean that every file must be tested; most coverage comes from simply instantiating the `Color` class and calling whatever method or getter/setter you're working on, and expecting the correct results.
```
pnpm test:watch
```
This starts a `nodemon` watcher that watches the `src` and `tests` directories that reruns all test suites and prints coverage. `uvu` is the fastest test-runner in the JavaScript landscape, so it's nbd!
