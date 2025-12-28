import React, { useState, useRef, useEffect } from 'react';
import './PDFAssistant.css';

export default function PDFAssistant({ onPdfUpload }) {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [pdfUrl, setPdfUrl] = useState('');
  const chatAreaRef = useRef(null);
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);

  // Cloudinary configuration
  const CLOUDINARY_UPLOAD_PRESET = 'paperai'; // Replace with your upload preset
  const CLOUDINARY_CLOUD_NAME = 'dghccliaa'; // Replace with your cloud name

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    autoResizeTextarea();
  }, [inputMessage]);

  const scrollToBottom = () => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  };

  const autoResizeTextarea = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }
  };

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    formData.append('resource_type', 'raw');

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/raw/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await response.json();
      
      if (data.secure_url) {
        return {
          url: data.secure_url,
          publicId: data.public_id,
          format: data.format,
          bytes: data.bytes,
        };
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      console.error('Cloudinary upload error:', error);
      throw error;
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setIsUploading(true);
      
      addMessage('user', null, file, 'uploading');
      
      try {
        const cloudinaryData = await uploadToCloudinary(file);
        
        setUploadedFile({
          ...file,
          cloudinaryUrl: cloudinaryData.url,
          cloudinaryPublicId: cloudinaryData.publicId,
        });
        
        setPdfUrl(cloudinaryData.url);
        
        if (onPdfUpload) {
          onPdfUpload({
            url: cloudinaryData.url,
            publicId: cloudinaryData.publicId,
            fileName: file.name,
            fileSize: file.size,
          });
        }
        
        console.log('📄 PDF uploaded successfully!');
        console.log('🔗 Cloudinary URL:', cloudinaryData.url);
        console.log('🆔 Public ID:', cloudinaryData.publicId);
        
        setMessages(prev => {
          const updated = [...prev];
          const lastMessage = updated[updated.length - 1];
          if (lastMessage.status === 'uploading') {
            lastMessage.status = 'uploaded';
            lastMessage.cloudinaryUrl = cloudinaryData.url;
          }
          return updated;
        });
        
        setIsUploading(false);
        
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          addMessage('ai', `Perfect! I've received "${file.name}" and it's been uploaded successfully. What would you like to know about this document?`);
        }, 1000);
        
      } catch (error) {
        setIsUploading(false);
        
        setMessages(prev => {
          const updated = [...prev];
          const lastMessage = updated[updated.length - 1];
          if (lastMessage.status === 'uploading') {
            lastMessage.status = 'error';
          }
          return updated;
        });
        
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          addMessage('ai', `Sorry, there was an error uploading "${file.name}". Please check your Cloudinary configuration and try again.`);
        }, 500);
      }
      
      event.target.value = '';
    }
  };

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      addMessage('user', inputMessage.trim());
      setInputMessage('');
      
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        addMessage('ai', generateAIResponse(inputMessage));
      }, 1500);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const addMessage = (sender, text, file = null, status = 'sent') => {
    const newMessage = {
      id: Date.now(),
      sender,
      text,
      file,
      status,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const generateAIResponse = (message) => {
    if (!pdfUrl) {
      return "Please upload a PDF document first so I can help you analyze it!";
    }
    
    const responses = [
      "I've analyzed the PDF. The document contains valuable information about this topic. What specific aspect would you like me to explain?",
      "Based on the PDF content, I can help you with that. Could you be more specific about which section you're interested in?",
      "Great question! From what I can see in the document, there are several key points to consider. Would you like me to summarize them?",
      "I understand your question. Let me break down the relevant information from the PDF for you.",
      "That's an interesting query! The document discusses this in detail. Would you like a summary or specific details?"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSampleMessage = () => {
    addMessage('user', 'Can you summarize the main points of this document?');
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      addMessage('ai', "I'd be happy to help! Please upload a PDF document first, and I'll provide you with a comprehensive summary of its main points.");
    }, 1500);
  };

  const copyUrlToClipboard = () => {
    navigator.clipboard.writeText(pdfUrl).then(() => {
      const btn = document.querySelector('.copy-url-btn');
      const originalText = btn.textContent;
      btn.textContent = '✅ Copied!';
      setTimeout(() => {
        btn.textContent = originalText;
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy:', err);
      alert('Failed to copy URL');
    });
  };

  return (
    <div className="pdf-assistant-container">
      <div className="assistant-wrapper">
        <div className="assistant-header">
          <div className="ai-avatar">🤖</div>
          <div className="header-info">
            <h1>AI PDF Assistant</h1>
            <p>Upload your PDF and ask me anything!</p>
          </div>
        </div>

        <div className="chat-area" ref={chatAreaRef}>
          {messages.length === 0 ? (
            <div className="welcome-message">
              <div className="welcome-icon">📄</div>
              <h2>Welcome to AI PDF Assistant</h2>
              <p>Upload a PDF document and I'll help you analyze, summarize, or answer questions about it.</p>
              <div className="quick-actions">
                <button 
                  className="quick-action-btn" 
                  onClick={() => fileInputRef.current.click()}
                  disabled={isUploading}
                >
                  📤 Upload PDF
                </button>
                <button 
                  className="quick-action-btn" 
                  onClick={handleSampleMessage}
                >
                  💡 See Example
                </button>
              </div>
            </div>
          ) : (
            <>
              {messages.map((message) => (
                <div key={message.id} className={`message ${message.sender}`}>
                  <div className="message-avatar">
                    {message.sender === 'ai' ? '🤖' : '👤'}
                  </div>
                  <div className="message-content">
                    {message.file ? (
                      <div className="pdf-preview">
                        <div className="pdf-icon">PDF</div>
                        <div className="pdf-info">
                          <div className="pdf-name">{message.file.name}</div>
                          <div className="pdf-size">
                            {(message.file.size / 1024).toFixed(2)} KB
                          </div>
                          {message.status === 'uploading' && (
                            <div className="upload-status uploading">
                              ⏳ Uploading to cloud...
                            </div>
                          )}
                          {message.status === 'uploaded' && message.cloudinaryUrl && (
                            <div className="upload-status uploaded">
                              ✅ Uploaded successfully
                              <a 
                                href={message.cloudinaryUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="cloudinary-link"
                              >
                                View on Cloud
                              </a>
                            </div>
                          )}
                          {message.status === 'error' && (
                            <div className="upload-status error">
                              ❌ Upload failed - Check Cloudinary config
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      message.text
                    )}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="typing-indicator">
                  <div className="message-avatar">🤖</div>
                  <div className="typing-dots">
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        <div className="input-area">
          {pdfUrl && (
            <div className="current-pdf-url">
              <span className="url-label">📎 Current PDF:</span>
              <a 
                href={pdfUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="url-link"
                title={pdfUrl}
              >
                {pdfUrl.length > 50 ? pdfUrl.substring(0, 50) + '...' : pdfUrl}
              </a>
              <button 
                className="copy-url-btn"
                onClick={copyUrlToClipboard}
              >
                📋 Copy
              </button>
            </div>
          )}
          
          <div className="input-container">
            <label className={`file-upload-btn ${isUploading ? 'uploading' : ''}`}>
              {isUploading ? '⏳' : '📎'}
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                onChange={handleFileUpload}
                disabled={isUploading}
                style={{ display: 'none' }}
              />
            </label>
            <div className="text-input-wrapper">
              <textarea
                ref={textareaRef}
                className="text-input"
                placeholder={isUploading ? 'Uploading PDF...' : 'Type your message or upload a PDF...'}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                disabled={isUploading}
                rows={1}
              />
            </div>
            <button 
              className="send-btn" 
              onClick={handleSendMessage}
              disabled={isUploading}
            >
              ➤
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}