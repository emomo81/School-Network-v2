import { useState } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import FeedView from '../feed/FeedView';
import ProjectsView from '../projects/ProjectsView';
import MessagesView from '../messages/MessagesView';
import StudyGroupsView from '../study-groups/StudyGroupsView';

interface MainLayoutProps {
  userData: any;
}

type View = 'feed' | 'projects' | 'messages' | 'groups';

export default function MainLayout({ userData }: MainLayoutProps) {
  const [currentView, setCurrentView] = useState<View>('feed');
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);

  const renderView = () => {
    switch (currentView) {
      case 'feed':
        return <FeedView userData={userData} selectedDepartment={selectedDepartment} />;
      case 'projects':
        return <ProjectsView userData={userData} />;
      case 'messages':
        return <MessagesView userData={userData} />;
      case 'groups':
        return <StudyGroupsView userData={userData} />;
      default:
        return <FeedView userData={userData} selectedDepartment={selectedDepartment} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0F1012] flex">
      {/* Left Sidebar */}
      <Sidebar
        userData={userData}
        currentView={currentView}
        onViewChange={setCurrentView}
        selectedDepartment={selectedDepartment}
        onDepartmentChange={setSelectedDepartment}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar userData={userData} />
        <main className="flex-1 overflow-y-auto">{renderView()}</main>
      </div>
    </div>
  );
}
