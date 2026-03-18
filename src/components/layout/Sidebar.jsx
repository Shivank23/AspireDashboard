import { NavLink } from 'react-router-dom'
import { NAV_ITEMS } from '@/constants'
import Icon from '@/components/ui/Icon'

function AspireLogo() {
  return (
    <div className="flex items-center gap-2 mb-2">
      <div className="w-8 h-8 rounded flex items-center justify-center bg-aspire-green">
        <svg viewBox="0 0 32 32" className="w-5 h-5" fill="none">
          <path d="M16 4L4 10l12 6 12-6-12-6zM4 20l12 6 12-6M4 15l12 6 12-6"
            stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <span className="text-white text-xl font-bold tracking-tight">aspire</span>
    </div>
  )
}

export default function Sidebar() {
  return (
    <aside className="w-60 min-h-screen bg-aspire-navy flex flex-col px-6 py-8 flex-shrink-0">
      <div className="mb-10">
        <AspireLogo />
        <p className="text-white/40 text-xs mt-3 leading-relaxed">
          Trusted way of banking for 3,000+ SMEs and startups in Singapore
        </p>
      </div>
      <nav className="flex flex-col gap-1">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors duration-150
              ${isActive
                ? 'text-aspire-green font-semibold'
                : 'text-white/50 hover:text-white/80 font-normal'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span className={isActive ? 'text-aspire-green' : 'text-white/40'}>
                  <Icon name={item.id} className="w-5 h-5" />
                </span>
                {item.label}
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
