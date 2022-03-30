const sql = require('./db.js');

const User = function(User) {
    this.email = User.email,
    this.password = User.password
}

User.logIn = (email, password, result) => {
    if (email && password) {
        let query = "SELECT * FROM `users`" + 
        ` Where email = "${email}" AND password = "${password}"`;
        sql.query(query, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            console.log("User: ", res);
            result(null, res);
        });
    } else result("need password and email!", null);
}

module.exports = User;