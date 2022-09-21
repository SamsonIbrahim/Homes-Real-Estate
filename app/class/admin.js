class admin {
  constructor({ id, username, firstname, lastname, email, password }) {
    this.id || id;
    this.username = username;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
  }
}

module.exports = admin;
