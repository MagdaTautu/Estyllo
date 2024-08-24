import React, { useRef } from 'react';
import "../styles/programari.css"
import emailjs from '@emailjs/browser';
function Contact() {
    const form = useRef();

const sendEmail = (e) => {
    e.preventDefault();
    emailjs
        .sendForm('service_v4k6okq', 'template_e76j773', form.current, {
        publicKey: 'x4jYf-9vgr8qSIvl5',
        })
        .then(
        () => {
            alert("Mesaj trimis cu succes!")
        },
        (error) => {
            console.log('FAILED...', error.text);
        },
        );
    };
  return (
    <div id='contact'>

        <h1>Pentru informatii despre servicii si preturi, contactati-ne folosind urmatorul formular:</h1>
        <form ref={form} onSubmit={sendEmail}>
            <div>
                <label>Nume</label>
                <input type="text" name="user_name" />
            </div>
            <div>
                <label>Email</label>
                <input type="email" name="user_email" />
            </div>
            <div>
                <label>Subiect</label>
                <input type="text" name="subject" />
            </div>
            <div>
                <label>Mesaj</label>
                <textarea name="message" />
            </div>
           
            <input type="submit" value="Trimite" className='send' />
        </form>
    </div>
  )
}

export default Contact