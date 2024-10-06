# nathan.demasie.com

![Website status](https://img.shields.io/website-up-down-green-red/http/nathan.demasie.com.svg)
![GitHub Repo stars](https://img.shields.io/github/stars/ndemasie/ndemasie.github.io)

<!-- ![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/ndemasie/ndemasie.github.io/deploy-ec2.yml) -->

![Tech stack](https://skillicons.dev/icons?i=nginx,docker,nodejs,ts,astro,svelte,react)

```mermaid
%%{init: {'flowchart' : {'curve' : 'linear'}}}%%

flowchart TB
  nathanSubDomain("nathan.demasie.com")

  nginx(nginx)
  click nginx "https://github.com/ndemasie/ndemasie.github.io/tree/main/packages/nginx" _blank

  %% Flow
  nathanSubDomain ---|Cloudflare Tunnel|nginx
  nginx ---|http://server-i18next-websocket:10200|server_i18next_websocket
  nginx ---|http://site-nathan:10100|site_nathan
  nginx ---|http://site-nathan:10100/edu-design-principles/proxy|codedamn_design_principles

  edu_i18next_react <-.->|ws|server_i18next_websocket
  edu_design_principles -.-> codedamn_design_principles

  subgraph Server[fa:fa-server Server]
    server_i18next_websocket(server-i18next-websocket )
    click server_i18next_websocket "https://github.com/ndemasie/ndemasie.github.io/tree/main/packages/server-i18next-websocket" _blank
  end

  subgraph Site[fa:fa-browser Site]
    site_nathan(site-nathan)
    click site_nathan "https://github.com/ndemasie/ndemasie.github.io/tree/main/packages/site-nathan" _blank
    edu_i18next_react(edu-i18next-react)
    click edu_i18next_react "https://github.com/ndemasie/ndemasie.github.io/tree/main/packages/edu-i18next-react" _blank
    edu_design_principles(edu-design-principles)
    click edu_design_principles "https://github.com/ndemasie/ndemasie.github.io/tree/main/packages/edu-design-principles" _blank

    site_nathan --> edu_i18next_react
    site_nathan --> edu_design_principles
  end

  subgraph External[fa:fa-browser External]
    codedamn_design_principles(codedamn-design-principles)
    click codedamn_design_principles "https://codedamn.com/playground/qjHW2vXxppVc48uXH5UWv" _blank
  end
```
