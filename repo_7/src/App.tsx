import { useState } from 'react';
import OnboardingFlow from './components/onboarding/OnboardingFlow';
import MainLayout from './components/layout/MainLayout';

function App() {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [userData, setUserData] = useState<any>(null);

  const handleOnboardingComplete = (data: any) => {
    setUserData(data);
    setHasCompletedOnboarding(true);
  };

  if (!hasCompletedOnboarding) {
    return <OnboardingFlow onComplete={handleOnboardingComplete} />;
  }

  return <MainLayout userData={userData} />;
}

export default App;
