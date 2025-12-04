import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import QRCodeCanvas from './components/QRCodeCanvas';
import { ZapIcon, SettingsIcon, DownloadIcon } from './components/Icons';
import { TEXT_TYPES, COLORS } from './utils/constants';
import { Keyboard, Type } from "lucide-react";

const App = () => {
  // --- State Management ---
  const [qrData, setQrData] = useState('');
  const [input, setInput] = useState('');
  const [selectedType, setSelectedType] = useState(TEXT_TYPES[0]);
  const [fgColor, setFgColor] = useState(COLORS[0].hex);
  const [fgContrastColor, setFgContrastColor] = useState('#ffffff');
  const [isGenerating, setIsGenerating] = useState(false);
  const [message, setMessage] = useState('');
  const qrCanvasRef = useRef(null);

  // --- Generator Logic ---
  const handleGenerate = () => {
    if (input.trim() === '') {
      setMessage('Please enter data to generate a QR code.');
      return;
    }
    setIsGenerating(true);
    setMessage('Generating QR Code...');
    setTimeout(() => {
      setQrData(input);
      setMessage('QR Code generated successfully!');
      setIsGenerating(false);
    }, 500);
  };

  // Download
  const handleDownload = () => {
    if (!qrCanvasRef.current) {
      setMessage('QR canvas not found');
      return;
    }

    const link = document.createElement('a');
    link.download = `MarcNavy_QR_${Date.now()}.png`;
    link.href = qrCanvasRef.current.toDataURL('image/png');
    link.click();

    setMessage('QR Code downloaded successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50 font-inter antialiased flex flex-col">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 w-full">

        <div className="text-center mb-12 animate-fade-in-up delay-100">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-3 tracking-tight">
            Ready-In-Seconds <span className="text-blue-600">QR Codes</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Turning your chaos into a neat QR code — designed by MarcNavy.
          </p>
        </div>

        <section
          id="generator"
          className="grid grid-cols-1 lg:grid-cols-3 gap-10 animate-fade-in-up delay-200"
        >
          <div className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-100 transition-all hover:shadow-2xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <Keyboard className="w-6 h-6 mr-2 text-blue-600" />
              Data Input & Settings
            </h2>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                QR Code Content Type
              </label>
              <div className="flex flex-wrap gap-3">
                {TEXT_TYPES.map((type) => (
                  <button
                    key={type.key}
                    onClick={() => {
                      setSelectedType(type);
                      setInput('');
                      setQrData('');
                    }}
                    className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 shadow-sm flex items-center
                      ${
                        selectedType.key === type.key
                          ? 'bg-blue-600 text-white shadow-blue-300/50 scale-105'
                          : 'bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:shadow'
                      }`}
                  >
                    <type.icon className="w-4 h-4 inline mr-2" />
                    {type.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="qr-input" className="block text-sm font-medium text-gray-700 mb-2">
                Enter {selectedType.name} Data
              </label>
              <textarea
                id="qr-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={4}
                placeholder={selectedType.placeholder}
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-inner hover:shadow-md"
              />
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                <SettingsIcon className="w-5 h-5 mr-1 text-gray-500" /> Customization
              </h3>
              <div className="flex flex-wrap gap-4 items-center">
                <span className="text-sm font-medium text-gray-700">Foreground Color:</span>
                {COLORS.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setFgColor(color.hex)}
                    className="w-8 h-8 rounded-full border-2 transition-all duration-300 transform hover:scale-125 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    style={{
                      backgroundColor: color.hex,
                      borderColor: fgColor === color.hex ? '#4F46E5' : 'transparent',
                    }}
                    aria-label={`Select ${color.name} color`}
                  >
                    {fgColor === color.hex && (
                      <span className="block w-full h-full rounded-full border-2 border-white animate-ping-slow"></span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={isGenerating || input.trim() === ''}
              className="w-full py-3 mt-4 text-lg font-bold text-white bg-blue-600 rounded-xl shadow-lg shadow-blue-500/50 hover:bg-blue-700 transition-all duration-300 transform hover:scale-[1.02] active:scale-95 disabled:bg-blue-400 disabled:shadow-none disabled:cursor-not-allowed"
            >
              {isGenerating ? 'Processing...' : 'Generate QR Code'}
            </button>
          </div>

          <div className="lg:col-span-1 flex flex-col items-center p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-white shadow-2xl border border-blue-200 sticky top-24 h-fit transition-all hover:shadow-blue-200/50">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Your QR Code</h2>

            <div className="p-4 bg-white rounded-xl shadow-inner mb-6 transition-transform hover:scale-105 duration-300">
              {qrData ? (
                <div id="qr-canvas-element-container">
                  <QRCodeCanvas
                    ref={qrCanvasRef}
                    data={qrData}
                    fgColor={fgColor}
                    size={256}
                    fgContrastColor={fgContrastColor}
                  />
                </div>
              ) : (
                <div className="w-64 h-64 flex items-center justify-center bg-gray-100 rounded-xl border-dashed border-2 border-gray-300 text-gray-500">
                  Enter data to see your code
                </div>
              )}
            </div>

            <button
              onClick={handleDownload}
              disabled={!qrData}
              className="w-full flex items-center justify-center py-3 text-lg font-bold text-white bg-green-500 rounded-xl shadow-lg shadow-green-500/50 hover:bg-green-600 transition-all duration-300 transform hover:scale-[1.02] active:scale-95 disabled:bg-gray-400 disabled:shadow-none disabled:cursor-not-allowed"
            >
              <DownloadIcon className="w-5 h-5 mr-2" />
              Download as PNG
            </button>

            {message && (
              <p
                className={`mt-4 text-sm text-center font-medium animate-pulse ${
                  message.includes('success') ? 'text-green-600' : 'text-gray-600'
                }`}
              >
                {message}
              </p>
            )}
          </div>
        </section>

        <section id="howitworks" className="pt-24 animate-fade-in-up delay-300">
          <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { step: 1, title: 'Input Data', desc: 'Select the type (URL, Text or Email) and enter your content into the field.' },
              { step: 2, title: 'Customize', desc: "Choose a foreground color and click 'Generate QR Code' to generate the QR code." },
              { step: 3, title: 'Download', desc: "Click 'Download as PNG' to get the image ready to scan." }
            ].map((item) => (
              <div key={item.step} className="p-8 bg-white rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-gray-100 group">
                <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                  <span className="text-3xl font-bold text-blue-600 group-hover:text-white transition-colors duration-300">{item.step}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="about" className="pt-24 animate-fade-in-up delay-400">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 sm:p-16 rounded-3xl shadow-2xl text-center transform transition-transform hover:scale-[1.01]">
            <h2 className="text-4xl font-extrabold mb-6">About</h2>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed opacity-90">
              MarcNavy QR Generator was built to make professional QR code generation accessible to everyone. We prioritize speed, simplicity, and modern design, ensuring your data sharing is always efficient and looks great.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default App;
