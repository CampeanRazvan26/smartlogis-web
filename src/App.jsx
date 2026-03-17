import { useState } from 'react'
import SmartLogisApp from './SmartLogis_v5'
import LandingPage from './LandingPage'

export default function App() {
  const [screen, setScreen] = useState('landing') // 'landing' | 'app'
  const [user, setUser] = useState(null)

  if (screen === 'landing') {
    return <LandingPage onEnter={() => setScreen('app')} />
  }

  return (
    <SmartLogisApp
      initialUser={user}
      onUserChange={setUser}
      onGoLanding={() => setScreen('landing')}
    />
  )
}