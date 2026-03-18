const VARIANTS = {
  primary:   'bg-aspire-blue text-white hover:bg-blue-700 active:bg-blue-800',
  secondary: 'bg-white text-aspire-blue border border-aspire-blue hover:bg-blue-50',
  ghost:     'bg-transparent text-gray-600 hover:bg-gray-100',
  danger:    'bg-red-500 text-white hover:bg-red-600',
}

const SIZES = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  onClick,
  type = 'button',
  ...rest
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`
        inline-flex items-center justify-center gap-2 font-semibold rounded-lg
        transition-colors duration-150 focus:outline-none focus:ring-2
        focus:ring-aspire-blue focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${VARIANTS[variant]} ${SIZES[size]} ${className}
      `}
      {...rest}
    >
      {children}
    </button>
  )
}
