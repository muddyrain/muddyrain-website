import { FC } from 'react'
import { Loading } from '../Loading'

export const LoadingBox: FC<{
  className?: string
  loadingClassName?: string
  children?: React.ReactNode
  loading?: boolean
  component?: React.ReactNode
}> = ({ className, children, loading, loadingClassName, component }) => {
  return (
    <div className={className}>
      {loading ? (
        component ? (
          component
        ) : (
          <div className={`mx-auto pt-4 flex justify-center ${loadingClassName}`}>
            <Loading />
          </div>
        )
      ) : (
        children
      )}
    </div>
  )
}
