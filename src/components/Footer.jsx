import React, { useState, useEffect } from 'react';


const Footer = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <ul className="footer-links">
          <li><a href="/about" className="footer-link">About</a></li>
          <li><a href="/contact" className="footer-link">Contact</a></li>
          <li><a href="/privacy" className="footer-link">Privacy</a></li>
        </ul>

        <div className="footer-date-time" onClick={toggleExpanded}>
          <span className="footer-time">{formatTime(currentDateTime)}</span>
          <span className="footer-date">{formatDate(currentDateTime)}</span>
        </div>

        {isExpanded && (
          <div className="footer-expanded-content">
            <div className="footer-social-links">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="footer-social-link">Github</a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="footer-social-link">LinkedIn</a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="footer-social-link">Twitter</a>
            </div>
            <p className="footer-copyright">
              © {currentDateTime.getFullYear()} Your Company. All Rights Reserved.
            </p>
          </div>
        )}

        <button 
          className="footer-toggle-button" 
          onClick={toggleExpanded}
          aria-expanded={isExpanded}
          aria-label={isExpanded ? 'Colapsar contenido' : 'Expandir contenido'}
        >
          {isExpanded ? 'Collapse' : 'Expand'}
        </button>
      </div>
    </footer>
  );
};

export default Footer;
