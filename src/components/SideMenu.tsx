import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, MessageSquare, Clock, User, Settings, LogOut, ChevronRight, ChevronDown, FileText, BarChart, Users, Network, MessageCircle, Video } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
  userData?: {
    name?: string;
    email?: string;
  };
}

const SideMenu: React.FC<SideMenuProps> = ({ isOpen, onClose, userData }) => {
  const [isMediaSubmenuOpen, setIsMediaSubmenuOpen] = useState(false);
  const [isDreamTeamSubmenuOpen, setIsDreamTeamSubmenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const toggleMediaSubmenu = () => {
    setIsMediaSubmenuOpen(!isMediaSubmenuOpen);
  };

  const toggleDreamTeamSubmenu = () => {
    setIsDreamTeamSubmenuOpen(!isDreamTeamSubmenuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node) && isOpen) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleLogout = () => {
    logout();
    navigate('/');
    onClose();
  };

  return (
    <div
      ref={menuRef}
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-white text-navy-blue transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } flex flex-col overflow-y-auto`}
    >
      <div className="p-4 flex-grow">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Menu</h2>
          <button onClick={onClose} className="text-navy-blue">
            <X size={24} />
          </button>
        </div>
        <nav>
          <ul className="space-y-2">
            <li>
              <Link to="/chat-history" className="flex items-center py-2 hover:text-gold" onClick={onClose}>
                <Clock size={20} className="mr-2" />
                GYB-Chat History
              </Link>
            </li>
            <li>
              <button
                className="flex items-center justify-between w-full py-2 hover:text-gold"
                onClick={toggleDreamTeamSubmenu}
              >
                <span className="flex items-center">
                  <Users size={20} className="mr-2" />
                  GYB-DreamTeam
                </span>
                {isDreamTeamSubmenuOpen ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
              </button>
              {isDreamTeamSubmenuOpen && (
                <ul className="ml-6 mt-2 space-y-2">
                  <li>
                    <Link to="/dream-team" className="flex items-center py-2 hover:text-gold" onClick={onClose}>
                      <Users size={16} className="mr-2" />
                      GYB AI Team Members
                    </Link>
                  </li>
                  <li>
                    <Link to="/gyb-team-chat" className="flex items-center py-2 hover:text-gold" onClick={onClose}>
                      <MessageCircle size={16} className="mr-2" />
                      GYB Team Chat
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <button
                className="flex items-center justify-between w-full py-2 hover:text-gold"
                onClick={toggleMediaSubmenu}
              >
                <span className="flex items-center">
                  <FileText size={20} className="mr-2" />
                  GYB-Media
                </span>
                {isMediaSubmenuOpen ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
              </button>
              {isMediaSubmenuOpen && (
                <ul className="ml-6 mt-2 space-y-2">
                  <li>
                    <Link to="/analytics" className="flex items-center py-2 hover:text-gold" onClick={onClose}>
                      <BarChart size={16} className="mr-2" />
                      Analytics
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <Link to="/profile" className="flex items-center py-2 hover:text-gold" onClick={onClose}>
                <User size={20} className="mr-2" />
                My Profile
              </Link>
            </li>
            <li>
              <Link to="/settings" className="flex items-center py-2 hover:text-gold" onClick={onClose}>
                <Settings size={20} className="mr-2" />
                Settings
              </Link>
            </li>
            <li>
              <Link to="/ai-video-avatar" className="flex items-center py-2 hover:text-gold" onClick={onClose}>
                <Video size={20} className="mr-2" />
                AI Video Avatar
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="p-4">
        <button className="flex items-center text-red-500 hover:text-red-600" onClick={handleLogout}>
          <LogOut size={20} className="mr-2" />
          Logout {userData?.email ? `(${userData.email})` : ''}
        </button>
      </div>
    </div>
  );
};

export default SideMenu;