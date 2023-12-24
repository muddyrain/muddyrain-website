import { FC, FocusEventHandler, useEffect, useRef, useState } from 'react'
import { Search as SearchIcon, HighlightOff } from '@mui/icons-material'
import { IconButton } from '@mui/material'

export const Search: FC<{
  onChange?: (value: string) => void
  inputClassName?: string
  className?: string
  placeholder?: string
  showClear?: boolean
  onFocus?: FocusEventHandler<HTMLInputElement> | undefined
  onBlur?: FocusEventHandler<HTMLInputElement> | undefined
  value?: string
}> = ({
  value = '',
  onChange,
  inputClassName,
  className,
  placeholder,
  showClear = true,
  onFocus,
  onBlur,
}) => {
  const [searchValue, setSearchValue] = useState(value)
  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    onChange && onChange(searchValue)
  }, [searchValue])
  return (
    <div className={`relative flex items-center ${className}`}>
      <input
        type="text"
        ref={inputRef}
        placeholder={placeholder}
        value={searchValue}
        onChange={e => {
          setSearchValue(e.target.value)
        }}
        onFocus={onFocus}
        onBlur={onBlur}
        className={`outline-none border w-60 border-solid border-zinc-400/60 text-zinc-500 placeholder:text-zinc-400/80 rounded-full px-8 bg-transparent h-8 text-md ${inputClassName}`}
      />
      <SearchIcon className="absolute left-2 text-zinc-400/60 text-xl" />
      {searchValue && showClear && (
        <IconButton
          className="absolute cursor-pointer right-2"
          size="small"
          onMouseDown={e => {
            e.preventDefault()
            e.stopPropagation()
            setSearchValue('')
            inputRef.current?.focus()
          }}
        >
          <HighlightOff className="duration-300 text-zinc-400/60 text-xl" />
        </IconButton>
      )}
    </div>
  )
}
