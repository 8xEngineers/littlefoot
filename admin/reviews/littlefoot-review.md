# Littlefoot Overview

![Demo GIF](./assets/imgs/demo.gif)

## Introduction

**Littlefoot** is a lightweight JavaScript library designed to simplify the process of creating clickable buttons that automatically configure popovers to be fully visible across different browsers and devices.

## Design Decisions
- **Decision over Option Principle**: Littlefoot adheres to this principle by providing users with fewer options and requiring fewer steps to reach their destination, enhancing the overall user experience.
- **TypeScript**: The library is written in TypeScript, which enables a cleaner architecture and reduces the bundle size. In addition, TypeScript can ensure type safety and reduce potential runtime errors. This also improves the developer experience through autocompletion and type inference.
- **Responsive Design**: The footnote popover is automatically fixed to the bottom for smaller screens, such as mobile devices, ensuring optimal visibility.
- **Customization**: Users can customize the appearance of Littlefoot by overriding CSS custom properties.
- **No jQuery Dependency**: Unlike Bigfoot, Littlefoot does not require jQuery, making it a more lightweight solution.
- **Modular Design**: Using modular import and export will facilitate code splitting and optimization. This allows unused code (tree structure) to be omitted from the final build, thus helping to reduce the size of the bundle.
- **UMD and CJS Support**: The Rollup configuration outputs both UMD (for browsers) and CJS (for Node.js) formats. This allows littlefoot to be used in a variety of environments.

## Pattern
Littlefoot's design pattern is centered around providing a simple and efficient way to create clickable buttons with automatic popover configuration.

- **Build Process:**
   - The project uses Rollup as a module bundler, which is ideal for libraries because of its tree-shaking abilities. Plugins such as `@rollup/plugin-commonjs`, `@rollup/plugin-node-resolve`, and `@rollup/plugin-terser` further optimize the build process.
   - The build scripts include processes for bundling JavaScript, compiling TypeScript, and handling stylesheets.

- **Testing:**
   - Vitest is used for testing the code, with a jsdom environment configured. This is appropriate for testing DOM-related functionality.
   - The use of tests ensures code correctness, and the testing configuration reflects attention to robust development practices.

- **Tooling:**
   - `Biome` is used for code linting and formatting, ensuring that the codebase remains consistent.
   - Concurrently is used to run multiple commands in parallel, improving the efficiency of the development workflow.

- **Patterns:**
   - The code follows standard patterns such as modular imports, commonjs compatibility, and clean separation of concerns between different build processes and testing environments.
   - Code is organized in a clear and maintainable way, with separation between configuration, source code, and testing.
   - Code does not define any new classes. That simplfies code structure and makes debugging easy as well as lightens the transpiled JavaScript code.

## Language Usage
- **TypeScript**: (~80%) Used for the majority of the library's code, providing a clean and maintainable architecture.
- **HTML**: (~12%) Used for structuring the content and layout of the popovers.
- **CSS**: (~6%) Used for styling the popovers and customizing their appearance.
- **JavaScript**: (~2%) Used for handling user interactions and updating the popover content.

## Repository Organization and Quality
The Littlefoot repository is well-organized, with the following key files and folders:

- **`README.md`**: Contains essential information about the library, including installation instructions, usage examples, and configuration options.
- **`package.json`**: Lists the dependencies used by the library, along with their versions.
- **`CHANGELOG.md`**: Provides a version history of the library, highlighting changes and updates.
- **`.gitignore`**: Specifies files and folders that should be ignored by Git.
- **`/test`**: Contains test scripts for all methods used in the library.
- **`/src`**: Houses the source code for the library, including:
  - **`/dom`**: Defines the Document Object Model (DOM) for different items, such as events, footnotes, layout, and scroll, in TypeScript.
  - **`document.ts`**: Contains the main code for the library, including settings and user-interaction handling.
  - **`littlefoot.css`**: Styles the footnotes and popovers.
  - **`littlefoot.ts`**: Defines the main settings and configuration options for the library.
  - **`settings.ts`**: Specifies default settings for the library.
  - **`use-case.ts`**: Defines user interactions and responses.
- **`/cypress`**: Contains end-to-end integration test scripts written in Cypress.
- **`/.github/workflows`**: Defines the CI/CD pipeline for the library.

## Tool Quality
Littlefoot offers several features that enhance its tool quality:

- **Easy Integration**: Can be easily integrated with popular frameworks like WordPress and Gatsby, showcasing its flexibility.
- **Customization Options**: Provides multiple options, such as activation methods (click, hover), delay for activation, and dismissal.

## Copy feature added
Have added a copy button to copy the footnote content so that users can copy and paste it.
An area where users can use:
   -  Store it on their notes for later use
   -  Search for meaning in Google


## Issues with the code
In our experiments, we have found some issues with Littlefoot
- **Tight coupling in code** - Bigfoot allows us to modify the footnote appearance to any custom text as we saw in the Bigfoot section. However, this change breaks the Littlefoot code. The behavior is erratic depending on the HTML
## Conclusion
Littlefoot is a well-designed and lightweight JavaScript library that simplifies the process of creating clickable buttons with automatic popover configuration. Its use of TypeScript, responsive design, and customization options make it an attractive solution for developers.

### Key Points Highlighted:
- Emphasis on the importance of a clean and maintainable architecture.
- Clarification of the role of each technology used in the project.
- A structured approach to presenting the information for better readability and comprehension.

Feel free to ask if you need further modifications or additional details!