// Mobile Menu Toggle Fix
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

menuBtn.addEventListener('click', () => {
    // Agar 'hidden' class hai toh hategi, nahi toh lag jayegi
    mobileMenu.classList.toggle('hidden');
});

// Bonus Fix: Jab mobile me kisi link (jaise Home, About) par click ho, toh menu apne aap band ho jaye
const mobileLinks = mobileMenu.querySelectorAll('a');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// Frontend Form Submission to Local Backend
// Frontend Form Submission to Live/Local Backend
const form = document.querySelector('form');

// ⚠️ DEPLOYMENT TIP: 
// Jab tum Render par backend deploy kar doge, toh niche waale URL ko badal kar 
// apna Render ka live link (e.g., 'https://your-app.onrender.com/api/contact') daal dena.
const BACKEND_URL = 'http://localhost:5000/api/contact';

form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Default reload rokne ke liye

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    try {
        // Yahan tumhara fetch aur URL dono sahi se set kar diye hain
        const response = await fetch(BACKEND_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();
        if (result.success) {
            alert('Message Sent Successfully!');
            form.reset(); // Form clear karne ke liye
        } else {
            alert('Something went wrong!');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Server connected nahi hai!');
    }
});