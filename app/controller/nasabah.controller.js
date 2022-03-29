const Nasabah = require('../model/nasabah.js');

exports.findAll = (req, res) => {
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

exports.delete = (req, res) => {
    const id = req.body.id;

    if (!id) {
        res.send({message: "need an Id!"});
    }
    Nasabah.remove(id, (err, data) => {
        if (err)
        res.status(500).send({
            message:
            err.message || "Error while deleting"
        });
        else res.send({message: "nasabah has been deleted"});
    });
}

exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    console.log(req.body);
    Nasabah.updateById(
      req.body.id,
      new Nasabah(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Tutorial with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Tutorial with id " + req.params.id
            });
          }
        } else res.send(data);
      }
    );
  };

exports.create = (req, res) => {
    // var check = null;

    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
    }
    // Nasabah.checker(req.body.noKTP, (err, data) => {
    //     if (err)
    //     res.status(20).send({
    //         message: err.message || "Something's Wrong!"
    //     });
    //     else {
    //         check = data;
    //         console.log(check);
    //     }
    // });
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
                message: err.message || "Error occured while creating nasabah"
            });
        }
    })
    // if (nasabah & !check) {
    //     Nasabah.create(nasabah, (err, data) => {
    //         if (err) {
    //             res.status(500).send({
    //                 message: err.message || "Error occured while creating nasabah!"
    //             });
    //         }
    //         else res.send(data);
    //     })
    // }
}