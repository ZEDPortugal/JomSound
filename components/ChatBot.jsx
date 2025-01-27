import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { FaEnvelope } from 'react-icons/fa';

const ChatBot = ({ isLight }) => {
    const [message, setMessage] = useState('');
    const [response, setResponse] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [isSending, setIsSending] = useState(false);

    const sendEmail = (e) => {
        e.preventDefault();
        setIsSending(true);

        const templateParams = {
            to_name: 'jmportugal02@gmail.com',
            message: message,
        };

        emailjs
            .send('service_niuvpyt', 'template_cqg7256', templateParams, 'JgHHZTPmXZ3sYQYfn')
            .then((result) => {
                setResponse('Email sent successfully!');
                setMessage(''); // Clear the message field after sending
            })
            .catch((error) => {
                setResponse('Failed to send email. Please try again later.');
            })
            .finally(() => {
                setIsSending(false);
            });
    };

    return (
        <div>
            {/* Chatbot Toggle Button */}
            <button
                className={`fixed bottom-5 right-5 ${isLight ? 'bg-[#f0f0f0] text-black' : 'bg-[#121212] text-white'} rounded-full p-4 shadow-md hover:bg-[#ff2020] transition duration-300 font-consolas`}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Open chatbot"
            >
                <FaEnvelope size={20} />
            </button>

            {/* Chatbox */}
            {isOpen && (
                <div className={`fixed bottom-16 right-5 ${isLight ? 'bg-[#ffffff]' : 'bg-[#1b1b1b]'} shadow-lg rounded-lg p-6 w-80 font-consolas`}>
                    <h1 className={`text-lg font-semibold ${isLight ? 'text-black' : 'text-white'} mb-3 font-consolas`}>Message</h1>
                    <form onSubmit={sendEmail}>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type your message here"
                            className={`w-full h-24 border rounded-md p-2 mb-4 focus:outline-none focus:ring-2 ${isLight ? 'focus:ring-[#000000]' : 'focus:ring-[#ffffff]'} font-consolas`}
                            required
                        />
                        <button
                            type="submit"
                            className={`px-4 py-2 rounded-md w-full ${isLight ? 'bg-[#e0e0e0] text-black hover:bg-[#d0d0d0]' : 'bg-[#646464] text-white hover:bg-[#727272]'} transition duration-300 font-consolas`}
                            disabled={isSending}
                        >
                            {isSending ? 'Sending...' : 'Send Email'}
                        </button>
                    </form>
                    {response && (
                        <p className={`mt-3 text-sm ${response.includes('successfully') ? 'text-green-500' : 'text-red-500'} font-consolas`}>
                            {response}
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};

export default ChatBot;