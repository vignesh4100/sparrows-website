import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

interface SelectiveInputProps {
  label: string;
  items: string[];
  onItemsChange: (items: string[]) => void;
  suggestions: string[];
  placeholder?: string;
}

const SelectiveInput: React.FC<SelectiveInputProps> = ({
  label,
  items,
  onItemsChange,
  suggestions,
  placeholder = "Add new item"
}) => {
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const addItem = (item: string) => {
    if (item.trim() && !items.includes(item.trim())) {
      onItemsChange([...items, item.trim()]);
    }
    setInputValue('');
    setShowSuggestions(false);
  };

  const removeItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    onItemsChange(newItems);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setShowSuggestions(e.target.value.length > 0);
  };

  const filteredSuggestions = suggestions.filter(
    suggestion => 
      suggestion.toLowerCase().includes(inputValue.toLowerCase()) &&
      !items.includes(suggestion)
  );

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      
      {/* Selected Items */}
      {items.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {items.map((item, index) => (
            <span
              key={index}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-red-100 text-red-800"
            >
              {item}
              <button
                type="button"
                onClick={() => removeItem(index)}
                className="ml-2 text-red-600 hover:text-red-800"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Input with Suggestions */}
      <div className="relative">
        <div className="flex">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onFocus={() => setShowSuggestions(inputValue.length > 0)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder={placeholder}
          />
          <button
            type="button"
            onClick={() => addItem(inputValue)}
            className="px-4 py-2 bg-red-600 text-white rounded-r-lg hover:bg-red-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Suggestions Dropdown */}
        {showSuggestions && filteredSuggestions.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
            {filteredSuggestions.map((suggestion, index) => (
              <button
                key={index}
                type="button"
                onClick={() => addItem(suggestion)}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectiveInput;