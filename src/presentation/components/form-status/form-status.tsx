import { Spinner } from '@/presentation/components'
import React, { useContext } from 'react'
import Styles from './form-status-styles.scss'
import Context from '@/presentation/context/form-context'

const FormStatus: React.FC = () => {
  const { state, errorState } = useContext(Context)

  return (
    <div data-testid="error-wrap" className={Styles.errorWrap}>
      {state.isLoading && <Spinner className={Styles.spinner} />}
      {errorState.main && <span className={Styles.error}>{errorState.main}</span>}
    </div>
  )
}

export default FormStatus
