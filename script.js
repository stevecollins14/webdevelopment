document.addEventListener("DOMContentLoaded", () => {
    const MIN_PASSWORD_LENGTH = 8;

    // DOM Elements
    const regForm = document.getElementById('regForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const genderSelect = document.getElementById('gender');
    const dobInput = document.getElementById('dob');
    const countryInput = document.getElementById('country');
    const phoneInput = document.getElementById('phone');
    const bioInput = document.getElementById('bio');

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const confirmError = document.getElementById('confirmError');
    const genderError = document.getElementById('genderError');
    const dobError = document.getElementById('dobError');
    const countryError = document.getElementById('countryError');
    const phoneError = document.getElementById('phoneError');
    const bioError = document.getElementById('bioError');

    const successMsg = document.getElementById('successMsg');
    const countSpan = document.getElementById('count');
    const memberList = document.getElementById('memberList');
    const emptyNote = document.getElementById('emptyNote');
    const themeBtn = document.getElementById('theme');

    console.log("Script loaded successfully!");

    // Dark Mode Toggle
    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        themeBtn.textContent = document.body.classList.contains('dark') ? 'Light Mode' : 'Dark Mode';
    });

    //Email Validation
    function validateEmail(email) {
        return email.includes('@') && email.includes('.') && !email.includes(' ');
    }

    // Update Counter based on list items present
    function updateCount() {
        const items = memberList.querySelectorAll('.member-item');
        countSpan.textContent = items.length;
    }

    // Form Submission & Validation
    regForm.addEventListener('submit', (event) => {
        event.preventDefault();
        clearErrors();

        let isValid = true;

        if (nameInput.value.trim() === '') {
            showError(nameInput, nameError, 'Full name is required.');
            isValid = false;
        }

        if (emailInput.value.trim() === '') {
            showError(emailInput, emailError, 'Email is required.');
            isValid = false;
        } else if (validateEmail(emailInput.value.trim()) === false) {
            showError(emailInput, emailError, 'Please enter a valid email address.');
            isValid = false;
        }

        if (passwordInput.value.length < MIN_PASSWORD_LENGTH) {
            showError(passwordInput, passwordError, `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`);
            isValid = false;
        }

        if (confirmPasswordInput.value !== passwordInput.value) {
            showError(confirmPasswordInput, confirmError, 'Passwords do not match.');
            isValid = false;
        }

        if (genderSelect.value === '') {
            showError(genderSelect, genderError, 'Please select a gender.');
            isValid = false;
        }

        if (dobInput.value === '') {
            showError(dobInput, dobError, 'Date of birth is required.');
            isValid = false;
        }

        if (countryInput.value.trim() === '') {
            showError(countryInput, countryError, 'Country is required.');
            isValid = false;
        }

        if (phoneInput.value.trim() === '') {
            showError(phoneInput, phoneError, 'Phone number is required.');
            isValid = false;
        }

        if (bioInput.value.trim() === '') {
            showError(bioInput, bioError, 'Bio is required.');
            isValid = false;
        }

        // If valid, add to DOM
        if (isValid) {
            if (emptyNote) emptyNote.remove();

            const li = document.createElement('li');
            li.className = 'member-item';
            li.innerHTML = `
                <div class="info">
                    <strong>${nameInput.value.trim()} (${countryInput.value.trim()})</strong>
                    <span>${emailInput.value.trim()} · Gender: ${genderSelect.value}</span>
                </div>
                <button class="remove" type="button">Remove</button>
            `;

            // Remove button functionality
            li.querySelector('.remove').addEventListener('click', () => {
                li.remove();
                updateCount();
                if (memberList.querySelectorAll('.member-item').length === 0) {
                    memberList.innerHTML = `<li class="empty" id="emptyNote">No members yet. Register someone to begin.</li>`;
                }
            });

            memberList.appendChild(li);
            updateCount();

            // Show Success Message
            successMsg.textContent = 'Registration successful! Welcome.';
            successMsg.classList.remove('hidden');
            regForm.reset();

            setTimeout(() => successMsg.classList.add('hidden'), 4000);
        }
    });

    function showError(input, errorElement, message) {
        errorElement.textContent = message;
        input.classList.add('invalid');
    }

    function clearErrors() {
        const fields = [
            { input: nameInput, err: nameError },
            { input: emailInput, err: emailError },
            { input: passwordInput, err: passwordError },
            { input: confirmPasswordInput, err: confirmError },
            { input: genderSelect, err: genderError },
            { input: dobInput, err: dobError },
            { input: countryInput, err: countryError },
            { input: phoneInput, err: phoneError },
            { input: bioInput, err: bioError }
        ];

        fields.forEach(({ input, err }) => {
            err.textContent = '';
            input.classList.remove('invalid');
        });
        successMsg.classList.add('hidden');
    }

    // Dynamic clearing as user types
    const allInputs = [nameInput, emailInput, passwordInput, confirmPasswordInput, genderSelect, dobInput, countryInput, phoneInput, bioInput];
    allInputs.forEach(input => {
        input.addEventListener('input', () => {
            input.classList.remove('invalid');
            const err = input.parentElement.querySelector('.error');
            if (err) err.textContent = '';
        });
    });
});