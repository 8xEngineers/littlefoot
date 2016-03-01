# littlefoot.js

littlefoot is a lightweight JavaScript library that creates exceptional footnotes. It was forked from [Bigfoot.js](https://github.com/lemonmade/bigfoot/) by [Chris Sauve](http://cmsauve.com/projects) and does not require jQuery.

Simply include the code on your pages and footnotes will be detected automatically and improved in the following ways:

* Links to footnotes will be replaced with clickable/tappable buttons, making them substantially easier to hit.

* Footnote content will appear in a popover directly beside the footnote button when it is clicked/tapped, which cuts out the annoying bouncing around the page that footnotes typically result in.

* The active popovers will be resized and repositioned to ensure that they continue to be completely visible on-screen and aesthetically pleasing: this makes it perfect for mobile devices and responsive designs.

* Supports the markup generated by MultiMarkdown by default.

This project includes both the script itself and a default style to apply to the footnote button/content that are eventually generated. There are also a variety of additional styles that illustrate some of the possibilities for styling these components.

## Installation

Install using NPM:

```shell
$ npm install --save littlefoot
```

## Usage

The script will work with a wide array of markup, but you will need to make sure that your footnote content/link markup at least resembles the markup shown below, which is the format generated by MultiMarkdown:

```html
<!-- Links -->
<p>
    <sup id="fnref:1">
        <a href="#fn:1" rel="footnote">1</a>
    </sup>
</p>

<!-- Footnote List -->
<div class="footnotes">
    <ol>
        <li class="footnote" id="fn:1">
            <p>footnote. <a href="#fnref:1" title="return to article"> ↩</a><p>
        </li>
    </ol>
</div>
```
Once you've set up the appropriate markup, all you need to do is include the following in your code:

```javascript
var littlefoot = require('littlefoot')

littlefoot()
```

You can also configure the available options by passing an object literal, and you can store the return object to make use of some of the methods it makes available:

```javascript
var littlefoot = require('littlefoot')

var lf = littlefoot({
  deleteOnUnhover: false,
  preventPageScroll: false,
  hoverDelay: 250
})
```

You'll also want to include styles for the button and popovers, a number of which come with the script.

## Options

The script has many configurable options from having popovers instantiated on hover, to allowing multiple active footnotes, to setting specific timeouts for popover creation/deletion. It also returns an object that allows you to activate, remove, add breakpoints, and reposition popovers properly. All of these options and return functions are shown in detail at the script's [project page](http://www.bigfootjs.com/). You can also see a [demo of the project in action](http://www.bigfootjs.com/#demo) on the same page.

### `activateCallback`

Specifies a function to call on a footnote popover that is being activated (after it is added to the DOM). The function will be passed two arguments: the `popover` DOM element, and the `button` that was activated to show the popover. This option can be useful for adding additional classes or styling information on the popover.

Default: `null`

### `activateOnHover`

Specifies whether or not the footnote content will be activated when the associated button is hovered over.

Default: `false`

### `allowDuplicates`

Determines whether or not a footnote can be used as the content for multiple footnote buttons. Many content management systems will, on a blog's main page, load every article chronologically without any adjustments to the article markup. This can cause issues if multiple footnotes have the same ID: the footnote content is identified by the fragment identifier in the `href` attribute of the footnote link, so multiple identical IDs can result in the same footnote content being used for different footnote links. This option prevents this by using a footnote as the content for at most one footnote button.

Default: `false`

### `allowMultiple`

Specifies whether or not multiple footnote popovers can be active simultaneously.

Default: `false`

### `anchorPattern`

Specifies the pattern that must be matched by the anchor element's `href` attribute for it to be considered a footnote link. This is used in filtering all links down to just those with a footnote.

Default: `/(fn|footnote|note)[:\\-_\\d]/gi`

### `anchorParentSelector`

The selector for the parent of the footnote link. This is really only necessary when you want to get rid of that element --- for instance, when the link is inside a `sup` tag. This tag and the link itself will be joined together for attribute from which you can drawn in your markup for footnotes/buttons.

Default: `sup`

### `breakpoints`

An object containing information about breakpoints specified for your set of popovers. These breakpoints should be manipulated only by using the `addBreakpoint()` and `removeBreakpoint()` methods discussed in the methods section.

Default: `{}`

### `dismissOnUnhover`

Determines whether footnotes that were presented when hovering on a footnote button are removed once the footnote button or footnote popover is un-hovered.

Default: `false`

### `footnoteParentClass`

The class name for the containing element of the original footnote content. Typically, this will be a class on an `li` that contained the footnote. This element may be removed/hidden, depending on the option specified for `originalFootnotes` This string does not have to be an exact match --- the class names will simply be tested for whether they include this string.

Default: `'footnote'`

### `footnoteSelector`

The element that contains the footnote content. As noted above, this element may be hidden or deleted, and will be given the footnote-processed class once littlefoot has finished with it.

Default: `'li'`

### `hoverDelay`

If `dismissOnUnhover` is true, this specifies the amount of time (in milliseconds) that must pass after the footnote button/content is un-hovered before the footnote is removed.

Default: `250`

### `numberResetSelector`

A string representing the selector at which you would like the numbering of footnotes to restart to 1. For example, you may be using the numbered style of footnote and wish to have the numbers restart for each `<article>` on your main page with a class of `'article-container'` In this case, you would set this option to `'article.article-container'` (or an equivalent CSS selector). Leaving the option as undefined will simply number all footnotes on a given page sequentially.

Default: `null`

### `originalFootnotes`

Determines what action will be taken on the original footnote markup: `'hide'`, `'delete'`, or `'ignore'`.

Default: `'hide'`

### `popoverDismissDelay`

When the footnote content is being removed this option specifies how long after the active class is removed from the footnote before the element is actually removed from the DOM.

Default: `500`

### `popoverCreateDelay`

Sets a delay between the activation of the footnote button and the activation of the actual footnote content.

Default: `100`

### `positionContent`

Specifies whether or not the footnote popovers (and the popover tooltip, if it is included in the markup) should be positioned by the script.

If this option is true, the popover top of the footnote popover will be positioned at the middle (vertically) of the footnote button, while the left of the popover will be placed a distance from the (horizontal) middle of the button proportional to the footnote button's horizontal position in the window.

Default: `true`

### `preventPageScroll`

Determines whether or not, when scrolling past the end of a footnote whose content is taller than the vertical space available, the scroll event will propagate to the window itself.

Default: `true`

### `scope`

If any truthy value is provided, only the footnotes within the scope you define will be affected by the script. The scope should be a selector string, as you would typically use in jQuery. For example, setting a scope of `'.littlefoot-active'` would work only on those elements with an ancestor that has a class of `littlefoot-active`

Default: `null`

### `contentTemplate`

A Lodash template for the markup of the footnote content popovers. It's best not to change this too much; the script relies on the class names and hierarchy of the default markup to do its work. However, you can add information to the rendered markup by adding string literals or one or more of the following variables:

* `content`: The HTML markup of the original footnote.
* `number`: The footnote number (sequential ordering of all footnotes within an element matching the `numberResetSelector` option).
* `id`: The footnote identifier (sequential ordering of all footnotes on the page, starting from 1).

Default:

```html
<aside class="littlefoot-footnote is-positioned-bottom" data-footnote-number="<%= number %>" data-footnote-id="<%= id %>" alt="Footnote <%= number %>">
  <div class="littlefoot-footnote__wrapper">
    <div class="littlefoot-footnote__content">
      <%= content %>
    </div>
  </div>
  <div class="littlefoot-footnote__tooltip"></div>
</aside>
```

### `buttonTemplate`

A Lodash template for the markup of the footnote button. Again, try not to remove any elements from the markup, but add as much as you like. In addition to the first two variables shown in contentMarkup, the following variables are available:

* `escaped`: The escaped HTML markup of the original footnote.
* `id`: The footnote identifier (sequential ordering of all footnotes on the page, starting from 1).
* `number`: The footnote number (sequential ordering of all footnotes within an element matching the `numberResetSelector` option).
* `reference`: The footnote reference used to populate the ID attribute.

Default:

```html
<div class="littlefoot-footnote__container">
  <button class="littlefoot-footnote__button" id="<%= reference %>" data-footnote-number="<%= number %>" data-footnote-id="<%= id %>" alt="See Footnote <%= number %>" rel="footnote" data-littlefoot-footnote="<%= content %>">
    <svg class="littlefoot-footnote__button__ellipsis" viewbox="0 0 31 6" preserveAspectRatio="xMidYMid">
      <circle r="3" cx="3" cy="3" fill="white"></circle>
      <circle r="3" cx="15" cy="3" fill="white"></circle>
      <circle r="3" cx="27" cy="3" fill="white"></circle>
    </svg>
  </button>
</div>
```

## Methods

Running the function will return an object that can be stored and used to manipulate the footnote buttons/ content. The following methods are available in this return object:

### `close([footnotes, timeout])`

This function will close any footnote popovers matching the (string) selector provided for footnotes. timeout specifies the amount of time after the footnote's active class is removed before the element itself is removed. Either of these can be excluded; footnotes will default to all active footnotes, while timeout will default to the popoverDeleteDelay option.

### `activate([button])`

This will activate the footnote button (and its associated popover) matching the (string) selector provided for button. If the option to allow multiple footnotes is false, only the first matching footnote will be activated. By default, the first footnote button on the page will be activated.

### `addBreakpoint(size, [deleteDelay, removeOpen, trueCallback, falseCallback])`

This method creates a breakpoint at which time a function is to be run. The most common use for this is to change the footnotes from being positioned by the script to being bottom-fixed to the page (as is the case for this page). As such, the function is meant to make this particular use case as simple as possible.

Only the size parameter is required. You can pass it a simple string, like `'<2em'`, a string representing a valid media query, like `'(min-width: 300px)'`, or a `MediaQueryList` object.

`deleteDelay` determines how long (in milliseconds, as an integer) should be waited after removing an active popover on a breakpoint before reopening that footnote, and will default to the popoverDeleteDelay option value. `removeOpen` (boolean) specifies whether this removal should be performed at all. The final two arguments are the callbacks to run when the media query changes to matching and non-matching status, respectively. These callbacks will be passed the removeOpen parameter and a copy of the littlefoot object (for further footnote manipulation). The defaults will simply change the `activateCallback` option to a function that adds the fixed-bottom class to all footnote popovers.

The method will return an object specifying whether the breakpoint was added, the MediaQueryList object that was created, and the function that was attached as a listener to the media query.

### `removeBreakpoint(target[, callback])`

This function will remove the specified breakpoint. Breakpoints are identified by the target parameter, which can be either the string with which the breakpoint was initially created, or the MediaQueryList object returned as part of the addBreakpoint function.

Optionally, you can provide a callback to execute before the breakpoint is removed. If no callback is provided, the method will run the false callback function from when the breakpoint was initially created.

### `reposition()`

This function repositions all footnotes relative to their button.

### `getSetting(key)`

Returns the script setting matching the string provided for setting, if such a setting exists.

### `updateSetting(key, value)`

Updates the script setting matching the string provided for setting with newValue, or adds the option if none exists. In either case, the old value for the setting will be returned.

## License

MIT © [Chris Sauve](http://cmsauve.com/projects) and [Luís Rodrigues](https://goblindegook.com).
