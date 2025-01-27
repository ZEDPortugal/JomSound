import React from 'react'
import { FaEnvelope, FaPhone, FaRegCopyright } from 'react-icons/fa'

const Contacts = ({ isLight }) => {
  return (
    <div className={`contacts-container p-4 ${isLight ? 'bg-gray-100 text-gray-900' : 'bg-[#292929] text-gray-100'} items-center font-consolas `}>
      
      <h2 className="text-2xl font-bold mb-4 ml-4">Contacts</h2>
      <div className='ml-10'>
      <p className="mb-2">If you have any questions, feel free to reach out at:</p>
      
      <p className="mb-2 flex items-center">
   
        <FaEnvelope className="mr-2 text-red-500" /> <a href="mailto:jomz.portugal@gmail.com" className="ml-1 ">jomz.portugal@gmail.com</a>
      </p>
      <p className="mb-4 flex items-center">
        <FaPhone className="mr-2 text-red-500" /><a href="tel:+639086144807" className="ml-1">+63 9086144807</a>
      </p>
      </div>
      <footer className="footer mt-8 ">
        <div className="footer-content flex items-center justify-center">
          <p className="flex items-center">
            <FaRegCopyright className="mr-1" />
            2025 JomSound. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Contacts