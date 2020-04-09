# Drag and Drop Playground
## Overview

There were incompatibalities with two components we are using - one inside our app, and another used in Cypress. To figure out what was going on, I created this playground. This is a simple Svele app to test the interactions of:

*  [silverwind/uppie: Cross-browser directory and multi-file upload library](https://github.com/silverwind/uppie)

and:

* [abramenal/cypress-file-upload: File upload testing made easy](https://github.com/abramenal/cypress-file-upload#readme)

It uses local, forked copies of each.
## Results
### `uppie`
I identified one problem with `uppie`, and created a PR against it:

* [Fix file drag-n-drop for Chrome by knotthere · Pull Request #11 · silverwind/uppie](https://github.com/silverwind/uppie/pull/11)

Chrome (WebKit) does not implement `dataTransferItem.webkitGetAsEntry`, though it is present.

This causes `uppie` to ignore the drop when it comes during Cypress test runs aided by `cypress-file-upload`.

### `cypress-file-upload`
This Cypress plugin either needs to be updated to implement `dataTransferItem.webkitGetAsEntry`, or `uppie` needs to be updated as noted above for single file drag and drop to work during test runs.

Here is a potential fix here instead of `uppie`:
* [Comparing abramenal:master...knotthere:knottl/Fix_file_drop · abramenal/cypress-file-upload](https://github.com/abramenal/cypress-file-upload/compare/master...knotthere:knottl/Fix_file_drop)

## Folder Drag and Drop
With `uppie`, folder drag and drop is handled as an array of files.

For tests to be added, a new Cypress command needs to be created. `cypress-file-upload` currently only handles one file.

Here are potential enhancements to this plugin to support folder drag and drop:
* [Comparing abramenal:master...knotthere:knottl/Support_Directory_Drop · abramenal/cypress-file-upload](https://github.com/abramenal/cypress-file-upload/compare/master...knotthere:knottl/Support_Directory_Drop)

# Origins

[Svelte App](./Svelte_App.md)
