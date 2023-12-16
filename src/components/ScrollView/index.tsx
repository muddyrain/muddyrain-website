import {
  OverlayScrollbarsComponent,
  OverlayScrollbarsComponentProps,
} from 'overlayscrollbars-react'
import 'overlayscrollbars/overlayscrollbars.css'
import { FC } from 'react'

export const ScrollView: FC<OverlayScrollbarsComponentProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <OverlayScrollbarsComponent
      element="div"
      defer
      className={`relative w-full h-full ${className}`}
      options={{ scrollbars: { autoHide: 'scroll', autoHideSuspend: true } }}
      {...props}
    >
      {children}
    </OverlayScrollbarsComponent>
  )
}
