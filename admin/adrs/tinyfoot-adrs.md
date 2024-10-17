# Adding highlight feature to footnote

## Context and Problem Statement

We want to offer a feature that allows users to mark specific footnotes as important. This way, after closing the footnotes, users can easily return to the highlighted ones without having to click through each footnote to find the specific one they need.
The key design decision we need to make here is determining the best placement for this feature. We need to decide where and how users will interact with the option to highlight important footnotes for easy access later.

## Considered Options

- Add a button in the popup window
- Double click on the footnote button

## Pros and Cons of the Options

### Add a button in the popup window

- Good, because it's easy for the user to understand how to use it
- Bad, because it's harder to implement. We want to change the color of footnote button. If we add the button in popup, this action not only involve getting the popup window but also the element of footnote button.

### Double click on the footnote button

- Good, because it is easier to implement and improves code maintainability, we can place the highlight functionality in "events.ts," which already handles all the events for each footnote element. This ensures consistency and keeps the event management centralized.
- Bad, because users may not realize that the highlight feature exists unless we include it in the documentation or provide a tutorial.

## Decision Outcome

Chosen option: "Double click on the footnote button", because the cost of adding documentation or a tutorial is much lower than dealing with poor maintenance or a complex code architecture. Prioritizing simplicity and clarity in the code will ultimately save time and effort in the long run.

# Adding copy button in footnote popup
