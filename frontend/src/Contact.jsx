import React, { useState } from 'react';
import { Send, MessageSquare } from 'lucide-react';

const Contact = () => {
  const [formStatus, setFormStatus] = useState('idle'); // idle, sending, sent, error

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("sending");

    // Extract data from the form using names
    const formData = new FormData(e.target);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      // 1. Ensure backend is running at http://localhost:5000
      const res = await fetch("http://localhost:5000/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      // 2. Parse the response
      const result = await res.json();

      if (res.ok && result.success) {
        setFormStatus("sent");
        e.target.reset(); // Clear form fields
      } else {
        setFormStatus("error");
      }
    } catch (err) {
      console.error("Frontend Connection Error:", err);
      setFormStatus("error");
    } finally {
      // 3. Reset the button back to "Send Message" after 3 seconds
      setTimeout(() => setFormStatus('idle'), 3000);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-gray-950">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-blue-400 text-sm font-medium mb-4">
            <MessageSquare size={16} />
            GET IN TOUCH
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Build Together</span>
          </h2>
        </div>
        
        <div className="bg-gray-900/50 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-gray-800 shadow-2xl">
          <form onSubmit={handleContactSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Name Input */}
              <div className="space-y-4">
                <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  Your Name
                </label>
                <input 
                  name="name" // Crucial for FormData
                  required 
                  type="text" 
                  className="w-full bg-gray-950/50 border border-gray-800 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  placeholder="Krish Sharma"
                />
              </div>

              {/* Email Input */}
              <div className="space-y-4">
                <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-purple-500" />
                  Email Address
                </label>
                <input 
                  name="email" // Crucial for FormData
                  required 
                  type="email" 
                  className="w-full bg-gray-950/50 border border-gray-800 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                  placeholder="krish@example.com"
                />
              </div>
            </div>

            {/* Message Input */}
            <div className="space-y-4">
              <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                Your Message
              </label>
              <textarea 
                name="message" // Crucial for FormData
                required 
                rows="5" 
                className="w-full bg-gray-950/50 border border-gray-800 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all resize-none"
                placeholder="I'd like to discuss a project..."
              />
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={formStatus === 'sending' || formStatus === 'sent'}
              className="group relative w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 text-white font-bold py-5 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
            >
              <div className="relative flex items-center justify-center gap-3 text-lg">
                {formStatus === 'idle' && (
                  <><Send size={22} />Send Message</>
                )}
                {formStatus === 'sending' && (
                  <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /><span>Sending...</span></>
                )}
                {formStatus === 'sent' && (
                  <span className="text-green-300">Message Sent Successfully!</span>
                )}
                {formStatus === 'error' && (
                  <span className="text-red-300">Error Sending. Try Again.</span>
                )}
              </div>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;