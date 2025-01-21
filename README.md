# nathan.demasie.com

![Website status](https://img.shields.io/website-up-down-green-red/http/nathan.demasie.com.svg)

<!-- ![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/ndemasie/ndemasie.github.io/deploy-ec2.yml) -->

![Tech stack](https://skillicons.dev/icons?i=docker,cloudflare,nginx,nodejs,ts,astro,svelte,react)

```mermaid
%%{init: {'flowchart' : {'curve' : 'linear'}}}%%

flowchart TB
  domain("nathan.demasie.com")

  %% Flow
  domain ---cloudflared
  cloudflared ---nginx
  nginx ---|<div>site-nathan:10100</div>|site_nathan
  nginx ---|<div>server-i18next-websocket:10200</div>|server_i18next_websocket
  nginx ---|<div>app-habit-print:10300</div>|app_habit_print

  edu_i18next_react <-.->|ws|server_i18next_websocket
  site_nathan -->|/app-habit-print|app_habit_print
  edu_design_principles -.-> |/edu-design-principles/proxy|codedamn_design_principles

  subgraph DockerCompose[fa:fa-server Docker Compose]
    cloudflared(cloudflared)
    nginx(nginx)
    app_habit_print(app-habit-print)
    server_i18next_websocket(server-i18next-websocket)

    subgraph Site[fa:fa-browser Site]
      site_nathan(site-nathan)
      edu_i18next_react(edu-i18next-react)
      edu_design_principles(edu-design-principles)

      site_nathan --> edu_i18next_react
      site_nathan --> edu_design_principles
    end
  end

  subgraph External[fa:fa-browser External]
    codedamn_design_principles(codedamn-design-principles)
  end

  click domain "https://nathan.demasie.com" _blank
  click nginx "https://github.com/ndemasie/ndemasie.github.io/tree/main/packages/nginx" _blank

  click app_habit_print "https://github.com/ndemasie/ndemasie.github.io/tree/main/packages/app-habit-print" _blank
  click edu_design_principles "https://github.com/ndemasie/ndemasie.github.io/tree/main/packages/edu-design-principles" _blank
  click edu_i18next_react "https://github.com/ndemasie/ndemasie.github.io/tree/main/packages/edu-i18next-react" _blank
  click server_i18next_websocket "https://github.com/ndemasie/ndemasie.github.io/tree/main/packages/server-i18next-websocket" _blank
  click site_nathan "https://github.com/ndemasie/ndemasie.github.io/tree/main/packages/site-nathan" _blank

  click codedamn_design_principles "https://codedamn.com/playground/qjHW2vXxppVc48uXH5UWv" _blank
```
