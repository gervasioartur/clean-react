import { Spinner } from '@/presentation/components'
import React, { useContext } from 'react'
import Styles from './form-status-styles.scss'
import Context from '@/presentation/context/form-context'

const FormStatus: React.FC = () => {
  const { state } = useContext(Context)
  const { isLoading, mainError } = state

  return (
    <div data-testid="error-wrap" className={Styles.errorWrap}>
      {isLoading && <Spinner className={Styles.spinner} />}
      {mainError && <span data-testid='main-error' className={Styles.error}>{mainError}</span>}
    </div>
  )
}

export default FormStatus
