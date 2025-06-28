Jishnu Shyam's Personal Portfolio Website
This is a sleek, dynamic, and responsive personal portfolio website designed to showcase my profile, skills, and projects. It features a dark theme, modern design elements, and a functional contact form.

Table of Contents
Features

Technologies Used

Setup and Installation

Usage

Customization

Contact

Features
Responsive Design: Adapts seamlessly to various screen sizes (mobile, tablet, desktop).

Dark Theme: A modern, deep black aesthetic for a professional look.

Dynamic Hero Section: Engaging fade-in animation for the main heading.

Concise Introduction: Highlights key professional aspects and certifications.

Skills Showcase: A clear, two-column grid displaying technical skills with proficiency levels.

Projects Section: Layout for showcasing your portfolio projects.

Resume/CV Section: Direct link for viewing or downloading your resume.

Functional Contact Form: Allows visitors to send messages directly to your email via Formspree.io.

Social Media Integration: Links to LinkedIn, Gmail, and GitHub on the homepage.

Smooth Scrolling: Enhanced user experience for navigation links.

Technologies Used
HTML5: For the core structure and content.

CSS3: For styling, including custom properties and animations.

Tailwind CSS: A utility-first CSS framework for rapid and responsive styling.

JavaScript (Vanilla JS): For interactive elements like the mobile navigation toggle and form submission handling.

Font Awesome: For scalable vector icons.

Google Fonts (Inter): For modern and legible typography.

Formspree.io: (External Service) Used for handling contact form submissions without a backend server.

Setup and Installation
To get a copy of this project up and running on your local machine, follow these simple steps:

Clone the repository (or download the files):
If you have Git:

git clone <repository_url>
cd <repository_name>

If you downloaded: Extract the ZIP file to your desired folder.

Ensure all files are in the same directory:
Make sure you have the following files in your project folder:

index.html

style.css

script.js

jishnushyam.pdf (your resume)

image_691bf3.png (your profile picture)

Open in your browser:
Simply open the index.html file in your preferred web browser. You can usually do this by double-clicking the file or by right-clicking and selecting "Open with Browser".

Usage
Navigation: Use the navigation links in the header to jump between sections. On mobile, use the hamburger menu to reveal navigation.

Contact Form: Fill out the form in the "Contact" section and click "Send Message". A success/error notification will appear.

View CV: Click the "View / Download Resume (PDF)" button in the "My CV" section to access your resume.

Social Links: Click the social media icons on the homepage to visit my profiles.

Customization
You can easily customize this portfolio to make it your own:

Update Content (index.html):

Your Name: Change "Jishnu Shyam" in the hero section and footer.

Profile Picture: Replace image_691bf3.png with your own image. For best results, ensure your image has a transparent background (PNG format) and is optimized for web use. Update the src attribute of the <img> tag in the hero section.

Profession/Tagline: Edit the text below your name in the hero section.

About Me: Customize the paragraphs in the "About Me" section to reflect your personal story, experiences, and aspirations.

Skills: Modify the skill names and proficiency levels in the "My Skills" section.

Projects: Update the project titles, descriptions, and image placeholders (https://placehold.co/...) in the "My Portfolio" section with your actual project details and images.

Resume/CV: Ensure the href attribute in the "My CV" section's <a> tag points to your actual resume file (e.g., jishnushyam.pdf).

Update Links:

Social Media Icons: Change the href attributes for LinkedIn, Gmail (mailto), and GitHub icons in the hero section to your actual profile links.

Project Links: Update the href attributes for "View Project" buttons to your live project demos or GitHub repositories.

Update Formspree Endpoint (index.html):

In the <form> tag within the "Contact" section, replace https://formspree.io/f/your_unique_formspree_id with your unique Formspree endpoint URL. This is crucial for receiving messages. Remember to activate your form by submitting a test message and clicking the confirmation link from Formspree.

Styling (style.css):

Colors: Modify the CSS variables in the :root selector for --dark-bg-primary, --accent-color, and --green-color to change the overall theme colors.

Fonts: Adjust the font-family in the body selector if you want to use a different font.

Animations: Tweak the animation-delay or duration for the fadeInUp animation if desired.

Contact
Feel free to reach out to me!

Email: jishnushyam25@gmail.com

LinkedIn: linkedin.com/in/jishnushyam

GitHub: github.com/yourgithubprofile (Remember to update this link!)
