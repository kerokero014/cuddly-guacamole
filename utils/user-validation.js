
function validateUserData(userData) {
  if (!userData.firstName || !userData.lastName || !userData.email || !userData.password) {
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(userData.email)) {
    return false;
  }

  if (!Number.isInteger(userData.age) || userData.age <= 0) {
    return false;
  }

  if (userData.phone && !/^\d{10}$/.test(userData.phone)) {
    return false;
  }

  if (userData.jobTitle && userData.jobTitle.trim() === '') {
    return false;
  }

  return true;
}

module.exports = { validateUserData };
