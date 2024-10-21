---
layout: default
title: Bigfoot (no, not the creature that is very real)
description: Our take on the original library
permalink: /bigfoot
---

# Bigfoot.js Overview

## Introduction
[**Bigfoot.js**](https://bigfootjs.com) is a lightweight JavaScript library designed to enhance the handling of footnotes in web applications. By enabling users to view footnotes through interactive, clickable buttons, Bigfoot.js significantly improves both readability and aesthetic appeal.

## Design Decisions
Developed over 9 years ago, Bigfoot relies on **[Coffeescript](coffeesc…)** and **[SCSS](https://sass-lang.com)** for its core functionality. These files generate the necessary CSS and JavaScript code for the library. It must be noted that these pipelines have now been replaced with more convenient and modern tools. For example, [Littlefoot](http://littlefoot.js.org/) uses Typescript to build the required files and can be built using [`npm`](https://www.npmjs.com).

We tried to reason the decision of choosing Coffeescript instead of native Javascript for the plugin. Coffeescript is a more readable and concise language with less punctuation, function binding and syntactic sugar, which are all beneficial for developers. These could be some of the reasons why the authors chose Coffeescript for building the plugin. However, Coffeescript has its own issues - it has a steep learning curve for new users and it is not as popular as the other alternatives ([Typescript](https://www.typescriptlang.org), [Babel](https://babeljs.io), etc) in the present.

Furthermore, we note the following points -
- **Dependency on jQuery**: Bigfoot.js leverages jQuery for efficient DOM manipulation, event handling, and traversal.
- **Customizability**: The library allows for extensive customization through CSS/SCSS overrides, enabling users to tailor the appearance of footnotes to fit their specific design needs.

The main scripts for the plugin have been written in a _single file_ (not a great decision for modularity) and have been heavily documented providing the users with various customization options. The users can directly add the relevant CSS and add customization options in the Javascript call to Bigfoot to create the desired output. However, if a user requires a more complex setup that requires changing the source code, they have to go through the build process through Coffeescript which is outdated of sorts. 

The architecture of the code has been discussed more specfically in [the next section](#code-organization-and-quality).

## Code Organization and Quality
We have noted the following qualities in the code -
- **Consistent Naming Conventions**: The well-maintained naming conventions within the codebase help users understand the contents and purpose of each file.
- **Cross-Browser Compatibility**: The library is designed to function seamlessly across various web browsers and devices, supporting a variety of platforms with different window sizes.
- **Aesthetic Design**: The CSS focusses on having an aesthetic design, that probably gained the popularity for the library.


The root folder of Bigfoot.js contains the following files:
- **`README.md`**: Provides essential information about the `Bigfoot.js` library, including installation instructions and relevant details for users.
- **`bower.json`**: Manages library dependencies using Bower, specifying the required jQuery version and containing project metadata.
- **`readme-dev.md`**: Offers guidance for developers on how to contribute to or modify the Bigfoot.js library.
- **`dist` folder**: This folder is generated as a result of the build process. It contains the following files:
  - **`bigfoot.js`**: The source code for the library.
  - **`bigfoot.min.js`**: A minified version of `bigfoot.js`, optimized by removing whitespace and comments to reduce file size.
  - **`bigfoot-default.css`**: Contains the default styles for footnote display on webpages.
  - **`bigfoot-default.scss`**: The SCSS version of the default CSS file, allowing users to utilize SASS features like variables and nesting for better style customization.
  - **`src` folder**: Houses the source files for CoffeeScript and SCSS, which are compiled into JavaScript and CSS files using Grunt. More specifically, we have the Coffeescript file (`bigfoot.coffee`) and the SCSS files for different styling options.

As part of the build process, Grunt automates repetitive tasks, including:
- **Compiling CoffeeScript**: Converting `bigfoot.coffee` into JavaScript (`bigfoot.js`).
- **Compiling SCSS**: Transforming SCSS files into CSS, mapping source files to their compiled counterparts.
- **Concatenation**: Combining multiple SCSS files, including base styles and variants.
- **Autoprefixing**: Automatically adding vendor prefixes to the compiled CSS for broader compatibility.
- **Minification**: Using Uglify to compress the compiled JavaScript (`bigfoot.js`) into a smaller file (`bigfoot.min.js`), enhancing performance.

### Modernization Considerations
- **Dependency Management**: Currently utilizing Bower for dependency management, specifically for jQuery. However, Bower has been deprecated and is no longer maintained. Transitioning to more modern tools like NPM or Yarn for dependency management is advisable.
- **`bower.json`**: Specifies a dependency on jQuery version 1.8.0 or higher and organizes project metadata, defining the entry point as `bigfoot.coffee`. It also includes an 'ignore' section to prevent unnecessary files from being installed.

## Code Modifications 
We experimented with the plugin to explore the customization options and limitations in the plugin.
### Making modification
To build the modified version of the plugin, run the following commands to make your own build after modifying `bigfoot.coffee` file in the source folder
```
    npm install 
    npm install -g grunt-cli
    npm install grunt --save-dev
    grunt
```
By executing these installation and compilation instructions, Grunt will automatically complete the compilation of the bigfoot.coffee file according to the configuration of Gruntfile.coffee.

### Our Modifications

<div class="app">
    <div class="card">
      This is an important paragraph of text that the popover should not block. Here is the footnote
      <sup id="fnref:3"><a href="#fn:3" id="fnref:3" rel="footnote">3</a></sup>
      And there is an important quote that should not be blocked by the popover.
      <h1 class="heading1">Advice shows up here</h1>
      
      <button class="button" onclick="app.fetchAdvice()">I need more advice!</button>
    </div>
</div>
  


Experimenting with this simple example, we have the following observations
- Bigfoot indeed provides an easy interface for users to add customizable pop-over footnotes to their website with ease
- There are plenty of customization options including scope of footnote, appaerance, user-interaction behaviour, etc.
- Eventhough the code is well-documented, it is difficult to add modifications since it is not modular.
- The code has some good engineering practices -
    - It uses a consistent naming convention
    - It uses variable names instead of hard-coded values in SCSS 
- Although the plugin does not have any bugs, some parts of the source code seem like "band-aid" solutions to the problems. For example, we noticed this part of the code - 
    ```
      anchorParentTagname : 'sup'
    ```
    This part essentially is trying to replace the `<sup>` tags around the footnotes so that its effects are removed. If there are other tags like `<sub>`, then their effects would still be rendered with the footnotes. See below - 

    This footnote embedded with &lt;sup&gt; is displayed normally - <sup id="fnref:1"><a href="#fn:1" id="fnref:1" rel="footnote">1</a></sup> but the one with &lt;sub&gt; is in the subscript - <sub id="fnref:2"><a href="#fn:2" id="fnref:2" rel="footnote">2</a></sub> </p>

    Apart from these, there are other issues such as unused variables..

    Moreover, we also identified some coding practices that could have potential improvement. For example, we notices that in the `bigfoot-popover.scss` there are several instance of hardcoded value and magic numbers such as:
    ```
    margin: ((1.4142135624 * $popover-tooltip-size / 2) + $button-height + $popover-margin-top) 0;
    ```
    Where the number `1.4142135624` is derived from squre root of 2 to calculate the diagonal length. While the value is correct used, it is better to assign this value to a named variable for readability and maintenance, for example:
    ```
    $diagonal-ratio: 1.4142135624;
    margin: (($diagonal-ratio * $popover-tooltip-size / 2) + $button-height + $popover-margin-top) 0;
    ```
    
    Additionally, for the below code snippet in `bigfoot.coffee`：
  
    ```
    if typeof (size) == "string"
        # Repalce special strings with corresponding widths
        s = if size.toLowerCase() == "iphone"
          "<320px"
        else if size.toLowerCase() == "ipad"
          "<768px"
        else
          size
    ```
    The specific pixel values of `320px` and `768px` are based on the older model of `iphone` and `ipad` screen size. This might be problemetic with todays models, especially the new released models with much higher resolutions and different aspect ratios. Such breakpoint should be using relatives units like `em`,`rem`, or `%` that can scale naturally according to the screen size and resolution.

### Our modification
The modification made to the working of bigfoot are,
- Changes in Font size.
- Changes in color of text, button and background container.
- Changes in the button type and appearance.
- Incorporating the drag and drop feature, where the user can drag and move the footnote and place it elsewhere for better readability. 

## Conclusion
Bigfoot.js presents a well-structured and modular approach to footnote management in web applications. While it effectively serves its purpose, transitioning to modern tools for dependency management and build processes could enhance its performance and maintainability.

<div>
    <ul>
        <li id="fn:1">
            This is a footnote.
        </li>
        <li id="fn:2">
            This is another footnote.
        </li>
        <li id="fn:3">
        This is an extremely long footnote that blocks the content on the page. 
        A user should be able to drag this footnote to a new location on the page so that it does not block the content.
        So click on the footnote and drag it to the right.
        </li>

    </ul>
</div>