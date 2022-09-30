class realtor {
  constructor({
    id,
    username,
    firstname,
    lastname,
    email,
    password,
    property,
  }) {
    this.id || id;
    this.username = username;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
    this.property = property;
  }
}

module.exports = realtor;
