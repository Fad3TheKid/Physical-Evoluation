document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('signin-form');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = form.querySelector('#id').value.trim();
    const password = form.querySelector('#password').value;

    if (!id || !password) {
      alert('Please enter both ID and password.');
      return;
    }

    try {
      // Check if first login for CES1 to CES400
      if (id.startsWith('CES')) {
        const checkResponse = await fetch('http://localhost:5000/api/check-first-login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id }),
        });
        const checkResult = await checkResponse.json();
        if (checkResponse.ok && checkResult.isFirstLogin) {
          window.location.href = `/HTML/password_reset.html?id=${id}`;
          return;
        }
      }

      // Proceed with login
      const loginResponse = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, password }),
      });
      const loginResult = await loginResponse.json();
      if (loginResponse.ok) {
        alert(loginResult.message);
        // Redirect to dashboard or home page
        window.location.href = '/HTML/dashboard.html';
      } else {
        alert(loginResult.message || 'Login failed');
      }
    } catch (error) {
      alert('Server error. Please try again later.');
    }
  });
});
