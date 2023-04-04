---
author: Nathan DeMasie
tagKeys: [vscode, keybind, keyboard_shortcut]
datePublished: 2022-09-26
dateUpdated:
state: live
---

# VSCode PageUp/PageDown keybinding

Two great VSCode user keybindings are with PageUp and PageDown. You can set theses to move the cursor by 10 lines to quickly move through a file without using a mouse. 

- <kbd>↓</kbd> / <kbd>↑</kbd> - move one line
- <kbd>PageUp</kbd> / <kbd>PageDown</kbd> - move 10 lines
- <kbd>Cmd</kbd> + <kbd>↓</kbd> / <kbd>Cmd</kbd> + <kbd>↑</kbd> - move to top or bottom of file

To add these bindings, open <b>Preferences: Open Keyboard Shortcuts (JSON)</b> through the VSCode command palette (<kbd>Shift</kbd> + <kbd>Cmd</kbd> + <kbd>p</kbd>)

<img src="/blog-post/4qgu-vscode-page-keybinding/vscode-cmd-pallet-search.png" width="260" alt="vscode command pallet search" />

then add the following JSON to `keybindings.json`.

```json title="keybindings.json"
[
  ...
  {
    "key": "pageup",
    "command": "cursorMove",
    "args": {
      "to": "up",
      "by": "line",
      "value": 10
    },
    "when": "editorTextFocus"
  },
  {
    "key": "pagedown",
    "command": "cursorMove",
    "args": {
      "to": "down",
      "by": "line",
      "value": 10
    },
    "when": "editorTextFocus"
  }
]
```
