function PlaceholderPage({ title }) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">{title}</h1>
        <p className="text-gray-400 text-sm">This section is coming soon.</p>
      </div>
    </div>
  )
}

export function HomePage()     { return <PlaceholderPage title="Home" /> }
export function PaymentsPage() { return <PlaceholderPage title="Payments" /> }
export function CreditPage()   { return <PlaceholderPage title="Credit" /> }
export function SettingsPage() { return <PlaceholderPage title="Settings" /> }
