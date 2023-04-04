---
author: Nathan DeMasie
tagKeys: [vscode, keybind, keyboard_shortcut]
datePublished: 2022-09-26
dateUpdated:
state: live
---

# VSCode PageUp/PageDown Tastenbelegung

Zwei großartige VSCode-Benutzertastaturbindungen sind mit PageUp und PageDown. Du kanst diese so einstellen, dass der Cursor um 10 Zeilen verschoben wird, um sich schnell durch eine Datei sprining kann, ohne Maus. 

- <kbd>↓</kbd> / <kbd>↑</kbd> - eine Ziele verschieben
- <kbd>PageUp</kbd> / <kbd>PageDown</kbd> - 10 Zielen verschieben
- <kbd>Cmd</kbd> + <kbd>↓</kbd> / <kbd>Cmd</kbd> + <kbd>↑</kbd> - zum Anfang oder Ende der Datei springen

Um diese Bindungen hinzuzufügen, offnen <b>Preferences: Open Keyboard Shortcuts (JSON)</b> durch die VSCode command palette (<kbd>Shift</kbd> + <kbd>Cmd</kbd> + <kbd>p</kbd>)

<img src="/blog-post/4qgu-vscode-page-keybinding/vscode-cmd-pallet-search.png" width="260" alt="vscode command pallet search" />

dann fügt den folgenden JSON in der `keybindings.json` hinzu.

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
