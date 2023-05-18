import { useTranslation } from 'react-i18next'

export default function ObjectsAndArrays() {
  const { t, i18n } = useTranslation()

  i18n.addResourceBundle(i18n.language, 'translation', {
    tree: {
      branch: 'branch',
      squirrel: '🐿️',
      spider: '🕷️',
    },
    animals: ['🐓', '🐄', '🐐', '🐖', '{{pet}}'],
  })

  return (
    <dl id="objects-and-arrays">
      <dt>Arrays</dt>
      <dd>{t('animals')}</dd>
      <dd>{t('animals.2')}</dd>
      <dd>
        {t('animals', { pet: '🐶', joinArrays: ', ' })}
      </dd>
      <dd>{-t('animals', { returnObjects: true })}</dd>

      <dt>Objects</dt>
      <dd>{t('tree')}</dd>
      <dd>{-t('tree', { returnObjects: true })}</dd>
    </dl>
  )
}
