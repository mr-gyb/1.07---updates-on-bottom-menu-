import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Calendar, Link as LinkIcon, Mail, Image, MessageCircle, Star, Film, ChevronLeft, X, RotateCw, Briefcase, FileText, ChevronUp, ChevronDown, Clock, HelpCircle, Users, ExternalLink } from 'lucide-react';
import { useParams, useLocation, Link } from 'react-router-dom';

interface UserData {
  id: number;
  name: string;
  username: string;
  category: string;
  experience: 'beginner' | 'intermediate' | 'proficient' | 'advanced' | 'expert';
  rating: number;
  profileImage: string;
  coverImage: string;
  bio: string;
  location: string;
  website: string;
  joinDate: string;
  following: number;
  followers: number;
  socialLinks: {
    twitter?: string;
    linkedin?: string;
    instagram?: string;
    github?: string;
    behance?: string;
  };
}

interface ContentItem {
  type: 'cover' | 'profile' | 'image' | 'video' | 'audio';
  src: string;
  alt?: string;
  thumbnail?: string;
  createdAt: string;
  description: string;
}

const UserProfile: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const location = useLocation();
  const userData: UserData = location.state || {
    id: parseInt(userId || '0'),
    name: 'jhfyi jhv',
    username: 'yifgi',
    category: 'General',
    experience: 'intermediate',
    rating: 4.7,
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    bio: 'Passionate about technology and innovation hi',
    location: 'San Francisco, CA',
    website: 'https://example.com',
    joinDate: 'April 2023',
    following: 250,
    followers: 1000,
    socialLinks: {
      twitter: 'https://twitter.com/yifgi',
      linkedin: 'https://linkedin.com/in/yifgi',
    },
  };

  const [activeTab, setActiveTab] = useState('posts');
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);
  const [magnifiedContentIndex, setMagnifiedContentIndex] = useState<number | null>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const magnifiedContentRef = useRef<HTMLDivElement>(null);

  const contentItems: ContentItem[] = [
    { type: 'cover', src: userData.coverImage, alt: 'Cover Image', createdAt: '2023-05-01', description: 'Profile cover image showcasing my work environment' },
    { type: 'profile', src: userData.profileImage, alt: 'Profile Image', createdAt: '2023-05-01', description: 'Professional headshot for my profile' },
    { type: 'image', src: 'https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80', alt: 'Tech workspace', createdAt: '2023-05-15', description: 'My organized tech workspace where I create and innovate' },
    { type: 'image', src: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80', alt: 'Natural landscape', createdAt: '2023-05-20', description: 'Inspiring natural landscape from my recent hiking trip' },
    { type: 'image', src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80', alt: 'Technology hardware', createdAt: '2023-05-25', description: 'Latest tech gadgets I use for my projects' },
    { type: 'video', src: 'https://example.com/video1.mp4', thumbnail: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80', createdAt: '2023-06-01', description: 'Video tutorial on web development best practices' },
    { type: 'audio', src: 'https://example.com/audio1.mp3', thumbnail: 'https://images.unsplash.com/photo-1558403194-611308249627?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80', createdAt: '2023-06-05', description: 'Podcast episode discussing the future of AI in business' },
  ];

  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      if (magnifiedContentRef.current && magnifiedContentIndex !== null && !isScrolling) {
        e.preventDefault();
        setIsScrolling(true);
        const direction = e.deltaY > 0 ? 1 : -1;
        const newIndex = (magnifiedContentIndex + direction + contentItems.length) % contentItems.length;
        setSelectedContent(contentItems[newIndex]);
        setMagnifiedContentIndex(newIndex);

        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }

        scrollTimeoutRef.current = setTimeout(() => {
          setIsScrolling(false);
        }, 500);
      }
    };

    window.addEventListener('wheel', handleScroll, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [magnifiedContentIndex, isScrolling]);

  const handleContentClose = () => {
    setSelectedContent(null);
    setMagnifiedContentIndex(null);
  };

  const getExperienceColor = (experience: string) => {
    switch (experience) {
      case 'beginner': return 'border-red-500 text-red-500';
      case 'intermediate': return 'border-orange-500 text-orange-500';
      case 'proficient': return 'border-blue-500 text-blue-500';
      case 'advanced': return 'border-green-500 text-green-500';
      case 'expert': return 'border-yellow-400 text-yellow-400';
      default: return 'border-gray-300 text-gray-300';
    }
  };

  const getExperienceNumber = (level: string) => {
    switch (level) {
      case 'beginner': return 1;
      case 'intermediate': return 2;
      case 'proficient': return 3;
      case 'advanced': return 4;
      case 'expert': return 5;
      default: return 0;
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center mt-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            className={star <= Math.round(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
          />
        ))}
        <span className="ml-2 text-sm text-gray-600">{rating.toFixed(1)}</span>
      </div>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'posts':
        return (
          <div className="grid grid-cols-3 gap-1">
            {contentItems.slice(2).map((item, index) => (
              <div
                key={index}
                className="relative aspect-square cursor-pointer"
                onClick={() => {
                  setSelectedContent(item);
                  setMagnifiedContentIndex(index + 2);
                }}
              >
                <img src={item.type === 'image' ? item.src : item.thumbnail} alt={item.alt || ''} className="w-full h-full object-cover" />
                {item.type !== 'image' && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    {item.type === 'video' && <Film size={24} className="text-white" />}
                    {item.type === 'audio' && <MessageCircle size={24} className="text-white" />}
                  </div>
                )}
              </div>
            ))}
          </div>
        );
      case 'subs':
        return (
          <div className="mt-4 bg-gray-100 p-6 rounded-lg text-center">
            <h2 className="text-3xl font-bold mb-4">Unlock more with Subscriptions</h2>
            <p className="text-lg mb-6">
              {userData.username} has shared 9 Subscriber-only posts. Subscribe to see their exclusive posts and bonus content.
            </p>
            <button className="bg-navy-blue text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-opacity-90 transition duration-300">
              Subscribe
            </button>
          </div>
        );
      case 'highlights':
        return (
          <div className="mt-4 bg-gray-100 p-4 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Timeline Diagram</h2>
            <div className="relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gray-300"></div>
              <div className="flex justify-between items-center">
                {[2000, 2020, 2040].map((year, index) => (
                  <div key={year} className="relative flex flex-col items-center">
                    <div className="w-4 h-4 bg-navy-blue rounded-full mb-2"></div>
                    <span className="text-lg font-semibold">{year}</span>
                    <p className="text-sm text-gray-600 mt-2 text-center max-w-[100px]">
                      Briefly elaborate on what you want to discuss.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'media':
        return (
          <div className="grid grid-cols-3 gap-1">
            {contentItems.filter(item => item.type === 'video' || item.type === 'audio').map((item, index) => (
              <div
                key={index}
                className="relative aspect-square cursor-pointer"
                onClick={() => {
                  setSelectedContent(item);
                  setMagnifiedContentIndex(contentItems.indexOf(item));
                }}
              >
                <img src={item.thumbnail} alt={item.alt || ''} className="w-full h-full object-cover" />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  {item.type === 'video' && <Film size={24} className="text-white" />}
                  {item.type === 'audio' && <MessageCircle size={24} className="text-white" />}
                </div>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-6">
        <Link to="/gyb-live-network" className="flex items-center text-navy-blue mb-4">
          <ChevronLeft size={24} className="mr-2" />
          Back to GYB Live Network
        </Link>
        <div className="relative">
          <div 
            className="h-32 bg-cover bg-center cursor-pointer" 
            style={{ backgroundImage: `url(${userData.coverImage})` }}
            onClick={() => {
              setSelectedContent(contentItems[0]);
              setMagnifiedContentIndex(0);
            }}
          ></div>
          <div className="absolute bottom-0 left-4 transform translate-y-1/2">
            <div 
              className={`w-24 h-24 rounded-full border-4 ${getExperienceColor(userData.experience)} overflow-hidden cursor-pointer`}
              onClick={() => {
                setSelectedContent(contentItems[1]);
                setMagnifiedContentIndex(1);
              }}
            >
              <img
                src={userData.profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            {renderStars(userData.rating)}
          </div>
        </div>

        <div className="mt-20 px-4">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold">{userData.name}</h1>
              <p className="text-gray-600 flex items-center">
                {userData.username}
                <span className={`ml-2 px-2 py-1 rounded-full text-xs font-bold ${getExperienceColor(userData.experience)}`}>
                  {getExperienceNumber(userData.experience)}
                </span>
              </p>
            </div>
          </div>

          <p className="mt-2">{userData.bio}</p>

          <div className="flex flex-wrap gap-y-2 mt-2 text-gray-600">
            <span className="flex items-center mr-4">
              <MapPin size={16} className="mr-1" />
              {userData.location}
            </span>
            <span className="flex items-center mr-4">
              <LinkIcon size={16} className="mr-1" />
              <a href={userData.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                {userData.website}
              </a>
              <a href={userData.website} target="_blank" rel="noopener noreferrer" className="ml-1">
                <ExternalLink size={14} className="text-navy-blue" />
              </a>
            </span>
            <span className="flex items-center mr-4">
              <Calendar size={16} className="mr-1" />
              Joined {userData.joinDate}
            </span>
          </div>

          <div className="flex mt-4 space-x-4">
            <span><strong>{userData.following}</strong> Following</span>
            <span><strong>{userData.followers}</strong> Followers</span>
          </div>

          <div className="mt-4 flex space-x-4">
            {userData.socialLinks.twitter && (
              <a href={userData.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            )}
            {userData.socialLinks.linkedin && (
              <a href={userData.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            )}
            {userData.socialLinks.instagram && (
              <a href={userData.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-800">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
            )}
            {userData.socialLinks.github && (
              <a href={userData.socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-gray-600">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
            )}
            {userData.socialLinks.behance && (
              <a href={userData.socialLinks.behance} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M22 7h-7V2H9v5H2v15h20V7zM9 2h6v5H9V2zm12 20H3V8h18v14zM9 13v2h6v-2H9zm0-3v2h6v-2H9zm0 6v2h6v-2H9z"/>
                </svg>
              </a>
            )}
          </div>

          <div className="flex border-b mt-4">
            {['Posts', 'Subs', 'Highlights', 'Media'].map((tab) => (
              <button
                key={tab}
                className={`px-4 py-2 ${activeTab === tab.toLowerCase() ? 'border-b-2 border-navy-blue' : ''}`}
                onClick={() => setActiveTab(tab.toLowerCase())}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="mt-4">
            {renderTabContent()}
          </div>
        </div>
      </div>

      {selectedContent && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={handleContentClose}
        >
          <div 
            className="w-4/5 max-w-4xl max-h-screen overflow-y-auto bg-white rounded-lg p-8" 
            ref={magnifiedContentRef}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={handleContentClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
            <div className="w-full h-full flex flex-col items-center justify-center">
              {selectedContent.type === 'image' || selectedContent.type === 'cover' || selectedContent.type === 'profile' ? (
                <img src={selectedContent.src} alt={selectedContent.alt} className="max-w-full max-h-[60vh] object-contain mb-6" />
              ) : selectedContent.type === 'video' ? (
                <video src={selectedContent.src} controls className="max-w-full max-h-[60vh] mb-6" />
              ) : selectedContent.type === 'audio' ? (
                <audio src={selectedContent.src} controls className="w-full mb-6" />
              ) : null}
              <div className="w-full text-left">
                <h3 className="text-2xl font-bold mb-2">{selectedContent.alt || 'Content Details'}</h3>
                <p className="text-gray-600 mb-4">{selectedContent.description}</p>
                <div className="flex items-center text-gray-500 mb-2">
                  <Clock size={16} className="mr-2" />
                  <span>Created on: {selectedContent.createdAt}</span>
                </div>
                <div className="flex items-center text-gray-500">
                  <HelpCircle size={16} className="mr-2" />
                  <span>Why: To showcase my work and experiences</span>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-between items-center">
              <button
                onClick={() => {
                  if (magnifiedContentIndex !== null) {
                    const newIndex = (magnifiedContentIndex - 1 + contentItems.length) % contentItems.length;
                    setSelectedContent(contentItems[newIndex]);
                    setMagnifiedContentIndex(newIndex);
                  }
                }}
                className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition-colors"
              >
                <ChevronUp size={24} />
              </button>
              <button
                onClick={() => {
                  if (magnifiedContentIndex !== null) {
                    const newIndex = (magnifiedContentIndex + 1) % contentItems.length;
                    setSelectedContent(contentItems[newIndex]);
                    setMagnifiedContentIndex(newIndex);
                  }
                }}
                className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition-colors"
              >
                <ChevronDown size={24} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;