console.log('=== DEBUG START ===');

// Test 1: Check if render-data.js loaded
console.log('1. initializeApp exists?', typeof initializeApp);

// Test 2: Try to fetch JSON
console.log('2. Attempting to fetch JSON...');
fetch('./public/data/courses-data.json')
  .then(response => {
    console.log('3. Response received, status:', response.status);
    if (!response.ok) {
      throw new Error('Response not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log('4. JSON loaded successfully:', data);
  })
  .catch(error => {
    console.error('5. FETCH ERROR:', error.message);
  });

// Test 3: Check if DOM elements exist
console.log('6. Check DOM elements:');
console.log('   - nested-navigation-container-id:', document.getElementById('nested-navigation-container-id') ? 'EXISTS' : 'NOT FOUND');
console.log('   - course-card:', document.querySelector('.course-card') ? 'EXISTS' : 'NOT FOUND');
console.log('   - html-code:', document.getElementById('html-code') ? 'EXISTS' : 'NOT FOUND');

// Test 4: Try to call initializeApp manually
console.log('7. Calling initializeApp manually...');
setTimeout(() => {
  if (typeof initializeApp === 'function') {
    initializeApp();
  } else {
    console.error('initializeApp is not a function');
  }
}, 1000);

console.log('=== DEBUG END ===');