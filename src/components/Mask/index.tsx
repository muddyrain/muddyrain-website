import React from 'react'
import { createPortal } from 'react-dom'
import { CSSTransition } from 'react-transition-group'
import styles from '@/styles/transition.scss' // 导入样式

interface MaskProps {
  open?: boolean
  children?: React.ReactNode
  onClickOutside?: () => void
  onChange?: (open: boolean) => void
}

const TmpMask: React.FC<MaskProps> = ({ open = false, children, onClickOutside }) => {
  return (
    <CSSTransition in={open} timeout={300} classNames={styles.fade} unmountOnExit>
      <div
        className={`fixed top-0 left-0 cursor-pointer w-full h-full z-[99999999] bg-black/50 flex items-center justify-center transition-opacity duration-300 ${
          open ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={e => {
          e.stopPropagation()
          onClickOutside?.()
        }}
      >
        {children}
      </div>
    </CSSTransition>
  )
}
const MemoMask = React.memo(TmpMask)

export const Mask: React.FC<MaskProps> = ({ open, children, ...props }) => {
  return createPortal(
    <MemoMask open={open} {...props}>
      {children}
    </MemoMask>,
    document.body
  )
}
