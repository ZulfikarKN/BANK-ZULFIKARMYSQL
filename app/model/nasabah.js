const sql = require("./db.js");
// constructor
const Nasabah = function(Nasabah) {
  this.id = Nasabah.id;
  this.nama = Nasabah.nama;
  this.alamat = Nasabah.alamat;
  this.tempatLahir = Nasabah.tempatLahir;
  this.tanggalLahir = Nasabah.tanggalLahir;
  this.noKTP = Nasabah.noKTP;
  this.noHP = Nasabah.noHP;
};

Nasabah.getAll = (key, body, result) => {
    let query = "SELECT * FROM `nasabah`";
    if (key && body) {
      query += ` WHERE ${key} = ${body}`;
    } else {
        query += 'ORDER BY id';
    }
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("Nasabah: ", res);
      result(null, res);
    });
  };

Nasabah.create = (newNasabah, result) => {
  sql.query("INSERT INTO `nasabah` SET ?", newNasabah, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created Nasabah: ", { id: res.insertId, ...newNasabah });
    result(null, { id: res.insertId, ...newNasabah });
  });
};

Nasabah.remove = (id, result) => {
  sql.query("DELETE FROM `nasabah` WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      // not found Nasabah with the id
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted Nasabah with id: ", id);
    result(null, res);
  });
};

Nasabah.updateById = (id, Nasabah, result) => {
  sql.query(
    "UPDATE `nasabah` SET nama = ?, alamat = ?, tempatLahir = ?, tanggalLahir = ?, noKTP = ?, noHP = ? WHERE id = ?",
    [Nasabah.nama, Nasabah.alamat, Nasabah.tempatLahir, Nasabah.tanggalLahir, Nasabah.noKTP, Nasabah.noHP, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        result({kind: "not_found"}, null);
        return;
      }
      console.log("updated Nasabah: ", { id: id, ...Nasabah });
      result(null, { id: id, ...Nasabah });
    }
  );
};

// Nasabah.findById = (id, result) => {
//   sql.query(`SELECT * FROM Nasabah WHERE id = ${id}`, (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(err, null);
//       return;
//     }
//     if (res.length) {
//       console.log("found Nasabah: ", res[0]);
//       result(null, res[0]);
//       return;
//     }
//     // not found Nasabah with the id
//     result({ kind: "not_found" }, null);
//   });
// };
// Nasabah.getAllPublished = result => {
//   sql.query("SELECT * FROM Nasabah WHERE published=true", (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }
//     console.log("Nasabah: ", res);
//     result(null, res);
//   });
// };
// Nasabah.removeAll = result => {
//   sql.query("DELETE FROM Nasabah", (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }
//     console.log(`deleted ${res.affectedRows} Nasabah`);
//     result(null, res);
//   });
// };

Nasabah.checker = (value, result) => {
    sql.query("SELECT * FROM `nasabah`" + `WHERE noKTP = ${value}`, (err, res)=> {
        if (err) {
            console.log("checker error: ", err);
            result(null, err);
        }
        console.log('checked!');
        result(null, res);
    });
}

module.exports = Nasabah;
