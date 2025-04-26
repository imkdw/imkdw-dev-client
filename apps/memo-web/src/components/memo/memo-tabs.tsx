import { useRouter } from '@imkdw-dev-client/i18n';
import { X } from 'lucide-react';
import { useMemoTabStore } from './memo-tab-store';

interface Props {
  currentMemoId: string;
  onCloseTab?: (id: string) => void;
}

export function MemoTabs({ currentMemoId, onCloseTab }: Props) {
  const { tabs, removeTab, setActiveTab } = useMemoTabStore();
  const router = useRouter();

  const handleTabClick = (id: string) => {
    setActiveTab(id);
    router.push(`/memo/${id}`);
  };

  const handleCloseTab = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();

    if (onCloseTab) {
      onCloseTab(id);
    } else {
      removeTab(id);

      if (id === currentMemoId && tabs.length > 1) {
        const activeTab = tabs.find((tab) => tab.isActive && tab.id !== id);
        const remainingTabs = tabs.filter((tab) => tab.id !== id);

        if (activeTab) {
          router.push(`/memo/${activeTab.id}`);
        } else if (remainingTabs.length > 0) {
          const firstRemainingTab = remainingTabs[0];
          if (firstRemainingTab) {
            router.push(`/memo/${firstRemainingTab.id}`);
          }
        }
      }
    }
  };

  if (tabs.length === 0) {
    return null;
  }

  return (
    <div className="flex overflow-x-auto bg-[#2d2d2d] h-9">
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className={`flex items-center cursor-pointer min-w-fit px-3 h-full border-r border-[#3d3d3d] ${
            tab.isActive ? 'bg-[#1e1e1e]' : 'bg-[#2d2d2d] hover:bg-[#363636]'
          }`}
          onClick={() => handleTabClick(tab.id)}
        >
          <span className="text-white text-sm">{tab.title}</span>
          <button
            className="ml-2 p-1 rounded-full hover:bg-[#3d3d3d] focus:outline-none"
            onClick={(e) => handleCloseTab(e, tab.id)}
            aria-label="탭 닫기"
          >
            <X size={14} className="text-white" />
          </button>
        </div>
      ))}
    </div>
  );
}
