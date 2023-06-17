import { css } from '@emotion/react'

export const styles = {
  container: css({
    position: 'relative',
    display: 'grid',
    grid: `
      "editor web-container" 1fr
      "editor terminal" 280px
      / 55% 45%
    `,
    top: '0',
    left: '50%',
    height: '80vh',
    width: '90vw',
    transform: 'translate(-50%, 0)',
  }),
  dialog: css({
    '::backdrop': {
      backgroundColor: 'hsl(250, 100%, 50%, 0.25)',
    },
    '> form': {
      display: 'flex',
      flexDirection: 'column',
      '> *': {
        marginBottom: '0.5em',
      },
    },
  }),
  editor: css({
    gridArea: 'editor',
    // minHeight: '640px',
    width: '100%',
  }),
  webContainer: css({
    gridArea: 'web-container',
    alignSelf: 'start',
    height: '100%',
    // minHeight: '380px',
    width: '100%',
    overflow: 'hidden',
    background: 'white',
  }),
  terminal: css({
    height: '280px',
    gridArea: 'terminal',
    alignSelf: 'end',
  }),
  footer: css({
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'center',
  }),
}
