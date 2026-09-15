// src/components/SuggestionsPanel.js
import React from 'react';
import { useAppConfig } from '../contexts/AppConfigContext';

/** Render yaml titles: all italic via CSS; `**text**` is the added bold-italic span. */
export function FormattedTitle({ title }) {
  const nodes = [];
  const re = /\*\*([^*]+)\*\*/g;
  let last = 0;
  let match;
  let key = 0;
  const text = title || '';
  while ((match = re.exec(text)) !== null) {
    if (match.index > last) {
      nodes.push(text.slice(last, match.index));
    }
    nodes.push(<strong key={key++}>{match[1]}</strong>);
    last = match.index + match[0].length;
  }
  if (last < text.length) {
    nodes.push(text.slice(last));
  }
  return <>{nodes}</>;
}

const SuggestionsPanel = ({ onSuggestionClick }) => {
  const { config, resolveIcon } = useAppConfig();

  const examples = config?.chat_page?.examples || [];

  return (
    <div className="suggestions-panel">
      <div className="suggestions-header">
        <h2 className="suggestions-title">Getting Started</h2>
        <p className="suggestions-subtitle">
          Choose a topic to get advice from all personas
        </p>
      </div>
      
      <div className="suggestions-grid">
        {examples.map((category, categoryIndex) => {
          const Icon = resolveIcon(category.icon);
          return (
            <div key={categoryIndex} className="suggestion-category">
              <div className="category-header">
                <div 
                  className="category-icon"
                  style={{ 
                    backgroundColor: category.bg_color || '#F3F4F6',
                    color: category.color || '#6B7280'
                  }}
                >
                  <Icon size={20} />
                </div>
                <h3 
                  className="category-title"
                  style={{ color: category.color || '#6B7280' }}
                >
                  <FormattedTitle title={category.title} />
                </h3>
              </div>
              
              <div className="suggestion-buttons">
                {(category.suggestions || []).map((suggestion, suggestionIndex) => (
                  <button
                    key={suggestionIndex}
                    onClick={() => onSuggestionClick(String(suggestion).replace(/\*\*([^*]+)\*\*/g, '$1'))}
                    className="suggestion-button"
                    style={{
                      borderColor: (category.color || '#6B7280') + '20',
                      '--hover-bg': category.bg_color || '#F3F4F6',
                      '--hover-border': category.color || '#6B7280',
                      '--hover-text': category.color || '#6B7280'
                    }}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SuggestionsPanel;
