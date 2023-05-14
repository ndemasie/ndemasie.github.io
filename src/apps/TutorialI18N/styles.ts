import { css } from '@emotion/react'

export const styles = {
  app: {
    container: css({
      position: 'relative',
      display: 'grid',
      top: '0',
      left: '50%',
      height: '80vh',
      width: '90vw',
      transform: 'translate(-50%, 0)',
      grid: `
      "editor web-container" 70%
      "editor terminal" 30%
      / 55% 45%
    `,
    }),
    editor: css({
      gridArea: 'editor',
      minHeight: '640px',
      maxHeight: '800px',
      width: '100%',
    }),
    webContainer: css({
      gridArea: 'web-container',
      minHeight: '380px',
      height: '100%',
      width: '100%',
      background: 'white',
      alignSelf: 'start',
    }),
    terminal: css({
      maxHeight: '240px',
      gridArea: 'terminal',
      alignSelf: 'end',
    }),
  },

  // Legacy
  container: css({
    display: 'grid',
    grid: `
      "question-title answer-title"
      "question-content answer-content"
      / 70% 1fr
    `,
    gap: '1em',
    alignItems: 'center',
    justifyContent: 'center',
  }),
  answerTitle: css({
    gridArea: 'answer-title',
    margin: 'auto',
  }),
  answerCard: css({
    '--animate-duration': '0.5s',
    gridArea: 'answer-content',
    height: '100%',
    width: '100%',
    borderRadius: '18px',
    ['> div']: {
      fontSize: '18px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'start',
      padding: '1em',
      height: '100%',
      overflowX: 'auto',
    },
  }),
  questionTitle: css({
    gridArea: 'question-title',
    margin: 'auto',
  }),
  questionCard: css({
    '--animate-duration': '0.5s',
    gridArea: 'question-content',
    ['> pre']: {
      margin: 0,
    },
  }),
  codeblock: css({
    borderRadius: '18px',
  }),
  footer: css({
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'center',
  }),
}
