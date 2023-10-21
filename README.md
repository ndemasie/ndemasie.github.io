# https://nathan.demasie.com

![GitHub Repo stars](https://img.shields.io/github/stars/ndemasie/ndemasie.github.io)
![GitHub Workflow Status (with event)](https://img.shields.io/github/actions/workflow/status/ndemasie/ndemasie.github.io/deploy-ec2.yml)

```mermaid
flowchart LR
  nginx(fa:fa-server nginx fa:fa-docker)
  click nginx "https://github.com/ndemasie/ndemasie.github.io/tree/main/apps/nginx" _blank

  %% Flow
  nginx ---|http://homepage:10100|homepage
  nginx ---|http://server-i18next-websocket:10200|si18n

  wci18n -.->|ws|si18n -.->|ws|wci18n

  subgraph Site[fa:fa-browser Site fa:fa-docker]
    homepage(homepage fa:fa-node-js)
    click homepage "https://github.com/ndemasie/ndemasie.github.io/tree/main/apps/homepage" _blank
    wci18n(webcontainer-i18next fa:fa-docker fa:fa-node-js)
    click wci18n "https://github.com/ndemasie/ndemasie.github.io/tree/main/apps/webcontainer-i18next" _blank

    homepage --> wci18n
  end

  subgraph Server[fa:fa-server Server]
    si18n(server-i18next-websocket fa:fa-docker fa:fa-node-js)
    click si18n "https://github.com/ndemasie/ndemasie.github.io/tree/main/apps/server-i18next-websocket" _blank
  end
```