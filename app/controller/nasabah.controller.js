const Nasabah = require('../model/nasabah.js');
const jwt = require('jsonwebtoken');

exports.findAll = (req, res) => {
    jwt.verify(req.token, 'secret', (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        const body = req.body;

        var key = null;
        if (body) {
            for (var kei in body) {
            key = kei;
            break;
            }
        }
        Nasabah.getAll(key, req.body[`${key}`], (err, data) => {
            if (err)
            res.status(500).send({
                message:
                "Please insert id, noKTP or noHP"
            });
            else res.send(data);
        }); 
      }
    });
}

exports.delete = (req, res) => {
  jwt.verify(req.token, 'secret', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      const id = req.body.id;

      if (!id) {
          res.send({message: "need an Id!"});
      } else {
        Nasabah.remove(id, (err, data) => {
          if (err)
          res.status(500).send({
              message:
              err.message || "Error while deleting"
          });
          else res.send({message: "nasabah has been deleted"});
        }); 
      }
    }
  });
}

exports.update = (req, res) => {
  jwt.verify(req.token, 'secret', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      console.log(req.body);
      Nasabah.updateById(
        req.body.id,
        new Nasabah(req.body),
        (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found Nasabah with id ${req.body.id}.`
              });
             } else {
              res.status(500).send({
                 message: "Error updating Nasabah with id " + req.body.id
              });
            }
          } else res.send(data);
        }
      );
    }
  });
};

exports.create = async(req, res) => {
  jwt.verify(req.token, 'secret', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      if (Object.keys(req.body) < 1) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      } else {
        Nasabah.checker(req.body.noKTP, (err, data) => {
          if (err) {
              res.status(20).send({
                  message: err.message || "Something's Wrong!"
              });
          }
          console.log(data);
          if (data.length == 0) {
              const nasabah = new Nasabah({
                  id: req.body.id,
                  nama: req.body.nama,
                  alamat: req.body.alamat,
                  tempatLahir: req.body.tempatLahir,
                  tanggalLahir: req.body.tanggalLahir,
                  noKTP: req.body.noKTP,
                  noHP: req.body.noHP,
              });
              Nasabah.create(nasabah, (err, data) => {
                  if (err) {
                      res.status(500).send({
                          message: err.message || "Error occured while creating nasabah!"
                      });
                  }
                  else res.send(data);
              });
          } else {
              res.send({message: "noKTP already registered!"});
          }
      });
      }
    }
  });
}
