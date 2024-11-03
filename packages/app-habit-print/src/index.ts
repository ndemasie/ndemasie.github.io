import bodyParser from 'body-parser'
import express from 'express'
import { create } from 'express-handlebars'
import helmet from 'helmet'

import { fileURLToPath } from 'url'

import { getCalendarData } from './middleware/getCalendarData.ts'
import { getConfig } from './middleware/getConfig.ts'
import { getEventByName } from './middleware/getEventByName.ts'

const PORT = process.env.PORT || 10300

const app = express()

// Setup
const hbs = create({
  defaultLayout: 'main',
  extname: '.hbs',
  helpers: {
    eq: (a, b) => a === b,
    times: (n, block) => {
      let accum = ''
      for (let i = 0; i < n; ++i) {
        block.data.index = i
        block.data.first = i === 0
        block.data.last = i === n - 1
        accum += block.fn(this)
      }
      return accum
    },
    getHour: (a) => new Date(a).getHours(),
    getDay: (a) => new Date(a).getDay(),
    getDate: (a) => new Date(a).getDate(),
    getMonth: (a) => new Date(a).getMonth(),
    getYear: (a) => new Date(a).getFullYear(),
  },
})
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', fileURLToPath(new URL('./', import.meta.url) + 'views'))

// Parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Security
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        'script-src': ["'self'", "'unsafe-inline'"],
        'script-src-elem': ["'self'", "'unsafe-inline'"],
        'connect-src': ["'self'"],
      },
    },
  }),
)

// Routes
app.get(
  '/config/:configId/week/:week',
  [getConfig, getCalendarData, getEventByName],
  (req, res) => {
    res.locals.days = Array.from({ length: 31 }, (_, i) => i).slice(14, 21)
    res.render('calendarWeek')
  },
)

// Static
app.use(
  express.static(fileURLToPath(new URL('./', import.meta.url) + 'public')),
)

// Start server
app.listen(PORT, () =>
  console.log(
    `Express started on http://localhost:${PORT}\nPress Ctrl-C to terminate.`,
  ),
)
