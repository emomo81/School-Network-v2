import { StudentCommunityApp } from './components/StudentCommunityApp';
import { Toaster } from './components/ui/sonner';

function App() {
  return (
    <div className="w-screen h-screen overflow-hidden">
      <StudentCommunityApp />
      <Toaster />
    </div>
  );
}

export default App;
