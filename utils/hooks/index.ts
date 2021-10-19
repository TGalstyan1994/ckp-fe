import { StateType } from 'interfaces'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
// import type { RootState } from 'store'

export const useSelectorTyped: TypedUseSelectorHook<StateType> = useSelector
