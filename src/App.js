import React, { useState, useMemo } from 'react';
import { Search, Shuffle, List, Filter } from 'lucide-react';
import questionsData from './questions.json';

const App = () => {
  // Sample questions - you can replace these with your own
  const allQuestions = questionsData.questions;
  const categories = [...new Set(allQuestions.map(q => q.category))];

  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [view, setView] = useState('card'); // 'card' or 'list'

  // Filter questions based on category and search
  const filteredQuestions = useMemo(() => {
    let filtered = allQuestions;
    
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(q => q.category === selectedCategory);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(q => 
        q.text.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  }, [selectedCategory, searchTerm]);

  const getRandomQuestion = () => {
    if (filteredQuestions.length === 0) return;
    const randomIndex = Math.floor(Math.random() * filteredQuestions.length);
    setCurrentQuestion(filteredQuestions[randomIndex]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center py-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Deep Connection Cards
          </h1>
          <p className="text-purple-200">Break the ice, build deeper relationships</p>
        </div>

        {/* Controls */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 mb-6">
          {/* Search */}
          <div className="mb-4">
            <label className="flex items-center text-white mb-2">
              <Search className="w-4 h-4 mr-2" />
              Search Questions
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Type to search..."
              className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* Quick Pick Buttons */}
          <div className="mb-4">
            <label className="flex items-center text-white mb-2">
              <Shuffle className="w-4 h-4 mr-2" />
              Quick Pick
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setTimeout(() => getRandomQuestion(), 0);
                }}
                className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-4 rounded-lg transition"
              >
                Any Category
              </button>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setTimeout(() => {
                      const filtered = allQuestions.filter(q => q.category === cat);
                      if (filtered.length > 0) {
                        const randomIndex = Math.floor(Math.random() * filtered.length);
                        setCurrentQuestion(filtered[randomIndex]);
                      }
                    }, 0);
                  }}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* View Toggle Button */}
          <div className="flex gap-3">
            <button
              onClick={() => setView(view === 'card' ? 'list' : 'card')}
              className="w-full bg-white/20 hover:bg-white/30 text-white font-semibold py-3 px-6 rounded-lg transition flex items-center justify-center gap-2"
            >
              <List className="w-5 h-5" />
              {view === 'card' ? 'Show All' : 'Card View'}
            </button>
          </div>

          {/* Question Count */}
          <p className="text-white/70 text-sm text-center mt-4">
            {filteredQuestions.length} question{filteredQuestions.length !== 1 ? 's' : ''} available
          </p>
        </div>

        {/* Card View */}
        {view === 'card' && (
          <div className="flex items-center justify-center min-h-[300px]">
            {currentQuestion ? (
              <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 max-w-2xl w-full transform hover:scale-105 transition-transform">
                <div className="mb-4">
                  <span className="inline-block bg-purple-100 text-purple-800 text-sm font-semibold px-3 py-1 rounded-full">
                    {currentQuestion.category}
                  </span>
                </div>
                <p className="text-2xl md:text-3xl text-gray-800 font-medium leading-relaxed">
                  {currentQuestion.text}
                </p>
              </div>
            ) : (
              <div className="text-center text-white/60">
                <p className="text-xl mb-4">Click "Random Question" to start</p>
                <Shuffle className="w-16 h-16 mx-auto opacity-50" />
              </div>
            )}
          </div>
        )}

        {/* List View */}
        {view === 'list' && (
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-h-[600px] overflow-y-auto">
            {filteredQuestions.length > 0 ? (
              <div className="space-y-4">
                {filteredQuestions.map((question) => (
                  <div 
                    key={question.id}
                    className="p-4 border border-gray-200 rounded-lg hover:bg-purple-50 transition cursor-pointer"
                    onClick={() => {
                      setCurrentQuestion(question);
                      setView('card');
                    }}
                  >
                    <span className="inline-block bg-purple-100 text-purple-800 text-xs font-semibold px-2 py-1 rounded-full mb-2">
                      {question.category}
                    </span>
                    <p className="text-gray-800">{question.text}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-8">
                No questions found. Try adjusting your filters.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;