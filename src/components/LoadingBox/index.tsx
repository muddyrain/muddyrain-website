import { FC } from 'react'
import { Loading } from '../Loading'
import colors from 'tailwindcss/colors'

export const LoadingBox: FC<{
  className?: string
  loadingClassName?: string
  children?: React.ReactNode
  loading?: boolean
}> = ({ className, children, loading, loadingClassName }) => {
  return (
    <div className={className}>
      {loading ? (
        <div className={`mx-auto pt-4 flex justify-center ${loadingClassName}`}>
          <Loading color={colors.indigo[500]} />
        </div>
      ) : (
        children
      )}
    </div>
  )
}
