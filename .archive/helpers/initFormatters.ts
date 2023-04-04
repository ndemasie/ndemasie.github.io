import { Formatter, Language } from '@enums'

export function initFormatters() {
  const lang = document.querySelector('html')!.lang as Language

  const dateFormatter = new Intl.DateTimeFormat(lang, {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  })
  const minuteFormatter = new Intl.NumberFormat(lang, {
    style: 'unit',
    unit: 'minute',
    unitDisplay: 'long',
    maximumFractionDigits: 0
  })
  const relativeDateFormatter = new Intl.RelativeTimeFormat(lang, {
    style: 'narrow',
    numeric: 'auto'
  })

  document
    .querySelectorAll<HTMLElement>('[data-formatter][data-value]')
    .forEach((element) => {
      const { formatter, value } = element.dataset as { formatter: Formatter, value: string }
      const displayText = (() => {
        switch(formatter) {
          case Formatter.Minutes: return minuteFormatter.format(Number(value))
          case Formatter.DaysRelative: {
            if (Number.isNaN(new Date(value).getTime())) return value
            const daysSince = Math.floor((Date.now() - new Date(value).getTime()) / (1000 * 60 * 60 * 24))
            return daysSince < 21
              ? relativeDateFormatter.format(-daysSince, 'day')
              : dateFormatter.format(new Date(value))
          }
          default: return value
        }
      })()

      element.innerHTML = displayText
    })
}