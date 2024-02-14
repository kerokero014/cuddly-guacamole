function createUser(req) {
  const userData = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    age: req.body.age,
    email: req.body.email,
    phone: req.body.phone,
    jobTitle: req.body.jobTitle,
    experience: req.body.experience,
    education: req.body.education,
    password: req.body.password
  };
  return userData;
}

module.exports = createUser;
