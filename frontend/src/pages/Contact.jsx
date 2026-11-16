
import { useState } from 'react';
import './Contact.css';

export default function Contact() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setForm(current => ({
            ...current,
            [name]: value,
        }));

        setSubmitted(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Demo only: no message is sent to a backend.
        setSubmitted(true);
    };

    return (
        <main className="contact">
            <h1>Contact Us</h1>

            <section className="contact__panel">
                <h2>Get in Touch</h2>
                <p>
                    Have a question about our products or need
                    assistance? Send us a message using the form
                    below. We'd be happy to hear from you.
                </p>

                <form onSubmit={handleSubmit}>
                    <div className="contact__field">
                        <label htmlFor="name">Full Name</label>
                        <input
                            id="name"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="contact__field">
                        <label htmlFor="email">Email Address</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="contact__field">
                        <label htmlFor="subject">Subject</label>
                        <input
                            id="subject"
                            name="subject"
                            value={form.subject}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="contact__field">
                        <label htmlFor="message">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            rows="6"
                            value={form.message}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit" className="contact__button">
                        Send Message
                    </button>

                    {submitted && (
                        <p className="contact__success" role="status">
                            Demo submission successful. No message was sent.
                        </p>
                    )}
                </form>
            </section>
        </main>
    );
}
