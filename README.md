# https://nathan.demasie.com

![Website status](https://img.shields.io/website-up-down-green-red/http/nathan.demasie.com.svg)
![GitHub Repo stars](https://img.shields.io/github/stars/ndemasie/ndemasie.github.io)
![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/ndemasie/ndemasie.github.io/deploy-ec2.yml)

![Tech stack](https://skillicons.dev/icons?i=nginx,docker,nodejs,ts,astro,svelte,react)

```mermaid
flowchart LR
  nathanSubDomain("nathan.demasie.com")

  nginx(nginx)
  click nginx "https://github.com/ndemasie/ndemasie.github.io/tree/main/apps/nginx" _blank

  %% Flow
  nathanSubDomain ---|3.123.185.1|nginx
  nginx ---|http://site-nathan:10100|siteNathan
  nginx ---|http://site-nathan:10100/edu-design-principles/proxy|codedamn
  nginx ---|http://server-i18next-websocket:10200|si18n

  wci18n -.->|ws|si18n -.->|ws|wci18n
  eduDesignPrinciples -.-> codedamn

  subgraph Site[fa:fa-browser Site]
    siteNathan(site-nathan)
    click siteNathan "https://github.com/ndemasie/ndemasie.github.io/tree/main/apps/site-nathan" _blank
    wci18n(webcontainer-i18next)
    click wci18n "https://github.com/ndemasie/ndemasie.github.io/tree/main/apps/webcontainer-i18next" _blank
    eduDesignPrinciples(edu-design-principles)
    click eduDesignPrinciples "https://github.com/ndemasie/ndemasie.github.io/tree/main/apps/edu-design-principles" _blank

    siteNathan --> eduDesignPrinciples
    siteNathan --> wci18n
  end

  subgraph Codedamn[fa:fa-browser Codedamn]
    codedamn(design-principles)
    click codedamn "https://codedamn.com/playground/qjHW2vXxppVc48uXH5UWv" _blank
  end

  subgraph Server[fa:fa-server Server]
    si18n(server-i18next-websocket )
    click si18n "https://github.com/ndemasie/ndemasie.github.io/tree/main/apps/server-i18next-websocket" _blank
  end
```