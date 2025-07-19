/**
 * This script dynamically creates the login page structure,
 * injects CSS styles, and adds event listeners for toggling
 * between sign-in and sign-up views.
 */

const cssStyles = `
@import url('https://fonts.googleapis.com/css?family=Montserrat:400,800');

* {
	box-sizing: border-box;
}

body {
	background: #f6f5f7;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	font-family: 'Montserrat', sans-serif;
	height: 100vh;
	margin: -20px 0 50px;
}

h1 {
	font-weight: bold;
	margin: 0;
}

h2 {
	text-align: center;
}

p {
	font-size: 14px;
	font-weight: 100;
	line-height: 20px;
	letter-spacing: 0.5px;
	margin: 20px 0 30px;
}

span {
	font-size: 12px;
}

a {
	color: #333;
	font-size: 14px;
	text-decoration: none;
	margin: 15px 0;
}

button {
	border-radius: 20px;
	border: 1px solid #FF4B2B;
	background-color: #FF4B2B;
	color: #FFFFFF;
	font-size: 12px;
	font-weight: bold;
	padding: 12px 45px;
	letter-spacing: 1px;
	text-transform: uppercase;
	transition: transform 80ms ease-in;
	cursor: pointer;
}

button:active {
	transform: scale(0.95);
}

button:focus {
	outline: none;
}

button.ghost {
	background-color: transparent;
	border-color: #FFFFFF;
}

form {
	background-color: #FFFFFF;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	padding: 0 50px;
	height: 100%;
	text-align: center;
}

input {
	background-color: #eee;
	border: none;
	padding: 12px 15px;
	margin: 8px 0;
	width: 100%;
}

.container {
	background-color: #fff;
	border-radius: 10px;
  	box-shadow: 0 14px 28px rgba(0,0,0,0.25), 
			0 10px 10px rgba(0,0,0,0.22);
	position: relative;
	overflow: hidden;
	width: 768px;
	max-width: 100%;
	min-height: 480px;
}

.form-container {
	position: absolute;
	top: 0;
	height: 100%;
	transition: all 0.6s ease-in-out;
}

.sign-in-container {
	left: 0;
	width: 50%;
	z-index: 2;
}

.container.right-panel-active .sign-in-container {
	transform: translateX(100%);
}

.sign-up-container {
	left: 0;
	width: 50%;
	opacity: 0;
	z-index: 1;
}

.container.right-panel-active .sign-up-container {
	transform: translateX(100%);
	opacity: 1;
	z-index: 5;
	animation: show 0.6s;
}

@keyframes show {
	0%, 49.99% {
		opacity: 0;
		z-index: 1;
	}
	
	50%, 100% {
		opacity: 1;
		z-index: 5;
	}
}

.overlay-container {
	position: absolute;
	top: 0;
	left: 50%;
	width: 50%;
	height: 100%;
	overflow: hidden;
	transition: transform 0.6s ease-in-out;
	z-index: 100;
}

.container.right-panel-active .overlay-container{
	transform: translateX(-100%);
}

.overlay {
	background: #FF416C;
	background: -webkit-linear-gradient(to right, #FF4B2B, #FF416C);
	background: linear-gradient(to right, #FF4B2B, #FF416C);
	background-repeat: no-repeat;
	background-size: cover;
	background-position: 0 0;
	color: #FFFFFF;
	position: relative;
	left: -100%;
	height: 100%;
	width: 200%;
  	transform: translateX(0);
	transition: transform 0.6s ease-in-out;
}

.container.right-panel-active .overlay {
  	transform: translateX(50%);
}

.overlay-panel {
	position: absolute;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	padding: 0 40px;
	text-align: center;
	top: 0;
	height: 100%;
	width: 50%;
	transform: translateX(0);
	transition: transform 0.6s ease-in-out;
}

.overlay-left {
	transform: translateX(-20%);
}

.container.right-panel-active .overlay-left {
	transform: translateX(0);
}

.overlay-right {
	right: 0;
	transform: translateX(0);
}

.container.right-panel-active .overlay-right {
	transform: translateX(20%);
}

.social-container {
	margin: 20px 0;
}

.social-container a {
	border: 1px solid #DDDDDD;
	border-radius: 50%;
	display: inline-flex;
	justify-content: center;
	align-items: center;
	margin: 0 5px;
	height: 40px;
	width: 40px;
}

footer {
    background-color: #222;
    color: #fff;
    font-size: 14px;
    bottom: 0;
    position: fixed;
    left: 0;
    right: 0;
    text-align: center;
    z-index: 999;
}

footer p {
    margin: 10px 0;
}

footer i {
    color: red;
}

footer a {
    color: #3c97bf;
    text-decoration: none;
}

/* Font Awesome icons */
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css');
`;

// Inject CSS styles into the document head
function injectStyles() {
	const style = document.createElement('style');
	style.textContent = cssStyles;
	document.head.appendChild(style);
}

// Create social media icon link
function createSocialIcon(href, iconClass) {
	const a = document.createElement('a');
	a.href = href;
	a.className = 'social';
	const i = document.createElement('i');
	i.className = iconClass;
	a.appendChild(i);
	return a;
}

// Create the form container (sign-up or sign-in)
function createFormContainer(type) {
	const formContainer = document.createElement('div');
	formContainer.className = 'form-container ' + (type === 'sign-up' ? 'sign-up-container' : 'sign-in-container');

	const form = document.createElement('form');
	form.action = '#';

	const h1 = document.createElement('h1');
	h1.textContent = type === 'sign-up' ? 'Create Account' : 'Sign in';

	const socialContainer = document.createElement('div');
	socialContainer.className = 'social-container';
	socialContainer.appendChild(createSocialIcon('#', 'fab fa-facebook-f'));
	socialContainer.appendChild(createSocialIcon('#', 'fab fa-google-plus-g'));
	socialContainer.appendChild(createSocialIcon('#', 'fab fa-linkedin-in'));

	const span = document.createElement('span');
	span.textContent = type === 'sign-up' ? 'or use your email for registration' : 'or use your account';

	form.appendChild(h1);
	form.appendChild(socialContainer);
	form.appendChild(span);

	if (type === 'sign-up') {
		const inputName = document.createElement('input');
		inputName.type = 'text';
		inputName.placeholder = 'Name';
		inputName.name = 'name';
		form.appendChild(inputName);
	}

	const inputEmail = document.createElement('input');
	inputEmail.type = 'email';
	inputEmail.placeholder = 'Email';
	inputEmail.name = 'email';
	form.appendChild(inputEmail);

	const inputPassword = document.createElement('input');
	inputPassword.type = 'password';
	inputPassword.placeholder = 'Password';
	inputPassword.name = 'password';
	form.appendChild(inputPassword);

	if (type === 'sign-in') {
		const forgotLink = document.createElement('a');
		forgotLink.href = '#';
		forgotLink.textContent = 'Forgot your password?';
		form.appendChild(forgotLink);
	}

	const button = document.createElement('button');
	button.type = 'submit';
	button.textContent = type === 'sign-up' ? 'Sign Up' : 'Sign In';
	form.appendChild(button);

	// Add submit event listener to handle API calls
		form.addEventListener('submit', async (e) => {
			e.preventDefault();
			const formData = new FormData(form);
			const data = {};
			formData.forEach((value, key) => {
				data[key] = value;
			});

			if (type === 'sign-in') {
				// Before login, check if password reset is required for CES users
				if (data.email && data.email.startsWith('CES')) {
					try {
						const checkResponse = await fetch('http://localhost:5000/api/check-first-login', {
							method: 'POST',
							headers: {
								'Content-Type': 'application/json',
							},
							body: JSON.stringify({ id: data.email }),
						});
						const checkResult = await checkResponse.json();
						if (checkResponse.ok && checkResult.isFirstLogin) {
							// Redirect to password reset page immediately
							window.location.replace(`/HTML/password_reset.html?id=${data.email}`);
							return;
						}
					} catch (error) {
						alert('Error checking first login status');
						return;
					}
				}
			}

			const url = type === 'sign-up' ? 'http://localhost:5000/api/register' : 'http://localhost:5000/api/login';

			try {
				const response = await fetch(url, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(data),
				});
				const result = await response.json();
				if (response.ok) {
					alert(result.message);
					if (type === 'sign-in') {
						console.log('User logged in:', result.user);
						// Redirect to dashboard or home page as needed
						window.location.href = '/HTML/dashboard.html';
					}
				} else {
					alert(result.message || 'Error occurred');
				}
			} catch (error) {
				alert('Cannot connect to server');
			}
		});

	formContainer.appendChild(form);
	return formContainer;
}

// Create overlay panel
function createOverlayPanel(side) {
	const panel = document.createElement('div');
	panel.className = 'overlay-panel overlay-' + side;

	const h1 = document.createElement('h1');
	h1.textContent = side === 'left' ? 'Welcome Back!' : 'Hello, Friend!';

	const p = document.createElement('p');
	p.textContent = side === 'left' ? 'To keep connected with us please login with your personal info' : 'Enter your personal details and start journey with us';

	const button = document.createElement('button');
	button.className = 'ghost';
	button.id = side === 'left' ? 'signIn' : 'signUp';
	button.textContent = side === 'left' ? 'Sign In' : 'Sign Up';

	panel.appendChild(h1);
	panel.appendChild(p);
	panel.appendChild(button);

	return panel;
}

// Create the overlay container
function createOverlayContainer() {
	const overlayContainer = document.createElement('div');
	overlayContainer.className = 'overlay-container';

	const overlay = document.createElement('div');
	overlay.className = 'overlay';

	overlay.appendChild(createOverlayPanel('left'));
	overlay.appendChild(createOverlayPanel('right'));

	overlayContainer.appendChild(overlay);
	return overlayContainer;
}

// Build the entire page structure
function buildPage() {
	injectStyles();

	const container = document.createElement('div');
	container.className = 'container';
	container.id = 'container';

	container.appendChild(createFormContainer('sign-up'));
	container.appendChild(createFormContainer('sign-in'));
	container.appendChild(createOverlayContainer());

	document.body.appendChild(container);

	// Add event listeners for toggling panels
	const signUpButton = document.getElementById('signUp');
	const signInButton = document.getElementById('signIn');

	signUpButton.addEventListener('click', () => {
		container.classList.add('right-panel-active');
	});

	signInButton.addEventListener('click', () => {
		container.classList.remove('right-panel-active');
	});
}

// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', buildPage);
