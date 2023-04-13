import i18n from '@/i18n'

export function translateTitle(title) {
  const { t, te } = i18n.global
  if (te(`umsI18n.${title}`)) return t(`umsI18n.${title}`)
  return title
}
