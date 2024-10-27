import React, { useState, useEffect } from 'react';
import { ChevronLeft, User, MapPin, Video, Image, Headphones, FileText, Youtube, Facebook, Linkedin, Instagram, Twitter, ChevronDown, ChevronUp, Music, Plus, X, RefreshCw, Check, Share2, Play, Pause } from 'lucide-react';
import { Link } from 'react-router-dom';

const GYBContentAI: React.FC = () => {
  const [title, setTitle] = useState('');
  const [selectedPeople, setSelectedPeople] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadedContent, setUploadedContent] = useState<File | string | null>(null);
  const [aiGeneratedContent, setAiGeneratedContent] = useState<any>(null);
  const [aiGeneratedThumbnails, setAiGeneratedThumbnails] = useState<string[]>([]);
  const [aiGeneratedTitles, setAiGeneratedTitles] = useState<string[]>([]);
  const [contentApproval, setContentApproval] = useState<{[key: string]: boolean[]}>({});
  const [refreshCounts, setRefreshCounts] = useState<{[key: string]: number}>({});
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [showShareConfirmation, setShowShareConfirmation] = useState(false);
  const [previewContent, setPreviewContent] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const contentTypes = [
    { type: 'Video', icon: Video, platforms: ['YouTube', 'Facebook', 'Instagram', 'TikTok'] },
    { type: 'Photo', icon: Image, platforms: ['Instagram', 'Facebook', 'Twitter'] },
    { type: 'Audio', icon: Headphones, platforms: ['Spotify', 'Apple Podcasts', 'Google Podcasts'] },
    { type: 'Written', icon: FileText, platforms: ['Medium', 'LinkedIn', 'WordPress'] },
  ];

  const platformIcons: { [key: string]: React.ElementType } = {
    YouTube: Youtube,
    Facebook: Facebook,
    LinkedIn: Linkedin,
    Instagram: Instagram,
    Twitter: Twitter,
    TikTok: Music,
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedContent(file);
    }
  };

  const handleYoutubeLink = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const link = event.currentTarget.youtubeLink.value;
    setUploadedContent(link);
  };

  const simulateAiProcessing = () => {
    setTimeout(() => {
      setAiGeneratedContent({
        reels: [
          { id: 1, thumbnail: 'https://picsum.photos/200/300?random=1', duration: '0:59', url: 'https://example.com/video1.mp4' },
          { id: 2, thumbnail: 'https://picsum.photos/200/300?random=2', duration: '0:45', url: 'https://example.com/video2.mp4' },
          { id: 3, thumbnail: 'https://picsum.photos/200/300?random=3', duration: '1:00', url: 'https://example.com/video3.mp4' },
        ],
        blog: [
          { title: 'AI Generated Blog Post 1', excerpt: 'This is the first AI-generated blog post based on the uploaded content...' },
          { title: 'AI Generated Blog Post 2', excerpt: 'This is the second AI-generated blog post with a different perspective...' },
          { title: 'AI Generated Blog Post 3', excerpt: 'This is the third AI-generated blog post exploring another angle...' },
        ],
        podcast: [
          { title: 'AI Generated Podcast 1', duration: '5:00', url: 'https://example.com/podcast1.mp3' },
          { title: 'AI Generated Podcast 2', duration: '4:30', url: 'https://example.com/podcast2.mp3' },
          { title: 'AI Generated Podcast 3', duration: '5:15', url: 'https://example.com/podcast3.mp3' },
        ],
        images: [
          { id: 1, url: 'https://picsum.photos/200/200?random=1' },
          { id: 2, url: 'https://picsum.photos/200/200?random=2' },
          { id: 3, url: 'https://picsum.photos/200/200?random=3' },
        ],
      });
      setAiGeneratedThumbnails([
        'https://picsum.photos/400/300?random=10',
        'https://picsum.photos/400/300?random=11',
        'https://picsum.photos/400/300?random=12',
      ]);
      setAiGeneratedTitles([
        'AI-Generated Content Title: Exploring New Horizons',
        'Unveiling the Future: A Journey Through Innovation',
        'Breaking Boundaries: The Next Frontier of Technology',
      ]);
      setShowUploadModal(false);

      // Initialize content approval and refresh counts
      const initialApproval: {[key: string]: boolean[]} = {};
      const initialRefreshCounts: {[key: string]: number} = {};
      contentTypes.forEach(type => {
        initialApproval[type.type] = [false, false, false];
        initialRefreshCounts[type.type] = 0;
      });
      initialApproval['Thumbnail'] = [false, false, false];
      initialApproval['Title'] = [false, false, false];
      initialRefreshCounts['Thumbnail'] = 0;
      initialRefreshCounts['Title'] = 0;
      setContentApproval(initialApproval);
      setRefreshCounts(initialRefreshCounts);
    }, 2000);
  };

  const handleSubmitContent = () => {
    if (uploadedContent) {
      simulateAiProcessing();
    }
  };

  const handleApproval = (contentType: string, index: number) => {
    setContentApproval(prev => ({
      ...prev,
      [contentType]: prev[contentType].map((value, i) => i === index ? !value : value)
    }));
  };

  const handleRefresh = (contentType: string) => {
    if (refreshCounts[contentType] < 3) {
      setRefreshCounts(prev => ({
        ...prev,
        [contentType]: prev[contentType] + 1
      }));
      // Simulate refreshing content for unapproved items
      setContentApproval(prev => ({
        ...prev,
        [contentType]: prev[contentType].map((value, index) => value ? value : false)
      }));
      simulateAiProcessing();
    }
  };

  const handlePlatformSelection = (platform: string) => {
    setSelectedPlatforms(prev =>
      prev.includes(platform)
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
  };

  const handleShare = () => {
    setShowShareConfirmation(true);
  };

  const confirmShare = () => {
    // Implement sharing logic here
    console.log('Sharing approved content to:', selectedPlatforms);
    setShowShareConfirmation(false);
  };

  const isAllContentApproved = Object.values(contentApproval).some(approvals => approvals.some(Boolean));

  const handlePreview = (content: any, type: string) => {
    setPreviewContent({ content, type });
  };

  const closePreview = () => {
    setPreviewContent(null);
    setIsPlaying(false);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="bg-white min-h-screen text-navy-blue">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Link to="/dashboard" className="mr-4 text-navy-blue">
              <ChevronLeft size={24} />
            </Link>
            <h1 className="text-3xl font-bold text-navy-blue">GYB Content AI</h1>
          </div>
          <button
            onClick={handleShare}
            className={`bg-navy-blue text-white px-4 py-2 rounded-full flex items-center ${
              isAllContentApproved ? '' : 'opacity-50 cursor-not-allowed'
            }`}
            disabled={!isAllContentApproved}
          >
            <Share2 size={20} className="mr-2" />
            Share
          </button>
        </div>
        <div className="max-w-3xl mx-auto space-y-6">
          <button
            onClick={() => setShowUploadModal(true)}
            className="w-full bg-navy-blue text-white rounded-lg p-4 flex items-center justify-center"
          >
            <Plus size={24} className="mr-2" />
            Upload Content
          </button>

          {aiGeneratedTitles.length > 0 && (
            <div className="bg-gray-100 p-4 rounded-lg">
              <h2 className="text-xl font-bold mb-2">AI-Generated Titles</h2>
              <div className="space-y-2">
                {aiGeneratedTitles.map((title, index) => (
                  <div key={index} className="flex items-center justify-between bg-white p-2 rounded">
                    <span>{title}</span>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={contentApproval['Title'][index] || false}
                        onChange={() => handleApproval('Title', index)}
                        className="mr-2"
                      />
                      <label>Approve</label>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => handleRefresh('Title')}
                className="mt-2 bg-gray-200 p-2 rounded-full hover:bg-gray-300 flex items-center"
                disabled={refreshCounts['Title'] >= 3}
              >
                <RefreshCw size={20} className="mr-2" />
                Refresh Unapproved ({3 - refreshCounts['Title']} left)
              </button>
            </div>
          )}

          {aiGeneratedThumbnails.length > 0 && (
            <div className="bg-gray-100 p-4 rounded-lg">
              <h2 className="text-xl font-bold mb-2">AI-Generated Thumbnails</h2>
              <div className="grid grid-cols-3 gap-4">
                {aiGeneratedThumbnails.map((thumbnail, index) => (
                  <div key={index} className="relative">
                    <img
                      src={thumbnail}
                      alt={`AI-Generated Thumbnail ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg cursor-pointer"
                      onClick={() => handlePreview(thumbnail, 'image')}
                    />
                    <div className="absolute top-2 right-2 flex items-center bg-white rounded-full p-1">
                      <input
                        type="checkbox"
                        checked={contentApproval['Thumbnail'][index] || false}
                        onChange={() => handleApproval('Thumbnail', index)}
                        className="mr-2"
                      />
                      <label className="text-xs">Approve</label>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => handleRefresh('Thumbnail')}
                className="mt-2 bg-gray-200 p-2 rounded-full hover:bg-gray-300 flex items-center"
                disabled={refreshCounts['Thumbnail'] >= 3}
              >
                <RefreshCw size={20} className="mr-2" />
                Refresh Unapproved ({3 - refreshCounts['Thumbnail']} left)
              </button>
            </div>
          )}

          <div className="space-y-4">
            {contentTypes.map((contentType) => (
              <div key={contentType.type} className="border rounded p-2">
                <button
                  onClick={() => toggleSection(contentType.type)}
                  className="w-full flex items-center justify-between"
                >
                  <span className="flex items-center">
                    <contentType.icon size={20} className="mr-2" />
                    {contentType.type}
                  </span>
                  {expandedSections.includes(contentType.type) ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {expandedSections.includes(contentType.type) && (
                  <div className="mt-2 space-y-2">
                    {contentType.platforms.map((platform) => (
                      <div key={platform} className="flex items-center justify-between">
                        <span className="flex items-center">
                          {platformIcons[platform] && React.createElement(platformIcons[platform], { size: 20, className: "mr-2" })}
                          {platform}
                        </span>
                        <input
                          type="checkbox"
                          checked={selectedPlatforms.includes(platform)}
                          onChange={() => handlePlatformSelection(platform)}
                        />
                      </div>
                    ))}
                  </div>
                )}
                {aiGeneratedContent && (
                  <div className="mt-4">
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      {contentType.type === 'Video' && aiGeneratedContent.reels.map((reel: any, index: number) => (
                        <div key={reel.id} className="bg-white p-2 rounded relative">
                          <img
                            src={reel.thumbnail}
                            alt={`Reel ${reel.id}`}
                            className="w-full h-32 object-cover rounded cursor-pointer"
                            onClick={() => handlePreview(reel, 'video')}
                          />
                          <p className="mt-2 text-sm">Duration: {reel.duration}</p>
                          <div className="absolute top-2 right-2 flex items-center bg-white rounded-full p-1">
                            <input
                              type="checkbox"
                              checked={contentApproval[contentType.type][index] || false}
                              onChange={() => handleApproval(contentType.type, index)}
                              className="mr-2"
                            />
                            <label className="text-xs">Approve</label>
                          </div>
                        </div>
                      ))}
                      {contentType.type === 'Photo' && aiGeneratedContent.images.map((image: any, index: number) => (
                        <div key={image.id} className="bg-white p-2 rounded relative">
                          <img
                            src={image.url}
                            alt={`Generated Image ${image.id}`}
                            className="w-full h-32 object-cover rounded cursor-pointer"
                            onClick={() => handlePreview(image, 'image')}
                          />
                          <div className="absolute top-2 right-2 flex items-center bg-white rounded-full p-1">
                            <input
                              type="checkbox"
                              checked={contentApproval[contentType.type][index] || false}
                              onChange={() => handleApproval(contentType.type, index)}
                              className="mr-2"
                            />
                            <label className="text-xs">Approve</label>
                          </div>
                        </div>
                      ))}
                      {contentType.type === 'Written' && aiGeneratedContent.blog.map((blog: any, index: number) => (
                        <div key={index} className="bg-white p-2 rounded relative">
                          <h3 className="font-bold cursor-pointer" onClick={() => handlePreview(blog, 'text')}>{blog.title}</h3>
                          <p className="text-sm mt-2 h-20 overflow-y-auto">{blog.excerpt}</p>
                          <div className="absolute top-2 right-2 flex items-center bg-white rounded-full p-1">
                            <input
                              type="checkbox"
                              checked={contentApproval[contentType.type][index] || false}
                              onChange={() => handleApproval(contentType.type, index)}
                              className="mr-2"
                            />
                            <label className="text-xs">Approve</label>
                          </div>
                        </div>
                      ))}
                      {contentType.type === 'Audio' && aiGeneratedContent.podcast.map((podcast: any, index: number) => (
                        <div key={index} className="bg-white p-2 rounded relative">
                          <h3 className="font-bold cursor-pointer" onClick={() => handlePreview(podcast, 'audio')}>{podcast.title}</h3>
                          <p className="text-sm mt-2">Duration: {podcast.duration}</p>
                          <div className="absolute top-2 right-2 flex items-center bg-white rounded-full p-1">
                            <input
                              type="checkbox"
                              checked={contentApproval[contentType.type][index] || false}
                              onChange={() => handleApproval(contentType.type, index)}
                              className="mr-2"
                            />
                            <label className="text-xs">Approve</label>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-end">
                      {refreshCounts[contentType.type] < 3 && (
                        <button
                          onClick={() => handleRefresh(contentType.type)}
                          className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 flex items-center"
                        >
                          <RefreshCw size={20} className="mr-2" />
                          Refresh Unapproved ({3 - refreshCounts[contentType.type]} left)
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Upload Content</h2>
              <button onClick={() => setShowUploadModal(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label htmlFor="file-upload" className="block mb-2">Choose File</label>
                <input
                  id="file-upload"
                  type="file"
                  onChange={handleFileUpload}
                  accept="video/*,audio/*,image/*,.pdf,.doc,.docx,.txt"
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <p className="mb-2">Or</p>
                <form onSubmit={handleYoutubeLink}>
                  <label htmlFor="youtube-link" className="block mb-2">YouTube Link</label>
                  <input
                    id="youtube-link"
                    name="youtubeLink"
                    type="url"
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="w-full border p-2 rounded mb-2"
                  />
                  <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                    Add YouTube Link
                  </button>
                </form>
              </div>
              <button
                onClick={handleSubmitContent}
                className="w-full bg-navy-blue text-white px-4 py-2 rounded hover:bg-opacity-90"
              >
                Submit Content
              </button>
            </div>
          </div>
        </div>
      )}

      {showShareConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Confirm Sharing</h2>
            <p>Are you sure you want to share the approved content to the selected platforms?</p>
            <div className="mt-4 flex justify-end space-x-4">
              <button
                onClick={() => setShowShareConfirmation(false)}
                className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={confirmShare}
                className="px-4 py-2 bg-navy-blue text-white rounded hover:bg-opacity-90"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {previewContent && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={closePreview}>
          <div className="bg-white p-6 rounded-lg max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
            <button onClick={closePreview} className="absolute top-4 right-4 text-white">
              <X size={24} />
            </button>
            {previewContent.type === 'image' && (
              <img src={previewContent.content} alt="Preview" className="max-w-full max-h-[80vh] mx-auto" />
            )}
            {previewContent.type === 'video' && (
              <video src={previewContent.content.url} controls className="max-w-full max-h-[80vh] mx-auto" />
            )}
            {previewContent.type === 'audio' && (
              <div className="flex flex-col items-center">
                <h3 className="text-xl font-bold mb-4">{previewContent.content.title}</h3>
                <audio src={previewContent.content.url} controls className="w-full" />
              </div>
            )}
            {previewContent.type === 'text' && (
              <div className="max-h-[80vh] overflow-y-auto">
                <h3 className="text-xl font-bold mb-4">{previewContent.content.title}</h3>
                <p>{previewContent.content.excerpt}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GYBContentAI;