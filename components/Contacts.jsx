import React from 'react'
import './Contacts.css' // Import the CSS file for styling

const Contacts = () => {
  return (
    <div className="contacts-container">
      <h2>Contact Us</h2>
      <p>If you have any questions, feel free to reach out to us at:</p>
      <p>Email: <a href="mailto:jomz.portugal@gmail.com">jomz.portugal@gmail.com</a></p>
      <footer>
        <p>&copy; 2023 Your Company. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default Contacts