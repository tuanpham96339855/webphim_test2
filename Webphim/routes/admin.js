var express = require('express');
var router = express.Router();
var db = require('../db/db');
var dbadmin = require('../db/db_admin');
var store = require('store')

/* GET home page. */
router.get('/', function(req, res, next) {
  var tk = store.get('TaiKhoan')
  if(!tk)
  {
    res.redirect("/admin/login");
  }
  else
  {
    res.render('quanly/admin');
  }
});

router.get('/login', function(req, res, next) {
  res.render('quanly/login');
});
router.post('/login', function(req, res) {
  db.query(`SELECT * FROM user WHERE TaiKhoan='${req.body.TaiKhoan}' AND MatKhau='${req.body.MatKhau}'`,function(err,data){
    if(err) throw err;
    if(data.length && data[0].TaiKhoan)
    {
      store.set('TaiKhoan', data[0].TaiKhoan)
      res.redirect("/admin");
    }
    else
    {
      res.render('quanly/login')
    }
});
});

router.get('/logout', function(req, res, next) {
  store.clearAll()
  res.redirect('/admin/login')
});

/* PHIM */
router.get('/phim', function(req, res, next ) {
db.query(`SELECT * FROM phim 
  join dienvien on phim.DienVien = dienvien.ID_DienVien 
  join dienvien2 on phim.DienVien2 = dienvien2.ID_DienVien2
  join quocgia on phim.QuocGia = quocgia.ID_QuocGia 
  join theloai on phim.TheLoai = theloai.ID_TheLoai
  join daodien on phim.DaoDien = daodien.ID_DaoDien 
  order by phim.ID `,function(err,data){
  if(err) throw err;
  var tk = store.get('TaiKhoan')
  if(!tk)
  {
    res.redirect("/admin/login");
  }
  res.render('quanly/phim/ds', { data: data });
});
});
router.get('/phim/them', async function(req, res) {
  let dienvien = await dbadmin.dienvien();
  let dienvien2 = await dbadmin.dienvien2();
  let theloai = await dbadmin.theloai();
  let quocgia = await dbadmin.quocgia();
  let phimle = await dbadmin.phimle();
  let daodien = await dbadmin.daodien();
  var tk = store.get('TaiKhoan')
  if(!tk)
  {
    res.redirect("/admin/login");
  }
res.render('quanly/phim/them', {dienvien:dienvien, dienvien2:dienvien2, theloai:theloai, quocgia:quocgia, phimle:phimle, daodien:daodien});
});
router.post('/phim/them', function(req, res) {
db.query(`INSERT INTO phim (TenPhim,Anh,ThoiLuong,SoTap,PhimLe,QuocGia,NamSanXuat,NgayCongChieu,TheLoai,DaoDien,DienVien,DienVien2,Video,LuotXem,MoTa_p) 
VALUES('${req.body.TenPhim}','${req.body.Anh}','${req.body.ThoiLuong}','${req.body.SoTap}','${req.body.PhimLe}','${req.body.QuocGia}','${req.body.NamSanXuat}','${req.body.NgayCongChieu}','${req.body.TheLoai}','${req.body.DaoDien}','${req.body.DienVien}','${req.body.DienVien2}','${req.body.Video}','${req.body.LuotXem}','${req.body.MoTa_p}')`,function(err){
  if(err) throw err;
  res.redirect("/admin/phim");
})
});
router.get('/phim/xoa/:ID', function(req, res) {
  db.query(`DELETE FROM phim WHERE ID=${req.params.ID}`,function(err){
    if(err) throw err;
    var tk = store.get('TaiKhoan')
    if(!tk)
    {
      res.redirect("/admin/login");
    }
    res.redirect("/admin/phim");
  });
});
router.get('/phim/sua/:ID', async function(req, res) {
  let dienvien = await dbadmin.dienvien();
  let dienvien2 = await dbadmin.dienvien2();
  let theloai = await dbadmin.theloai();
  let quocgia = await dbadmin.quocgia();
  let phimle = await dbadmin.phimle();
  let daodien = await dbadmin.daodien();
  var tk = store.get('TaiKhoan')
  if(!tk)
  {
    res.redirect("/admin/login");
  }
  var data = db.query(`SELECT * FROM phim WHERE ID=${req.params.ID}`,function(err,result){
    if(err) throw err;
    data = {
      ID:result[0].ID,
      TenPhim:result[0].TenPhim,
      Anh:result[0].Anh,
      ThoiLuong:result[0].ThoiLuong,
      SoTap:result[0].SoTap,
      PhimLe:result[0].PhimLe,
      QuocGia:result[0].QuocGia,
      NamSanXuat:result[0].NamSanXuat,
      NgayCongChieu:result[0].NgayCongChieu,
      TheLoai:result[0].TheLoai,
      DaoDien:result[0].DaoDien,
      DienVien:result[0].DienVien,
      DienVien2:result[0].DienVien2,
      Video:result[0].Video,
      LuotXem:result[0].LuotXem,
      MoTa_p:result[0].MoTa_p
    }
    res.render('quanly/phim/sua',{data, dienvien:dienvien, dienvien2:dienvien2, theloai:theloai, quocgia:quocgia, phimle:phimle, daodien:daodien});
  })
});
router.post('/phim/sua/:ID', function(req, res) {
  db.query(`UPDATE phim SET TenPhim='${req.body.TenPhim}',Anh='${req.body.Anh}',ThoiLuong='${req.body.ThoiLuong}',SoTap='${req.body.SoTap}',PhimLe='${req.body.PhimLe}',QuocGia='${req.body.QuocGia}',NamSanXuat='${req.body.NamSanXuat}',NgayCongChieu='${req.body.NgayCongChieu}',TheLoai='${req.body.TheLoai}',DaoDien='${req.body.DaoDien}',DienVien='${req.body.DienVien}',DienVien2='${req.body.DienVien2}',Video='${req.body.Video}',LuotXem='${req.body.LuotXem}',MoTa_p='${req.body.MoTa_p}' WHERE ID=${req.params.ID}`,function(err){
    if(err) throw err;
    res.redirect("/admin/phim");
  });
});

/* DIENVIEN */
router.get('/dienvien', function(req, res, next ) {
  db.query(`SELECT * FROM dienvien 
    join quoctich on dienvien.QuocTich = quoctich.ID_QuocTich 
    join nghenghiep on dienvien.NgheNghiep = nghenghiep.ID_NgheNghiep 
    order by dienvien.ID_DienVien `,function(err,data){
    if(err) throw err;
    var tk = store.get('TaiKhoan')
    if(!tk)
    {
      res.redirect("/admin/login");
    }
    res.render('quanly/dienvien/ds', { data: data });
  });
});
router.get('/dienvien/them', async function(req, res) {
  let quoctich = await dbadmin.quoctich();
  let nghenghiep = await dbadmin.nghenghiep();
  var tk = store.get('TaiKhoan')
  if(!tk)
  {
    res.redirect("/admin/login");
  }
res.render('quanly/dienvien/them', {quoctich:quoctich, nghenghiep:nghenghiep});
});
router.post('/dienvien/them', function(req, res) {
db.query(`INSERT INTO dienvien (TenDienVien,Anh_DV,NgaySinh,NoiSinh,QuocTich,ChieuCao,CanNang,NgheNghiep,HoatDong,MoTa_dv) 
VALUES('${req.body.TenDienVien}','${req.body.Anh_DV}','${req.body.NgaySinh}','${req.body.NoiSinh}','${req.body.QuocTich}','${req.body.ChieuCao}','${req.body.CanNang}','${req.body.NgheNghiep}','${req.body.HoatDong}','${req.body.MoTa_dv}')`,function(err){
  if(err) throw err;
  res.redirect("/admin/dienvien");
})
});
router.get('/dienvien/xoa/:ID_DienVien', function(req, res) {
  db.query(`DELETE FROM dienvien WHERE ID_DienVien=${req.params.ID_DienVien}`,function(err){
    if(err) throw err;
    var tk = store.get('TaiKhoan')
    if(!tk)
    {
      res.redirect("/admin/login");
    }
    res.redirect("/admin/dienvien");
  });
});
router.get('/dienvien/sua/:ID_DienVien', async function(req, res) {
  let quoctich = await dbadmin.quoctich();
  let nghenghiep = await dbadmin.nghenghiep();
  var tk = store.get('TaiKhoan')
  if(!tk)
  {
    res.redirect("/admin/login");
  }
  var data = db.query(`SELECT * FROM dienvien WHERE ID_DienVien=${req.params.ID_DienVien}`,function(err,result){
    if(err) throw err;
    data = {
      ID_DienVien:result[0].ID_DienVien,
      TenDienVien:result[0].TenDienVien,
      Anh_DV:result[0].Anh_DV,
      NgaySinh:result[0].NgaySinh,
      NoiSinh:result[0].NoiSinh,
      QuocTich:result[0].QuocTich,
      ChieuCao:result[0].ChieuCao,
      CanNang:result[0].CanNang,
      NgheNghiep:result[0].NgheNghiep,
      HoatDong:result[0].HoatDong,
      MoTa_dv:result[0].MoTa_dv,
    }
    res.render('quanly/dienvien/sua',{data, quoctich:quoctich, nghenghiep:nghenghiep});
  })
});
router.post('/dienvien/sua/:ID_DienVien', function(req, res) {
  db.query(`UPDATE dienvien SET TenDienVien='${req.body.TenDienVien}',Anh_DV='${req.body.Anh_DV}',NgaySinh='${req.body.NgaySinh}',NoiSinh='${req.body.NoiSinh}',QuocTich='${req.body.QuocTich}',ChieuCao='${req.body.ChieuCao}',CanNang='${req.body.CanNang}',NgheNghiep='${req.body.NgheNghiep}',HoatDong='${req.body.HoatDong}',MoTa_dv='${req.body.MoTa_dv}' WHERE ID_DienVien=${req.params.ID_DienVien}`,function(err){
    if(err) throw err;
    res.redirect("/admin/dienvien");
  });
});

/* DIENVIEN2 */
router.get('/dienvien2', function(req, res, next ) {
  db.query(`SELECT * FROM dienvien2 
    join quoctich on dienvien2.QuocTich = quoctich.ID_QuocTich 
    join nghenghiep on dienvien2.NgheNghiep = nghenghiep.ID_NgheNghiep 
    order by dienvien2.ID_DienVien2 `,function(err,data){
    if(err) throw err;
    var tk = store.get('TaiKhoan')
    if(!tk)
    {
      res.redirect("/admin/login");
    }
    res.render('quanly/dienvien2/ds', { data: data });
  });
});
router.get('/dienvien2/them', async function(req, res) {
  let quoctich = await dbadmin.quoctich();
  let nghenghiep = await dbadmin.nghenghiep();
  var tk = store.get('TaiKhoan')
  if(!tk)
  {
    res.redirect("/admin/login");
  }
res.render('quanly/dienvien2/them', {quoctich:quoctich, nghenghiep:nghenghiep});
});
router.post('/dienvien2/them', function(req, res) {
db.query(`INSERT INTO dienvien2 (TenDienVien2,Anh_DV2,NgaySinh,NoiSinh,QuocTich,ChieuCao,CanNang,NgheNghiep,HoatDong,MoTa_dv2) 
VALUES('${req.body.TenDienVien2}','${req.body.Anh_DV2}','${req.body.NgaySinh}','${req.body.NoiSinh}','${req.body.QuocTich}','${req.body.ChieuCao}','${req.body.CanNang}','${req.body.NgheNghiep}','${req.body.HoatDong}','${req.body.MoTa_dv2}')`,function(err){
  if(err) throw err;
  res.redirect("/admin/dienvien2");
})
});
router.get('/dienvien2/xoa/:ID_DienVien2', function(req, res) {
  db.query(`DELETE FROM dienvien2 WHERE ID_DienVien2=${req.params.ID_DienVien2}`,function(err){
    if(err) throw err;
    var tk = store.get('TaiKhoan')
    if(!tk)
    {
      res.redirect("/admin/login");
    }
    res.redirect("/admin/dienvien2");
  });
});
router.get('/dienvien2/sua/:ID_DienVien2', async function(req, res) {
  let quoctich = await dbadmin.quoctich();
  let nghenghiep = await dbadmin.nghenghiep();
  var tk = store.get('TaiKhoan')
  if(!tk)
  {
    res.redirect("/admin/login");
  }
  var data = db.query(`SELECT * FROM dienvien2 WHERE ID_DienVien2=${req.params.ID_DienVien2}`,function(err,result){
    if(err) throw err;
    data = {
      ID_DienVien2:result[0].ID_DienVien2,
      TenDienVien2:result[0].TenDienVien2,
      Anh_DV2:result[0].Anh_DV2,
      NgaySinh:result[0].NgaySinh,
      NoiSinh:result[0].NoiSinh,
      QuocTich:result[0].QuocTich,
      ChieuCao:result[0].ChieuCao,
      CanNang:result[0].CanNang,
      NgheNghiep:result[0].NgheNghiep,
      HoatDong:result[0].HoatDong,
      MoTa_dv2:result[0].MoTa_dv2,
    }
    res.render('quanly/dienvien2/sua',{data, quoctich:quoctich, nghenghiep:nghenghiep});
  })
});
router.post('/dienvien2/sua/:ID_DienVien2', function(req, res) {
  db.query(`UPDATE dienvien2 SET TenDienVien2='${req.body.TenDienVien2}',Anh_DV2='${req.body.Anh_DV2}',NgaySinh='${req.body.NgaySinh}',NoiSinh='${req.body.NoiSinh}',QuocTich='${req.body.QuocTich}',ChieuCao='${req.body.ChieuCao}',CanNang='${req.body.CanNang}',NgheNghiep='${req.body.NgheNghiep}',HoatDong='${req.body.HoatDong}',MoTa_dv2='${req.body.MoTa_dv2}' WHERE ID_DienVien2=${req.params.ID_DienVien2}`,function(err){
    if(err) throw err;
    res.redirect("/admin/dienvien2");
  });
});

/* THELOAI */
router.get('/theloai', function(req, res, next ) {
db.query("SELECT * FROM theloai",function(err,data){
  if(err) throw err;
  var tk = store.get('TaiKhoan')
  if(!tk)
  {
    res.redirect("/admin/login");
  }
  res.render('quanly/theloai/ds', { data: data });
});
});
router.get('/theloai/them', function(req, res) {
  var tk = store.get('TaiKhoan')
  if(!tk)
  {
    res.redirect("/admin/login");
  }
res.render('quanly/theloai/them');
});
router.post('/theloai/them', function(req, res) {
db.query(`INSERT INTO theloai (TenTheLoai) VALUES('${req.body.TenTheLoai}')`,function(err){
  if(err) throw err;
  res.redirect("/admin/theloai");
})
});
router.get('/theloai/xoa/:ID_TheLoai', function(req, res) {
  db.query(`DELETE FROM theloai WHERE ID_TheLoai=${req.params.ID_TheLoai}`,function(err){
    if(err) throw err;
    var tk = store.get('TaiKhoan')
    if(!tk)
    {
      res.redirect("/admin/login");
    }
    res.redirect("/admin/theloai");
  });
});
router.get('/theloai/sua/:ID_TheLoai', function(req, res) {
  var tk = store.get('TaiKhoan')
  if(!tk)
  {
    res.redirect("/admin/login");
  }
  var data = db.query(`SELECT * FROM theloai WHERE ID_TheLoai=${req.params.ID_TheLoai}`,function(err,result){
    if(err) throw err;
    data = {
      ID_TheLoai:result[0].ID_TheLoai,
      TenTheLoai:result[0].TenTheLoai,
      
    }
    res.render('quanly/theloai/sua',{data});
  })
});
router.post('/theloai/sua/:ID_TheLoai', function(req, res) {
  db.query(`UPDATE theloai SET TenTheLoai='${req.body.TenTheLoai}' where ID_TheLoai=${req.params.ID_TheLoai}`,function(err){
    if(err) throw err;
    res.redirect("/admin/theloai");
  });
});

/* QUOCGIA */
router.get('/quocgia', function(req, res, next ) {
db.query("SELECT * FROM quocgia",function(err,data){
  if(err) throw err;
  var tk = store.get('TaiKhoan')
  if(!tk)
  {
    res.redirect("/admin/login");
  }
  res.render('quanly/quocgia/ds', { data: data });
});
});
router.get('/quocgia/them', function(req, res) {
  var tk = store.get('TaiKhoan')
  if(!tk)
  {
    res.redirect("/admin/login");
  }
res.render('quanly/quocgia/them');
});
router.post('/quocgia/them', function(req, res) {
db.query(`INSERT INTO quocgia (TenQuocGia) VALUES('${req.body.TenQuocGia}')`,function(err){
  if(err) throw err;
  res.redirect("/admin/quocgia");
})
});
router.get('/quocgia/xoa/:ID_QuocGia', function(req, res) {
  db.query(`DELETE FROM quocgia WHERE ID_QuocGia=${req.params.ID_QuocGia}`,function(err){
    if(err) throw err;
    var tk = store.get('TaiKhoan')
    if(!tk)
    {
      res.redirect("/admin/login");
    }
    res.redirect("/admin/quocgia");
  });
});
router.get('/quocgia/sua/:ID_QuocGia', function(req, res) {
  var tk = store.get('TaiKhoan')
  if(!tk)
  {
    res.redirect("/admin/login");
  }
  var data = db.query(`SELECT * FROM quocgia WHERE ID_QuocGia=${req.params.ID_QuocGia}`,function(err,result){
    if(err) throw err;
    data = {
      ID_QuocGia:result[0].ID_QuocGia,
      TenQuocGia:result[0].TenQuocGia,
      
    }
    res.render('quanly/quocgia/sua',{data});
  })
});
router.post('/quocgia/sua/:ID_QuocGia', function(req, res) {
  db.query(`UPDATE quocgia SET TenQuocGia='${req.body.TenQuocGia}' where ID_QuocGia=${req.params.ID_QuocGia}`,function(err){
    if(err) throw err;
    res.redirect("/admin/quocgia");
  });
});

/* PHIMLE */
router.get('/phimle', function(req, res, next ) {
db.query("SELECT * FROM phimle",function(err,data){
  if(err) throw err;
  var tk = store.get('TaiKhoan')
  if(!tk)
  {
    res.redirect("/admin/login");
  }
  res.render('quanly/phimle/ds', { data: data });
});
});
router.get('/phimle/them', function(req, res) {
  var tk = store.get('TaiKhoan')
  if(!tk)
  {
    res.redirect("/admin/login");
  }
res.render('quanly/phimle/them');
});
router.post('/phimle/them', function(req, res) {
db.query(`INSERT INTO phimle (TenPhimLe) VALUES('${req.body.TenPhimLe}')`,function(err){
  if(err) throw err;
  res.redirect("/admin/phimle");
})
});
router.get('/phimle/xoa/:ID_PhimLe', function(req, res) {
  db.query(`DELETE FROM phimle WHERE ID_PhimLe=${req.params.ID_PhimLe}`,function(err){
    if(err) throw err;
    var tk = store.get('TaiKhoan')
    if(!tk)
    {
      res.redirect("/admin/login");
    }
    res.redirect("/admin/phimle");
  });
});
router.get('/phimle/sua/:ID_PhimLe', function(req, res) {
  var tk = store.get('TaiKhoan')
  if(!tk)
  {
    res.redirect("/admin/login");
  }
  var data = db.query(`SELECT * FROM phimle WHERE ID_PhimLe=${req.params.ID_PhimLe}`,function(err,result){
    if(err) throw err;
    data = {
      ID_PhimLe:result[0].ID_PhimLe,
      TenPhimLe:result[0].TenPhimLe,
      
    }
    res.render('quanly/phimle/sua',{data});
  })
});
router.post('/phimle/sua/:ID_PhimLe', function(req, res) {
  db.query(`UPDATE phimle SET TenPhimLe='${req.body.TenPhimLe}' where ID_PhimLe=${req.params.ID_PhimLe}`,function(err){
    if(err) throw err;
    res.redirect("/admin/phimle");
  });
});

/* DAODIEN */
router.get('/daodien', function(req, res, next ) {
db.query("SELECT * FROM daodien",function(err,data){
  if(err) throw err;
  var tk = store.get('TaiKhoan')
  if(!tk)
  {
    res.redirect("/admin/login");
  }
  res.render('quanly/daodien/ds', { data: data });
});
});
router.get('/daodien/them', function(req, res) {
  var tk = store.get('TaiKhoan')
  if(!tk)
  {
    res.redirect("/admin/login");
  }
res.render('quanly/daodien/them');
});
router.post('/daodien/them', function(req, res) {
db.query(`INSERT INTO daodien (TenDaoDien) VALUES('${req.body.TenDaoDien}')`,function(err){
  if(err) throw err;
  res.redirect("/admin/daodien");
})
});
router.get('/daodien/xoa/:ID_DaoDien', function(req, res) {
  db.query(`DELETE FROM daodien WHERE ID_DaoDien=${req.params.ID_DaoDien}`,function(err){
    if(err) throw err;
    var tk = store.get('TaiKhoan')
    if(!tk)
    {
      res.redirect("/admin/login");
    }
    res.redirect("/admin/daodien");
  });
});
router.get('/daodien/sua/:ID_DaoDien', function(req, res) {
  var tk = store.get('TaiKhoan')
  if(!tk)
  {
    res.redirect("/admin/login");
  }
  var data = db.query(`SELECT * FROM daodien WHERE ID_DaoDien=${req.params.ID_DaoDien}`,function(err,result){
    if(err) throw err;
    data = {
      ID_DaoDien:result[0].ID_DaoDien,
      TenDaoDien:result[0].TenDaoDien,
      
    }
    res.render('quanly/daodien/sua',{data});
  })
});
router.post('/daodien/sua/:ID_DaoDien', function(req, res) {
  db.query(`UPDATE daodien SET TenDaoDien='${req.body.TenDaoDien}' where ID_DaoDien=${req.params.ID_DaoDien}`,function(err){
    if(err) throw err;
    res.redirect("/admin/daodien");
  });
});

/* QUOCTICH */
router.get('/quoctich', function(req, res, next ) {
db.query("SELECT * FROM quoctich",function(err,data){
  if(err) throw err;
  var tk = store.get('TaiKhoan')
  if(!tk)
  {
    res.redirect("/admin/login");
  }
  res.render('quanly/quoctich/ds', { data: data });
});
});
router.get('/quoctich/them', function(req, res) {
  var tk = store.get('TaiKhoan')
  if(!tk)
  {
    res.redirect("/admin/login");
  }
res.render('quanly/quoctich/them');
});
router.post('/quoctich/them', function(req, res) {
db.query(`INSERT INTO quoctich (TenQuocTich) VALUES('${req.body.TenQuocTich}')`,function(err){
  if(err) throw err;
  res.redirect("/admin/quoctich");
})
});
router.get('/quoctich/xoa/:ID_QuocTich', function(req, res) {
  db.query(`DELETE FROM quoctich WHERE ID_QuocTich=${req.params.ID_QuocTich}`,function(err){
    if(err) throw err;
    var tk = store.get('TaiKhoan')
    if(!tk)
    {
      res.redirect("/admin/login");
    }
    res.redirect("/admin/quoctich");
  });
});
router.get('/quoctich/sua/:ID_QuocTich', function(req, res) {
  var tk = store.get('TaiKhoan')
  if(!tk)
  {
    res.redirect("/admin/login");
  }
  var data = db.query(`SELECT * FROM quoctich WHERE ID_QuocTich=${req.params.ID_QuocTich}`,function(err,result){
    if(err) throw err;
    data = {
      ID_QuocTich:result[0].ID_QuocTich,
      TenQuocTich:result[0].TenQuocTich,
      
    }
    res.render('quanly/quoctich/sua',{data});
  })
});
router.post('/quoctich/sua/:ID_QuocTich', function(req, res) {
  db.query(`UPDATE quoctich SET TenQuocTich='${req.body.TenQuocTich}' where ID_QuocTich=${req.params.ID_QuocTich}`,function(err){
    if(err) throw err;
    res.redirect("/admin/quoctich");
  });
});

/* NGHENGHIEP */
router.get('/nghenghiep', function(req, res, next ) {
  var tk = store.get('TaiKhoan')
  if(!tk)
  {
    res.redirect("/admin/login");
  }
db.query("SELECT * FROM nghenghiep",function(err,data){
  if(err) throw err;
  res.render('quanly/nghenghiep/ds', { data: data });
});
});
router.get('/nghenghiep/them', function(req, res) {
  var tk = store.get('TaiKhoan')
  if(!tk)
  {
    res.redirect("/admin/login");
  }
res.render('quanly/nghenghiep/them');
});
router.post('/nghenghiep/them', function(req, res) {
db.query(`INSERT INTO nghenghiep (TenNgheNghiep) VALUES('${req.body.TenNgheNghiep}')`,function(err){
  if(err) throw err;
  res.redirect("/admin/nghenghiep");
})
});
router.get('/nghenghiep/xoa/:ID_NgheNghiep', function(req, res) {
  db.query(`DELETE FROM nghenghiep WHERE ID_NgheNghiep=${req.params.ID_NgheNghiep}`,function(err){
    if(err) throw err;
    var tk = store.get('TaiKhoan')
    if(!tk)
    {
      res.redirect("/admin/login");
    }
    res.redirect("/admin/nghenghiep");
  });
});
router.get('/nghenghiep/sua/:ID_NgheNghiep', function(req, res) {
  var tk = store.get('TaiKhoan')
  if(!tk)
  {
    res.redirect("/admin/login");
  }
  var data = db.query(`SELECT * FROM nghenghiep WHERE ID_NgheNghiep=${req.params.ID_NgheNghiep}`,function(err,result){
    if(err) throw err;
    data = {
      ID_NgheNghiep:result[0].ID_NgheNghiep,
      TenNgheNghiep:result[0].TenNgheNghiep,
      
    }
    res.render('quanly/nghenghiep/sua',{data});
  })
});
router.post('/nghenghiep/sua/:ID_NgheNghiep', function(req, res) {
  db.query(`UPDATE nghenghiep SET TenNgheNghiep='${req.body.TenNgheNghiep}' where ID_NgheNghiep=${req.params.ID_NgheNghiep}`,function(err){
    if(err) throw err;
    res.redirect("/admin/nghenghiep");
  });
});

module.exports = router;
