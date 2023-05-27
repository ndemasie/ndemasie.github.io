import { useEffect } from 'react'
import { createReducerContext } from 'react-use'

export enum Role {
  Leader = 'leader',
  Participant = 'participant',
}

export type UserState = {
  id: string
  name: string | null
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
    name: null,
  },
)

const UserProviderSetup: React.FC<any> = ({ children }) => {
  const [, setUser] = useUserContext()

  useEffect(() => {
    const prompt = window.prompt('Please enter your name')

    // If punctuation symbol, then skip
    if (!prompt) return
    if (/[\p{P}]/.test(prompt)) return

    setUser({ name: prompt })
  })

  return children
}

const UserContextProvider: typeof UserProvider = ({ children }) => {
  return (
    <UserProvider>
      <UserProviderSetup children={children} />
    </UserProvider>
  )
}

export { useUserContext, UserContextProvider }
