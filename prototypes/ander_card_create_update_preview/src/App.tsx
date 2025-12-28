import React, { useState } from 'react';
import { X, ChevronDown, Check, Lock, Play, FileText, HelpCircle, Video, Globe } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState('cards');
  const [cardData, setCardData] = useState({
    id: '123',
    disabled: false,
    publishMode: 'immediately',
    rule: 'Rule 1',
    title: 'Introducing an Icon',
    secondaryTitle: '2026 IONIQ 9',
    category: 'PRODUCT',
    categoryColor: '#1e3a5f',
    categoryTextColor: '#ffffff',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=250&fit=crop',
    minutes: 15,
    description: "You've waited for it. You've heard of it. You can't wait to see it live! Here is your introduction to the iconic new leader of the Hyundai EV pack. Introducing the 2026 IONIQ 9 three-row electric SUV!",
    templateId: 'card_template_123'
  });

  const [showPreview, setShowPreview] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    setCardData(prev => ({ ...prev, [field]: value }));
  };

  const templateStructure = [
    { level: 1, name: 'Activity Pack Name', type: 'PDF', icon: FileText, status: 'complete' },
    { level: 2, name: 'Activity Pack Name', type: 'Questions', icon: HelpCircle, status: 'active', count: 12 },
    { level: 2, name: 'Activity Pack Name', type: 'Non-linear', icon: null, status: 'locked' },
    { level: 3, name: 'Activity Pack Name', type: 'Video', icon: Video, status: 'locked', count: 3 },
    { level: 3, name: 'Activity Pack Name', type: 'WebView', icon: Globe, status: 'locked' }
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200">
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">Admin Panel</h2>
          <nav>
            <div className="mb-2">
              <div className="font-medium text-gray-700 mb-2">Content Management</div>
              <button
                onClick={() => setActiveSection('cards')}
                className={`w-full text-left px-4 py-2 rounded ${
                  activeSection === 'cards' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Cards
              </button>
            </div>
          </nav>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Breadcrumbs */}
          <div className="text-sm text-gray-600 mb-4">
            Content Management / Cards / Samuel
          </div>

          {/* Page Title */}
          <h1 className="text-3xl font-bold mb-8">Edit Card</h1>

          <div className="space-y-8">
            {/* General Info Widget */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">General Info</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Card ID</label>
                  <input
                    type="text"
                    value={cardData.id}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-50"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="disabled"
                    checked={cardData.disabled}
                    onChange={(e) => handleInputChange('disabled', e.target.checked)}
                    className="mr-2"
                  />
                  <label htmlFor="disabled" className="text-sm font-medium text-gray-700">
                    Disabled
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Publish mode</label>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="immediately"
                        name="publishMode"
                        value="immediately"
                        checked={cardData.publishMode === 'immediately'}
                        onChange={(e) => handleInputChange('publishMode', e.target.value)}
                        className="mr-2"
                      />
                      <label htmlFor="immediately" className="text-sm">Immediately</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="byDate"
                        name="publishMode"
                        value="by the date"
                        checked={cardData.publishMode === 'by the date'}
                        onChange={(e) => handleInputChange('publishMode', e.target.value)}
                        className="mr-2"
                      />
                      <label htmlFor="byDate" className="text-sm">By the date</label>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rule</label>
                  <select
                    value={cardData.rule}
                    onChange={(e) => handleInputChange('rule', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                  >
                    <option>Rule 1</option>
                    <option>Rule 2</option>
                    <option>Rule 3</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Card Preview Widget */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Card Preview</h2>

              <div className="grid grid-cols-2 gap-6">
                {/* Input Fields - Left Side */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                      type="text"
                      value={cardData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Secondary Title</label>
                    <input
                      type="text"
                      value={cardData.secondaryTitle}
                      onChange={(e) => handleInputChange('secondaryTitle', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <input
                      type="text"
                      value={cardData.category}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category Colour</label>
                    <input
                      type="color"
                      value={cardData.categoryColor}
                      onChange={(e) => handleInputChange('categoryColor', e.target.value)}
                      className="w-full h-10 border border-gray-300 rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category Text Colour</label>
                    <input
                      type="color"
                      value={cardData.categoryTextColor}
                      onChange={(e) => handleInputChange('categoryTextColor', e.target.value)}
                      className="w-full h-10 border border-gray-300 rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Card Image</label>
                    <input
                      type="text"
                      value={cardData.image}
                      onChange={(e) => handleInputChange('image', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                      placeholder="Image URL"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Minutes to complete</label>
                    <input
                      type="number"
                      value={cardData.minutes}
                      onChange={(e) => handleInputChange('minutes', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                  </div>
                </div>

                {/* Preview - Right Side */}
                <div className="flex justify-center items-start">
                  <div className="border-2 border-gray-200 rounded-lg overflow-hidden" style={{ width: '278px' }}>
                    <img src={cardData.image} alt="Card" className="w-full h-44 object-cover" />
                    <div
                      className="px-3 py-1 text-xs font-medium"
                      style={{
                        backgroundColor: cardData.categoryColor,
                        color: cardData.categoryTextColor
                      }}
                    >
                      {cardData.category}
                    </div>
                    <div className="p-4">
                      <div className="text-sm text-gray-600 mb-1">{cardData.secondaryTitle}</div>
                      <div className="text-lg font-bold mb-3">{cardData.title}</div>
                      <div className="flex items-center justify-between">
                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">4h 22m</span>
                        <span className="text-sm text-gray-600">{cardData.minutes} min</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card Details Widget */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Card Details</h2>

              <div className="grid grid-cols-2 gap-6">
                {/* Input Fields - Left Side */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      value={cardData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Card Template</label>
                    <a
                      href={`#${cardData.templateId}`}
                      className="text-blue-600 hover:underline"
                    >
                      {cardData.templateId}
                    </a>
                  </div>
                </div>

                {/* Preview - Right Side */}
                <div className="flex justify-center items-start">
                  <div className="border-2 border-gray-200 rounded-lg overflow-hidden bg-white" style={{ width: '375px', maxHeight: '667px', overflowY: 'auto' }}>
                    <div className="flex justify-between items-center p-4 border-b">
                      <button className="text-gray-600 hover:text-gray-800">
                        <X size={24} />
                      </button>
                    </div>

                    <img src={cardData.image} alt="Card" className="w-full object-cover" style={{ height: '174px' }} />

                    <div
                      className="px-3 py-1 text-xs font-medium"
                      style={{
                        backgroundColor: cardData.categoryColor,
                        color: cardData.categoryTextColor
                      }}
                    >
                      {cardData.category}
                    </div>

                    <div className="p-4">
                      <div className="text-sm text-gray-600 mb-1">{cardData.secondaryTitle}</div>
                      <div className="text-xl font-bold mb-2">{cardData.title}</div>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">4h 22m</span>
                        <span className="text-xs text-gray-500">Required</span>
                      </div>
                      <p className="text-sm text-gray-700 mb-6">{cardData.description}</p>

                      <div className="mb-4">
                        <div className="text-xs font-semibold text-gray-600 mb-2">25% PROGRESS</div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                        </div>
                        <div className="text-xs text-gray-500 mt-1 text-right">3/12</div>
                      </div>

                      {/* Template Structure */}
                      {templateStructure.map((item, idx) => (
                        <div key={idx} className="mb-3">
                          <div className="text-xs font-semibold text-gray-500 mb-2">LEVEL NAME {item.level}</div>
                          <div className={`border rounded-lg p-3 flex items-center gap-3 ${
                            item.status === 'active' ? 'border-blue-500 bg-blue-50' :
                            item.status === 'locked' ? 'bg-gray-50' : 'bg-green-50'
                          }`}>
                            {item.status === 'complete' && (
                              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                                <Check size={16} className="text-white" />
                              </div>
                            )}
                            {item.status === 'active' && (
                              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                                <Play size={14} className="text-white" />
                              </div>
                            )}
                            {item.status === 'locked' && (
                              <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                                <Lock size={18} className="text-gray-400" />
                              </div>
                            )}
                            <div className="flex-1">
                              <div className="font-medium text-sm">{item.name}</div>
                              <div className="text-xs text-gray-600 flex items-center gap-1">
                                {item.icon && <item.icon size={12} />}
                                {item.type === 'PDF' && '2 PDF'}
                                {item.type === 'Questions' && `${item.count} questions`}
                                {item.type === 'Non-linear' && 'non-linear'}
                                {item.type === 'Video' && `${item.count} video`}
                                {item.type === 'WebView' && 'WebView'}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
