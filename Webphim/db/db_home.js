var db = require('../db/db');

exports.phim = async () => {
    return new Promise( (OK, Loi) => {
            let sql = "SELECT * FROM phim join theloai on phim.TheLoai = theloai.ID_TheLoai order by phim.ID";
            db.query(sql, (err, d) => {
                    OK(d);
            })
        }
    )
}
exports.phimxn = async () => {
    return new Promise( (OK, Loi) => {
            let sql = "SELECT * FROM phim ORDER BY LuotXem desc limit 10";
            db.query(sql, (err, d) => {
                    OK(d);
            })
        }
    )
}
exports.hsdv = async () => {
    return new Promise( (OK, Loi) => {
            let sql = "SELECT * FROM dienvien limit 2";
            db.query(sql, (err, d) => {
                    OK(d);
            })
        }
    )
}
exports.ctphim = async (ID) => {
    return new Promise( (OK, Loi) => {
            let sql = `SELECT * FROM phim 
            join dienvien on phim.DienVien = dienvien.ID_DienVien 
            join dienvien2 on phim.DienVien2 = dienvien2.ID_DienVien2
            join quocgia on phim.QuocGia = quocgia.ID_QuocGia 
            join theloai on phim.TheLoai = theloai.ID_TheLoai
            join daodien on phim.DaoDien = daodien.ID_DaoDien WHERE ID = ${ID}`;
            db.query(sql, (err, d) => {
                    OK(d);
            })
        }
    )
}
exports.luotxem = async (ID) => {
    return new Promise( (OK, Loi) => {
            let sql = `UPDATE phim SET LuotXem=LuotXem+1 WHERE ID = ${ID}`;
            db.query(sql, (err, d) => {
                    OK(d);
            })
        }
    )
}
exports.slider = async () => {
    return new Promise( (OK, Loi) => {
            let sql = `SELECT * FROM phim 
            join theloai on phim.TheLoai = theloai.ID_TheLoai ORDER BY NgayCongchieu desc limit 10`;
            db.query(sql, (err, d) => {
                    OK(d);
            })
        }
    )
}
exports.slider2 = async (ID, TheLoai) => {
    return new Promise( (OK, Loi) => {
            let sql = `SELECT * FROM phim 
            join theloai on phim.TheLoai = theloai.ID_TheLoai WHERE ID!=${ID} AND TheLoai=${TheLoai} ORDER BY LuotXem desc limit 10 `;
            db.query(sql, (err, d) => {
                    OK(d);
            })
        }
    )
}
exports.theloai_lo = async () => {
    return new Promise( (OK, Loi) => {
            let sql = "SELECT * FROM theloai";
            db.query(sql, (err, d) => {
                    OK(d);
            })
        }
    )
}
exports.quocgia_lo = async () => {
    return new Promise( (OK, Loi) => {
            let sql = "SELECT * FROM quocgia";
            db.query(sql, (err, d) => {
                    OK(d);
            })
        }
    )
}
exports.phimle_lo = async () => {
    return new Promise( (OK, Loi) => {
            let sql = "SELECT * FROM phimle";
            db.query(sql, (err, d) => {
                    OK(d);
            })
        }
    )
}
exports.bxh = async () => {
    return new Promise( (OK, Loi) => {
            let sql = `SELECT * FROM phim join theloai on phim.TheLoai = theloai.ID_TheLoai ORDER BY LuotXem desc limit 10`;
            db.query(sql, (err, d) => {
                    OK(d);
            })
        }
    )
}
exports.bxh1 = async () => {
    return new Promise( (OK, Loi) => {
            let sql = `SELECT * FROM phim join theloai on phim.TheLoai = theloai.ID_TheLoai ORDER BY LuotXem desc limit 5`;
            db.query(sql, (err, d) => {
                    OK(d);
            })
        }
    )
}
exports.theloai_p = async (ID_TheLoai) => {
    return new Promise( (OK, Loi) => {
            let sql = `SELECT * FROM phim join theloai on phim.TheLoai = theloai.ID_TheLoai WHERE TheLoai=${ID_TheLoai}`;
            db.query(sql, (err, d) => {
                    OK(d);
            })
        }
    )
}
exports.quocgia_p = async (ID_QuocGia) => {
    return new Promise( (OK, Loi) => {
            let sql = `SELECT * FROM phim join quocgia on phim.QuocGia = quocgia.ID_QuocGia WHERE QuocGia=${ID_QuocGia}`;
            db.query(sql, (err, d) => {
                    OK(d);
            })
        }
    )
}
exports.phimle_p = async (ID_PhimLe) => {
    return new Promise( (OK, Loi) => {
            let sql = `SELECT * FROM phim join phimle on phim.PhimLe = phimle.ID_PhimLe WHERE PhimLe=${ID_PhimLe}`;
            db.query(sql, (err, d) => {
                    OK(d);
            })
        }
    )
}
exports.tk = async (timkiem) => {
    return new Promise( (OK, Loi) => {
            let sql = `SELECT * FROM phim join theloai on phim.TheLoai = theloai.ID_TheLoai WHERE TenPhim like '%${timkiem}%'`;
            db.query(sql, (err, d) => {
                    OK(d);
            })
        }
    )
}
exports.pcdv = async (ID_DienVien) => {
    return new Promise( (OK, Loi) => {
            let sql = `SELECT * FROM phim 
            join theloai on phim.TheLoai = theloai.ID_TheLoai 
            join dienvien on phim.DienVien = dienvien.ID_DienVien WHERE DienVien=${ID_DienVien}`;
            db.query(sql, (err, d) => {
                    OK(d);
            })
        }
    )
}
exports.pcdv2 = async (ID_DienVien2) => {
    return new Promise( (OK, Loi) => {
            let sql = `SELECT * FROM phim 
            join theloai on phim.TheLoai = theloai.ID_TheLoai 
            join dienvien2 on phim.DienVien2 = dienvien2.ID_DienVien2 WHERE DienVien2=${ID_DienVien2}`;
            db.query(sql, (err, d) => {
                    OK(d);
            })
        }
    )
}
exports.ctdv = async (ID_DienVien) => {
    return new Promise( (OK, Loi) => {
            let sql = `SELECT * FROM dienvien 
            join quoctich on dienvien.QuocTich = quoctich.ID_QuocTich 
            join nghenghiep on dienvien.NgheNghiep = nghenghiep.ID_NgheNghiep WHERE ID_DienVien = ${ID_DienVien}`;
            db.query(sql, (err, d) => {
                    OK(d);
            })
        }
    )
}
exports.ctdv2 = async (ID_DienVien2) => {
    return new Promise( (OK, Loi) => {
            let sql = `SELECT * FROM dienvien2 
            join quoctich on dienvien2.QuocTich = quoctich.ID_QuocTich 
            join nghenghiep on dienvien2.NgheNghiep = nghenghiep.ID_NgheNghiep WHERE ID_DienVien2 = ${ID_DienVien2}`;
            db.query(sql, (err, d) => {
                    OK(d);
            })
        }
    )
}
exports.tlp = async (ID_TheLoai) => {
    return new Promise( (OK, Loi) => {
            let sql = `SELECT * FROM theloai WHERE ID_TheLoai = ${ID_TheLoai}`;
            db.query(sql, (err, d) => {
                    OK(d);
            })
        }
    )
}
exports.qgp = async (ID_QuocGia) => {
    return new Promise( (OK, Loi) => {
            let sql = `SELECT * FROM quocgia WHERE ID_QuocGia = ${ID_QuocGia}`;
            db.query(sql, (err, d) => {
                    OK(d);
            })
        }
    )
}
exports.plp = async (ID_PhimLe) => {
    return new Promise( (OK, Loi) => {
            let sql = `SELECT * FROM phimle WHERE ID_PhimLe = ${ID_PhimLe}`;
            db.query(sql, (err, d) => {
                    OK(d);
            })
        }
    )
}
exports.dvp = async (ID_DienVien) => {
    return new Promise( (OK, Loi) => {
            let sql = `SELECT * FROM dienvien WHERE ID_DienVien = ${ID_DienVien}`;
            db.query(sql, (err, d) => {
                    OK(d);
            })
        }
    )
}
exports.dv2p = async (ID_DienVien2) => {
    return new Promise( (OK, Loi) => {
            let sql = `SELECT * FROM dienvien2 WHERE ID_DienVien2 = ${ID_DienVien2}`;
            db.query(sql, (err, d) => {
                    OK(d);
            })
        }
    )
}