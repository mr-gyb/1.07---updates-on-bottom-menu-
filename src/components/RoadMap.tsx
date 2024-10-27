import React, { useState } from 'react';
import { ChevronLeft, ChevronDown, ChevronUp, Edit2, Save } from 'lucide-react';
import { Link } from 'react-router-dom';

const RoadMap: React.FC = () => {
  const [activeTab, setActiveTab] = useState('roadmap');
  const [currentStep, setCurrentStep] = useState(1);
  const [expandedStep, setExpandedStep] = useState<number | null>(null);
  const [editingSection, setEditingSection] = useState<number | null>(null);

  const roadmapSteps = [
    { title: 'Ideation', content: 'Brainstorm and validate your business idea' },
    { title: 'Planning', content: 'Develop a comprehensive business plan' },
    { title: 'Development', content: 'Build your product or service' },
    { title: 'Launch', content: 'Introduce your offering to the market' },
    { title: 'Growth', content: 'Scale your business and expand your reach' },
  ];

  const [marketingSalesPlan, setMarketingSalesPlan] = useState([
    {
      title: 'Market Research',
      content: 'Conduct thorough market research to identify target audience and competitors.'
    },
    {
      title: 'Define Unique Value Proposition',
      content: 'Clearly articulate what sets your product/service apart from competitors.'
    },
    {
      title: 'Set SMART Goals',
      content: 'Establish Specific, Measurable, Achievable, Relevant, and Time-bound goals for traffic and sales.'
    },
    {
      title: 'Develop Content Strategy',
      content: 'Create a content calendar and plan for blog posts, social media, and other marketing materials.'
    },
    {
      title: 'Implement SEO Strategy',
      content: 'Optimize website and content for search engines to improve organic traffic.'
    },
    {
      title: 'Utilize Social Media Marketing',
      content: 'Engage with audience on relevant social platforms and run targeted ad campaigns.'
    },
    {
      title: 'Email Marketing',
      content: 'Build and segment email list, create nurture sequences, and send regular newsletters.'
    },
    {
      title: 'Paid Advertising',
      content: 'Set up and optimize PPC campaigns on platforms like Google Ads and social media.'
    },
    {
      title: 'Conversion Rate Optimization',
      content: 'Continuously test and improve website and landing pages to increase conversions.'
    },
    {
      title: 'Analytics and Reporting',
      content: 'Regularly monitor KPIs and adjust strategies based on data-driven insights.'
    }
  ]);

  const [businessPlan, setBusinessPlan] = useState([
    { title: 'Executive Summary', content: 'Brief overview of your business plan' },
    { title: 'Company Description', content: 'Detailed information about your company' },
    { title: 'Market Analysis', content: 'Industry outlook and target market analysis' },
    { title: 'Organization and Management', content: 'Company structure and team' },
    { title: 'Product or Service Line', content: 'Description of your offerings' },
    { title: 'Marketing and Sales Strategy', content: 'How you\'ll attract and retain customers' },
    { title: 'Funding Request', content: 'Capital needs and allocation of funds' },
    { title: 'Financial Projections', content: 'Forecasted income statements, balance sheets, and cash flow' },
    { title: 'Appendix', content: 'Supporting documents and additional information' },
  ]);

  const [investorDeck, setInvestorDeck] = useState([
    { title: 'Company Overview', content: 'Brief introduction to your company' },
    { title: 'Problem', content: 'The problem your product/service solves' },
    { title: 'Solution', content: 'Your product/service and how it solves the problem' },
    { title: 'Market Opportunity', content: 'Size and growth potential of your target market' },
    { title: 'Business Model', content: 'How you make money' },
    { title: 'Go-to-Market Strategy', content: 'Your plan to reach and acquire customers' },
    { title: 'Competition', content: 'Overview of competitors and your competitive advantage' },
    { title: 'Team', content: 'Key team members and their expertise' },
    { title: 'Financials', content: 'Key metrics, projections, and funding needs' },
    { title: 'Vision', content: 'Long-term goals and potential exit strategies' },
  ]);

  const [marketAnalysis, setMarketAnalysis] = useState([
    { title: 'Industry Overview', content: 'Current state and trends in your industry' },
    { title: 'Target Market', content: 'Detailed description of your ideal customer' },
    { title: 'Market Size', content: 'Total addressable market (TAM) and serviceable available market (SAM)' },
    { title: 'Competitor 1', content: 'Analysis of top competitor 1' },
    { title: 'Competitor 2', content: 'Analysis of top competitor 2' },
    { title: 'Competitor 3', content: 'Analysis of top competitor 3' },
    { title: 'SWOT Analysis', content: 'Your strengths, weaknesses, opportunities, and threats' },
    { title: 'Unique Value Proposition', content: 'What sets you apart from competitors' },
    { title: 'Market Entry Strategy', content: 'How you plan to enter and capture market share' },
  ]);

  const [fulfilmentPlan, setFulfilmentPlan] = useState([
    { title: 'Supply Chain Management', content: 'Strategies for efficient supply chain operations' },
    { title: 'Inventory Management', content: 'Techniques for optimal inventory control' },
    { title: 'Order Processing', content: 'Steps for handling and processing customer orders' },
    { title: 'Shipping and Delivery', content: 'Methods for product shipping and delivery' },
    { title: 'Returns and Exchanges', content: 'Policies and procedures for handling returns and exchanges' },
    { title: 'Quality Control', content: 'Measures to ensure product quality and customer satisfaction' },
    { title: 'Scalability', content: 'Plans for scaling fulfilment operations as the business grows' },
  ]);

  const [mediaPlan, setMediaPlan] = useState([
    { title: 'Target Audience', content: 'Detailed description of the target audience for media campaigns' },
    { title: 'Media Objectives', content: 'Specific goals for media campaigns' },
    { title: 'Media Channels', content: 'Selection of appropriate media channels for reaching the target audience' },
    { title: 'Content Strategy', content: 'Plan for creating and distributing content across media channels' },
    { title: 'Budget Allocation', content: 'Distribution of budget across different media channels' },
    { title: 'Timeline', content: 'Schedule for media campaigns and content distribution' },
    { title: 'Performance Metrics', content: 'KPIs for measuring the success of media campaigns' },
  ]);

  const handleStepClick = (index: number) => {
    setExpandedStep(expandedStep === index ? null : index);
  };

  const handleEdit = (index: number) => {
    setEditingSection(index);
  };

  const handleSave = (index: number) => {
    setEditingSection(null);
  };

  const handleContentChange = (index: number, newContent: string, section: string) => {
    switch (section) {
      case 'roadmap':
        const updatedRoadmap = [...roadmapSteps];
        updatedRoadmap[index].content = newContent;
        // setRoadmapSteps(updatedRoadmap);
        break;
      case 'marketingSales':
        const updatedMarketingSales = [...marketingSalesPlan];
        updatedMarketingSales[index].content = newContent;
        setMarketingSalesPlan(updatedMarketingSales);
        break;
      case 'businessPlan':
        const updatedBusinessPlan = [...businessPlan];
        updatedBusinessPlan[index].content = newContent;
        setBusinessPlan(updatedBusinessPlan);
        break;
      case 'investorDeck':
        const updatedInvestorDeck = [...investorDeck];
        updatedInvestorDeck[index].content = newContent;
        setInvestorDeck(updatedInvestorDeck);
        break;
      case 'marketAnalysis':
        const updatedMarketAnalysis = [...marketAnalysis];
        updatedMarketAnalysis[index].content = newContent;
        setMarketAnalysis(updatedMarketAnalysis);
        break;
      case 'fulfilmentPlan':
        const updatedFulfilmentPlan = [...fulfilmentPlan];
        updatedFulfilmentPlan[index].content = newContent;
        setFulfilmentPlan(updatedFulfilmentPlan);
        break;
      case 'mediaPlan':
        const updatedMediaPlan = [...mediaPlan];
        updatedMediaPlan[index].content = newContent;
        setMediaPlan(updatedMediaPlan);
        break;
      default:
        break;
    }
  };

  const renderSections = (sections: { title: string; content: string }[], sectionType: string) => {
    return (
      <div className="space-y-6">
        {sections.map((section, index) => (
          <div key={index} className="bg-gray-100 rounded-lg p-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-semibold">{section.title}</h3>
              {editingSection === index ? (
                <button onClick={() => handleSave(index)} className="text-navy-blue">
                  <Save size={20} />
                </button>
              ) : (
                <button onClick={() => handleEdit(index)} className="text-navy-blue">
                  <Edit2 size={20} />
                </button>
              )}
            </div>
            {editingSection === index ? (
              <textarea
                value={section.content}
                onChange={(e) => handleContentChange(index, e.target.value, sectionType)}
                className="w-full h-32 p-2 border rounded"
              />
            ) : (
              <p className="text-gray-700">{section.content}</p>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'roadmap':
        return (
          <div className="space-y-4">
            {roadmapSteps.map((step, index) => (
              <div
                key={index}
                className={`bg-white rounded-lg p-4 cursor-pointer ${
                  currentStep === index + 1 ? 'border-2 border-gold' : ''
                }`}
                onClick={() => handleStepClick(index)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 ${
                        currentStep === index + 1 ? 'bg-gold text-white' : 'bg-navy-blue text-white'
                      }`}
                    >
                      {index + 1}
                    </div>
                    <h3 className="text-lg font-semibold">{step.title}</h3>
                  </div>
                  {expandedStep === index ? (
                    <ChevronUp size={20} />
                  ) : (
                    <ChevronDown size={20} />
                  )}
                </div>
                {expandedStep === index && (
                  <div className="mt-4">
                    <p>{step.content}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        );
      case 'marketingsales':
        return renderSections(marketingSalesPlan, 'marketingSales');
      case 'businessplan':
        return renderSections(businessPlan, 'businessPlan');
      case 'investordeck':
        return renderSections(investorDeck, 'investorDeck');
      case 'marketanalysis':
        return renderSections(marketAnalysis, 'marketAnalysis');
      case 'fulfilmentplan':
        return renderSections(fulfilmentPlan, 'fulfilmentPlan');
      case 'mediaplan':
        return renderSections(mediaPlan, 'mediaPlan');
      default:
        return null;
    }
  };

  return (
    <div className="bg-white min-h-screen text-navy-blue">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center mb-6">
          <Link to="/dashboard" className="mr-4 text-navy-blue">
            <ChevronLeft size={24} />
          </Link>
          <h1 className="text-3xl font-bold text-navy-blue">Road Map</h1>
        </div>
        <div className="flex flex-wrap space-x-2 space-y-2 mb-6">
          <button
            className={`px-4 py-2 rounded-full ${
              activeTab === 'roadmap' ? 'bg-navy-blue text-white' : 'bg-gray-200 text-navy-blue'
            }`}
            onClick={() => setActiveTab('roadmap')}
          >
            Road Map
          </button>
          <button
            className={`px-4 py-2 rounded-full ${
              activeTab === 'businessplan' ? 'bg-navy-blue text-white' : 'bg-gray-200 text-navy-blue'
            }`}
            onClick={() => setActiveTab('businessplan')}
          >
            Business Plan
          </button>
          <button
            className={`px-4 py-2 rounded-full ${
              activeTab === 'investordeck' ? 'bg-navy-blue text-white' : 'bg-gray-200 text-navy-blue'
            }`}
            onClick={() => setActiveTab('investordeck')}
          >
            Investor Deck
          </button>
          <button
            className={`px-4 py-2 rounded-full ${
              activeTab === 'marketanalysis' ? 'bg-navy-blue text-white' : 'bg-gray-200 text-navy-blue'
            }`}
            onClick={() => setActiveTab('marketanalysis')}
          >
            Market Analysis
          </button>
          <button
            className={`px-4 py-2 rounded-full ${
              activeTab === 'marketingsales' ? 'bg-navy-blue text-white' : 'bg-gray-200 text-navy-blue'
            }`}
            onClick={() => setActiveTab('marketingsales')}
          >
            Marketing/Sales Plan
          </button>
          <button
            className={`px-4 py-2 rounded-full ${
              activeTab === 'fulfilmentplan' ? 'bg-navy-blue text-white' : 'bg-gray-200 text-navy-blue'
            }`}
            onClick={() => setActiveTab('fulfilmentplan')}
          >
            Fulfilment Plan
          </button>
          <button
            className={`px-4 py-2 rounded-full ${
              activeTab === 'mediaplan' ? 'bg-navy-blue text-white' : 'bg-gray-200 text-navy-blue'
            }`}
            onClick={() => setActiveTab('mediaplan')}
          >
            Media Plan
          </button>
        </div>
        {renderTabContent()}
      </div>
    </div>
  );
};

export default RoadMap;