import React, { useState, useEffect } from 'react';

const TypewriterEffect = ({ lines, speed = 50, onComplete }) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let currentText = '';
    let lineIndex = 0;
    let charIndex = 0;
    let timeout;

    const type = () => {
      if (lineIndex >= lines.length) {
        if (onComplete) onComplete();
        return;
      }

      const currentLine = lines[lineIndex];
      if (charIndex < currentLine.length) {
        currentText += currentLine[charIndex];
        setDisplayText(currentText);
        charIndex++;
        timeout = setTimeout(type, speed);
      } else {
        currentText += '\n'; // Add newline character after each line
        setDisplayText(currentText);
        lineIndex++;
        charIndex = 0;
        timeout = setTimeout(type, speed * 2); // Pause slightly between lines
      }
    };

    type();

    return () => clearTimeout(timeout);
  }, [lines, speed, onComplete]);

  // Use dangerouslySetInnerHTML to render the styled spans
  const createMarkup = () => {
    const htmlString = displayText.split('\n').map((line, i) => {
       const isLastLineTyping = i === displayText.split('\n').length - 2;
       const cursor = isLastLineTyping ? '<span class="cursor"></span>' : '';
       
       // UPDATED: Now uses a single 'prefix' class for all matches
       const styledLine = line.replace(/(\[.*?\])/, '<span class="prefix">$1</span>');

       return `<p>${styledLine}${cursor}</p>`;
    }).join('');
    
    return { __html: htmlString };
  };

  return <div className="typewriter-text" dangerouslySetInnerHTML={createMarkup()} />;
};

export default TypewriterEffect;