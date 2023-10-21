# https://nathan.demasie.com

![GitHub Repo stars](https://img.shields.io/github/stars/ndemasie/ndemasie.github.io)
![GitHub Workflow Status (with event)](https://img.shields.io/github/actions/workflow/status/ndemasie/ndemasie.github.io/deploy-ec2.yml)

```mermaid
flowchart LR
  nginx(
    nginx
    &lt;img src&#61;&#39;https://skillicons.dev/icons?i&#61;nginx,docker&#39;&gt;
  )
  click nginx "https://github.com/ndemasie/ndemasie.github.io/tree/main/apps/nginx" _blank

  %% Flow
  nginx ---|http://homepage:10100|homepage
  nginx ---|http://server-i18next-websocket:10200|si18n

  wci18n -.-&gt;|ws|si18n -.-&gt;|ws|wci18n

  subgraph Site[
    fa:fa-browser
    Site
  ]
    homepage(
      homepage
      &lt;img src&#61;&#39;https://skillicons.dev/icons?i&#61;docker,astro,react,svelte&#39;&gt;
    )
    click homepage "https://github.com/ndemasie/ndemasie.github.io/tree/main/apps/homepage" _blank
    wci18n(
      webcontainer-i18next
      &lt;img src&#61;&#39;https://skillicons.dev/icons?i&#61;nodejs,react&#39;&gt;
    )
    click wci18n "https://github.com/ndemasie/ndemasie.github.io/tree/main/apps/webcontainer-i18next" _blank

    homepage --&gt; wci18n
  end

  subgraph Server[fa:fa-server Server]
    si18n(
      server-i18next-websocket
      &lt;img src&#61;&#39;https://skillicons.dev/icons?i&#61;docker,nodejs&#39;&gt;
    )
    click si18n "https://github.com/ndemasie/ndemasie.github.io/tree/main/apps/server-i18next-websocket" _blank
  end
```