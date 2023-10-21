# https://nathan.demasie.com

![GitHub Repo stars](https://img.shields.io/github/stars/ndemasie/ndemasie.github.io)
![GitHub Workflow Status (with event)](https://img.shields.io/github/actions/workflow/status/ndemasie/ndemasie.github.io/deploy-ec2.yml)

```mermaid
flowchart LR
  nginx(fa:fa-twitter nginx)
  click nginx "apps/nginx" _blank

  %% Flow
  nginx ---|http://homepage:10100|homepage
  nginx ---|http://server-i18next-websocket:10200|si18n

  wci18n -.->|ws|si18n -.->|ws|wci18n

  subgraph Site[fa:fa-browser Site]
    homepage(homepage fa:fa-node-js)
    click homepage "apps/homepage" _blank
    wci18n(webcontainer-i18next fa:fa-node-js)
    click wci18n "apps/webcontainer-i18next" _blank

    homepage --> wci18n
  end

  subgraph Server[fa:fa-server Server]
    si18n(server-i18next-websocket fa:fa-node-js)
    click si18n "apps/server-i18next-websocket" _blank
  end
```