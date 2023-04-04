---
author: Nathan DeMasie
tagKeys: [vscode, snippet]
datePublished: 2022-09-29
dateUpdated:
state: live
---

# IIFE Snippet

<img src="/blog-post/4qgx-snippet-iife/breadcrumb.png" alt="vscode snippet file breadcrumb" />

Hinzufügen zu deine Snippet-Konfiguration.

```json title="typescript.json"
"Immedietly Invoked Function Expression": {
  "description": "Immedietly Invoked Function Expression",
  "prefix": "iife",
  "body": [
    "(() => {",
    "  $1",
    "})()"
  ]
}
```
