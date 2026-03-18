import { Routes, Route, Navigate } from 'react-router-dom'
import AppLayout from '@/components/layout/AppLayout'
import CardsPage from '@/pages/CardsPage'
import HomePage from '@/pages/HomePage'
import PaymentsPage from '@/pages/PaymentsPage'
import CreditPage from '@/pages/CreditPage'
import SettingsPage from '@/pages/SettingsPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Navigate to="/cards" replace />} />
        <Route path="home"     element={<HomePage />}     />
        <Route path="cards"    element={<CardsPage />}    />
        <Route path="payments" element={<PaymentsPage />} />
        <Route path="credit"   element={<CreditPage />}   />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  )
}
