function saveLessonProgress(lessonId) {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  if (!user) {
    console.log("Chưa đăng nhập!");
    return;
  }
  
  if (!user.completedLessons) user.completedLessons = [];
  if (!user.contributions) user.contributions = Array(365).fill(0);

  if (!user.completedLessons.includes(lessonId)) {
    user.completedLessons.push(lessonId);

    const today = new Date().getDay(); 
    user.contributions[today] = (user.contributions[today] || 0) + 1;
    localStorage.setItem('currentUser', JSON.stringify(user));
    updateUserInDatabase(user);

    console.log(`Đã lưu: ${lessonId}`);
  }
}

function updateUserInDatabase(updatedUser) {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const index = users.findIndex(u => u.username === updatedUser.username);
  if (index !== -1) {
    users[index] = updatedUser;
    localStorage.setItem('users', JSON.stringify(users));
  }
}