var db = require('../db/db');

exports.dienvien = async () => {
    return new Promise( (OK, Loi) => {
            let sql = "SELECT * FROM dienvien";
            db.query(sql, (err, d) => {
                    OK(d);
            })
        }
    )
}
exports.dienvien2 = async () => {
    return new Promise( (OK, Loi) => {
            let sql = "SELECT * FROM dienvien2";
            db.query(sql, (err, d) => {
                    OK(d);
            })
        }
    )
}
exports.quocgia = async () => {
    return new Promise( (OK, Loi) => {
            let sql = "SELECT * FROM quocgia";
            db.query(sql, (err, d) => {
                    OK(d);
            })
        }
    )
}
exports.theloai = async () => {
    return new Promise( (OK, Loi) => {
            let sql = "SELECT * FROM theloai";
            db.query(sql, (err, d) => {
                    OK(d);
            })
        }
    )
}
exports.phimle = async () => {
    return new Promise( (OK, Loi) => {
            let sql = "SELECT * FROM phimle";
            db.query(sql, (err, d) => {
                    OK(d);
            })
        }
    )
}
exports.daodien = async () => {
    return new Promise( (OK, Loi) => {
            let sql = "SELECT * FROM daodien";
            db.query(sql, (err, d) => {
                    OK(d);
            })
        }
    )
}
exports.quoctich = async () => {
    return new Promise( (OK, Loi) => {
            let sql = "SELECT * FROM quoctich";
            db.query(sql, (err, d) => {
                    OK(d);
            })
        }
    )
}
exports.nghenghiep = async () => {
    return new Promise( (OK, Loi) => {
            let sql = "SELECT * FROM nghenghiep";
            db.query(sql, (err, d) => {
                    OK(d);
            })
        }
    )
}
