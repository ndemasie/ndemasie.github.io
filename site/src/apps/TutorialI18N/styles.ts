import { css } from '@emotion/react'

export const styles = {
  container: css({
    position: 'relative',
    display: 'grid',
    grid: `
      "editor web-container" 70%
      "editor terminal" 30%
      / 55% 45%
    `,
    top: '0',
    left: '50%',
    height: '80vh',
    width: '90vw',
    transform: 'translate(-50%, 0)',
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
    // maxHeight: '240px',
    gridArea: 'terminal',
    alignSelf: 'end',
  }),
  footer: css({
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'center',
  }),
}
