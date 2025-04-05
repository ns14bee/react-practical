export interface IHeaderProps {
  onMenuClick: () => void; 
}

export interface ISidebarProps {
  isOpen: boolean;
  onClose: () => void;
};

export interface ILayoutProps {
  children: React.ReactNode; 
}