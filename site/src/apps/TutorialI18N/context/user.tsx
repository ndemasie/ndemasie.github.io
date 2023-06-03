import { useCallback, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { createReducerContext } from 'react-use'

import { styles } from '../styles'

export enum Role {
  Leader = 'leader',
  Participant = 'participant',
}

export type UserState = {
  id: string
  name: string
  role: Role
}

const [useUserContext, UserProvider] = createReducerContext(
  (state: UserState, payload: Partial<UserState>) => {
    const update = Object.entries(payload).reduce((acc, [key, value]) => {
      if (!acc.hasOwnProperty(key)) return acc
      if (acc[key] === value) return acc

      if (key === 'role' && !Object.values(Role).includes(value)) {
        return acc
      }

      acc[key] = value
      return acc
    }, state)

    return update as UserState
  },
  {
    id: Date.now().toString(),
    role: Role.Participant,
    name: '',
  },
)

const UserProviderSetup: React.FC<any> = ({ children }) => {
  const { t } = useTranslation()
  const [, setUser] = useUserContext()

  // Dialog
  const dialogRef = useRef<HTMLDialogElement>(null)

  const handleClick = useCallback((event) => {
    const rect = dialogRef.current!.getBoundingClientRect()
    if (
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom
    ) {
      dialogRef.current!.close()
    }
  }, [])

  const handleClose = useCallback(() => {
    const form = dialogRef.current!.querySelector('form')!
    const formData = Object.fromEntries(new FormData(form).entries())

    if (!formData?.name) return
    setUser({ name: formData?.name ?? '' })
  }, [setUser])

  useEffect(() => dialogRef?.current?.showModal())

  return (
    <>
      {children}

      <dialog
        css={styles.dialog}
        ref={dialogRef}
        onClose={handleClose}
        onClick={handleClick}
      >
        <form method="dialog">
          <label htmlFor="input-name">{t('field_name_instructions')}</label>
          <input id="input-name" name="name" type="text" />
          <button type="submit">{t('common:accept')}</button>
        </form>
      </dialog>
    </>
  )
}

const UserContextProvider: typeof UserProvider = ({ children }) => {
  return (
    <UserProvider>
      <UserProviderSetup children={children} />
    </UserProvider>
  )
}

export { useUserContext, UserContextProvider }
