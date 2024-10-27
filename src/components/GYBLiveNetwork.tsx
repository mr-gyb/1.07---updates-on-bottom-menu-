import React, { useState } from 'react';
import { ChevronLeft, List, Map, Star, MapPin, Calendar, Users } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface User {
  id: number;
  name: string;
  username: string;
  category: string;
  experience: 'beginner' | 'intermediate' | 'proficient' | 'advanced' | 'expert';
  rating: number;
  profileImage: string;
  coverImage: string;
  lat: number;
  lng: number;
  location: string;
  socialLinks: {
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
  dateJoined: string;
  followers: number;
  following: number;
}

const GYBLiveNetwork: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const navigate = useNavigate();

  const categories = [
    { id: 'all', icon: '👥', label: 'All' },
    { id: 'videographers', icon: '🎥', label: 'Videographers' },
    { id: 'writers', icon: '✍️', label: 'Writers' },
    { id: 'coders', icon: '💻', label: 'Coders' },
    { id: 'designers', icon: '🎨', label: 'Designers' },
    { id: 'marketers', icon: '📊', label: 'Marketers' },
  ];

  const users: User[] = [
    { id: 1, name: 'Alice Johnson', username: '@alice_j', category: 'videographers', experience: 'expert', lat: 40.7128, lng: -74.0060, rating: 4.8, profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80', coverImage: 'https://images.unsplash.com/photo-1492724441997-5dc865305da7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80', location: 'New York, NY', socialLinks: { twitter: 'https://twitter.com/alice_j', linkedin: 'https://linkedin.com/in/alice_j' }, dateJoined: '2022-03-15', followers: 1500, following: 350 },
    { id: 2, name: 'Bob Smith', username: '@bob_writes', category: 'writers', experience: 'intermediate', lat: 40.7282, lng: -73.7949, rating: 4.2, profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80', coverImage: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80', location: 'Los Angeles, CA', socialLinks: { twitter: 'https://twitter.com/bob_writes', instagram: 'https://instagram.com/bob_writes' }, dateJoined: '2022-05-20', followers: 800, following: 200 },
    { id: 3, name: 'Charlie Brown', username: '@charlie_codes', category: 'coders', experience: 'beginner', lat: 40.7489, lng: -73.9680, rating: 3.9, profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80', coverImage: 'https://images.unsplash.com/photo-1510784722466-f2aa9c52fff6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80', location: 'San Francisco, CA', socialLinks: { linkedin: 'https://linkedin.com/in/charlie_codes', github: 'https://github.com/charlie_codes' }, dateJoined: '2022-08-10', followers: 300, following: 150 },
    { id: 4, name: 'Diana Miller', username: '@diana_designs', category: 'designers', experience: 'advanced', lat: 40.6782, lng: -73.9442, rating: 4.7, profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80', coverImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80', location: 'Chicago, IL', socialLinks: { instagram: 'https://instagram.com/diana_designs', behance: 'https://behance.net/diana_designs' }, dateJoined: '2022-02-01', followers: 2000, following: 500 },
    { id: 5, name: 'Eva Martinez', username: '@eva_markets', category: 'marketers', experience: 'proficient', lat: 40.7831, lng: -73.9712, rating: 4.5, profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80', coverImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80', location: 'Miami, FL', socialLinks: { twitter: 'https://twitter.com/eva_markets', linkedin: 'https://linkedin.com/in/eva_markets' }, dateJoined: '2022-06-30', followers: 1200, following: 400 },
  ];

  const filteredUsers = selectedCategory === 'all' 
    ? users 
    : users.filter(user => user.category === selectedCategory);

  const handleUserClick = (user: User) => {
    navigate(`/user-profile/${user.id}`, { state: user });
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
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            className={star <= Math.round(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
          />
        ))}
        <span className="ml-1 text-sm text-gray-600">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div className="bg-white min-h-screen text-navy-blue flex flex-col">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Link to="/dashboard" className="mr-4 text-navy-blue">
              <ChevronLeft size={24} />
            </Link>
            <h1 className="text-3xl font-bold text-navy-blue">GYB-Live Network</h1>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-navy-blue text-white' : 'bg-gray-200 text-navy-blue'}`}
            >
              <List size={24} />
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`p-2 rounded ${viewMode === 'map' ? 'bg-navy-blue text-white' : 'bg-gray-200 text-navy-blue'}`}
            >
              <Map size={24} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-grow p-4">
        {viewMode === 'list' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-200"
                onClick={() => handleUserClick(user)}
              >
                <div className="h-32 bg-cover bg-center" style={{ backgroundImage: `url(${user.coverImage})` }}></div>
                <div className="p-4 relative">
                  <div className="absolute -top-12 left-4">
                    <div className={`w-24 h-24 rounded-full border-4 ${getExperienceColor(user.experience)} overflow-hidden`}>
                      <img src={user.profileImage} alt={user.name} className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <div className="mt-14">
                    <h3 className="font-bold text-xl">{user.name}</h3>
                    <p className="text-gray-600 mb-2">{user.username}</p>
                    <p className="text-gray-600 mb-2">{user.category}</p>
                    <div className="flex items-center mb-2">
                      <div className={`w-6 h-6 rounded-full ${getExperienceColor(user.experience)} flex items-center justify-center font-bold mr-2`}>
                        {getExperienceNumber(user.experience)}
                      </div>
                      <span className="text-sm">{user.experience}</span>
                    </div>
                    {renderStars(user.rating)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-200 rounded-lg h-[calc(100vh-200px)] relative shadow-md">
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-navy-blue text-2xl font-bold">Map View (Placeholder)</p>
            </div>
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className={`absolute w-8 h-8 rounded-full ${getExperienceColor(user.experience)} flex items-center justify-center font-bold cursor-pointer`}
                style={{
                  left: `${(user.lng + 74.1) * 100}%`,
                  top: `${(40.9 - user.lat) * 100}%`,
                }}
                title={`${user.name} (${user.category})`}
                onClick={() => handleUserClick(user)}
              >
                {getExperienceNumber(user.experience)}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-gray-100 p-4 overflow-x-auto shadow-md">
        <div className="flex space-x-4 min-w-max">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex flex-col items-center justify-center w-20 h-20 rounded-full ${
                selectedCategory === category.id ? 'bg-navy-blue text-white' : 'bg-white text-navy-blue'
              } transition-all duration-300 transform hover:scale-110 shadow-md`}
            >
              <span className="text-2xl mb-1">{category.icon}</span>
              <span className="text-xs text-center">{category.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GYBLiveNetwork;