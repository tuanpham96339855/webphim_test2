var express = require('express');
var router = express.Router();
var dbhome = require('../db/db_home');
/* GET home page. */
router.get('/', async function(req, res) {
  let timkiem = req.body.timkiem;
  let phim = await dbhome.phim();
  let phimxn = await dbhome.phimxn();
  let hsdv = await dbhome.hsdv();
  let slider = await dbhome.slider();
  let theloai_lo = await dbhome.theloai_lo();
  let quocgia_lo = await dbhome.quocgia_lo();
  let phimle_lo = await dbhome.phimle_lo();
  res.render('home/trangchu', {timkiem, phim:phim, phimxn:phimxn, hsdv:hsdv, slider:slider, 
                               theloai_lo:theloai_lo, quocgia_lo:quocgia_lo, phimle_lo:phimle_lo});
});
router.get('/theloai_phim/:ID_TheLoai', async function(req, res) {
  let ID_TheLoai = req.params.ID_TheLoai;
  let timkiem = req.body.timkiem;
  let theloai_p = await dbhome.theloai_p(ID_TheLoai);
  let tlp = await dbhome.tlp(ID_TheLoai);
  let theloai_lo = await dbhome.theloai_lo();
  let quocgia_lo = await dbhome.quocgia_lo();
  let phimle_lo = await dbhome.phimle_lo();
  let phimxn = await dbhome.phimxn();
  let hsdv = await dbhome.hsdv();
  res.render('home/theloai_phim', {timkiem, theloai_p:theloai_p, tlp:tlp, theloai_lo:theloai_lo, quocgia_lo:quocgia_lo, 
                                   phimle_lo:phimle_lo, phimxn:phimxn, hsdv:hsdv});
});
router.get('/quocgia_phim/:ID_QuocGia', async function(req, res) {
  let ID_QuocGia = req.params.ID_QuocGia;
  let timkiem = req.body.timkiem;
  let quocgia_p = await dbhome.quocgia_p(ID_QuocGia);
  let qgp = await dbhome.qgp(ID_QuocGia);
  let theloai_lo = await dbhome.theloai_lo();
  let quocgia_lo = await dbhome.quocgia_lo();
  let phimle_lo = await dbhome.phimle_lo();
  let phimxn = await dbhome.phimxn();
  let hsdv = await dbhome.hsdv();
  res.render('home/quocgia_phim', {timkiem, quocgia_p:quocgia_p, qgp:qgp, theloai_lo:theloai_lo, quocgia_lo:quocgia_lo, 
                                   phimle_lo:phimle_lo, phimxn:phimxn, hsdv:hsdv});
});
router.get('/phimle/:ID_PhimLe', async function(req, res) {
  let ID_PhimLe = req.params.ID_PhimLe;
  let timkiem = req.body.timkiem;
  let phimle_p = await dbhome.phimle_p(ID_PhimLe);
  let plp = await dbhome.plp(ID_PhimLe);
  let theloai_lo = await dbhome.theloai_lo();
  let quocgia_lo = await dbhome.quocgia_lo();
  let phimle_lo = await dbhome.phimle_lo();
  let phimxn = await dbhome.phimxn();
  let hsdv = await dbhome.hsdv();
  res.render('home/phimle', {timkiem, phimle_p:phimle_p, plp:plp, theloai_lo:theloai_lo, quocgia_lo:quocgia_lo, 
                             phimle_lo:phimle_lo, phimxn:phimxn, hsdv:hsdv});
});
router.post('/timkiem', async function(req, res) {
  let timkiem = req.body.timkiem;
  let tk = await dbhome.tk(timkiem);
  let theloai_lo = await dbhome.theloai_lo();
  let quocgia_lo = await dbhome.quocgia_lo();
  let phimle_lo = await dbhome.phimle_lo();
  let phimxn = await dbhome.phimxn();
  let hsdv = await dbhome.hsdv();
  res.render('home/timkiem', {timkiem, tk:tk, theloai_lo:theloai_lo, quocgia_lo:quocgia_lo, 
                              phimle_lo:phimle_lo, phimxn:phimxn, hsdv:hsdv});
});
router.get('/phimcuadv/:ID_DienVien', async function(req, res) {
  let ID_DienVien = req.params.ID_DienVien;
  let timkiem = req.body.timkiem;
  let pcdv = await dbhome.pcdv(ID_DienVien);
  let dvp = await dbhome.dvp(ID_DienVien);
  let theloai_lo = await dbhome.theloai_lo();
  let quocgia_lo = await dbhome.quocgia_lo();
  let phimle_lo = await dbhome.phimle_lo();
  let phimxn = await dbhome.phimxn();
  let hsdv = await dbhome.hsdv();
  res.render('home/phimcuadv', {timkiem, pcdv:pcdv, dvp:dvp, theloai_lo:theloai_lo, quocgia_lo:quocgia_lo, 
                                phimle_lo:phimle_lo, phimxn:phimxn, hsdv:hsdv});
});
router.get('/phimcuadv2/:ID_DienVien2', async function(req, res) {
  let ID_DienVien2 = req.params.ID_DienVien2;
  let timkiem = req.body.timkiem;
  let pcdv2 = await dbhome.pcdv2(ID_DienVien2);
  let dv2p = await dbhome.dv2p(ID_DienVien2);
  let theloai_lo = await dbhome.theloai_lo();
  let quocgia_lo = await dbhome.quocgia_lo();
  let phimle_lo = await dbhome.phimle_lo();
  let phimxn = await dbhome.phimxn();
  let hsdv = await dbhome.hsdv();
  res.render('home/phimcuadv2', {timkiem, pcdv2:pcdv2, dv2p:dv2p, theloai_lo:theloai_lo, quocgia_lo:quocgia_lo, 
                                 phimle_lo:phimle_lo, phimxn:phimxn, hsdv:hsdv});
});
router.get('/chitietphim/:ID', async function(req, res) {
  let ID = req.params.ID;
  let timkiem = req.body.timkiem;
  let luotxem = await dbhome.luotxem(ID);
  let ctphim = await dbhome.ctphim(ID);
  let TheLoai = ctphim[0].TheLoai;
  let slider2 = await dbhome.slider2(ID, TheLoai);
  let theloai_lo = await dbhome.theloai_lo();
  let quocgia_lo = await dbhome.quocgia_lo();
  let phimle_lo = await dbhome.phimle_lo();
  res.render('home/chitietphim', {timkiem, luotxem, ctphim:ctphim, slider2:slider2, theloai_lo:theloai_lo, quocgia_lo:quocgia_lo, phimle_lo:phimle_lo});
});
router.get('/chitietdv/:ID_DienVien', async function(req, res) {
  let ID_DienVien = req.params.ID_DienVien;
  let timkiem = req.body.timkiem;
  let ctdv = await dbhome.ctdv(ID_DienVien);
  let theloai_lo = await dbhome.theloai_lo();
  let quocgia_lo = await dbhome.quocgia_lo();
  let phimle_lo = await dbhome.phimle_lo();
  let bxh1 = await dbhome.bxh1();
  res.render('home/chitietdv', {timkiem, ctdv:ctdv, theloai_lo:theloai_lo, quocgia_lo:quocgia_lo, phimle_lo:phimle_lo, bxh1:bxh1});
});
router.get('/chitietdv2/:ID_DienVien2', async function(req, res) {
  let ID_DienVien2 = req.params.ID_DienVien2;
  let timkiem = req.body.timkiem;
  let ctdv2 = await dbhome.ctdv2(ID_DienVien2);
  let theloai_lo = await dbhome.theloai_lo();
  let quocgia_lo = await dbhome.quocgia_lo();
  let phimle_lo = await dbhome.phimle_lo();
  let bxh1 = await dbhome.bxh1();
  res.render('home/chitietdv2', {timkiem, ctdv2:ctdv2, theloai_lo:theloai_lo, quocgia_lo:quocgia_lo, phimle_lo:phimle_lo, bxh1:bxh1});
});
router.get('/bangxephang', async function(req, res) {
  let timkiem = req.body.timkiem;
  let bxh = await dbhome.bxh();
  let theloai_lo = await dbhome.theloai_lo();
  let quocgia_lo = await dbhome.quocgia_lo();
  let phimle_lo = await dbhome.phimle_lo();
  res.render('home/bangxephang', {timkiem, bxh:bxh, theloai_lo:theloai_lo, quocgia_lo:quocgia_lo, phimle_lo:phimle_lo});
});
router.get('/gioithieu', async function(req, res) {
  let timkiem = req.body.timkiem;
  let theloai_lo = await dbhome.theloai_lo();
  let quocgia_lo = await dbhome.quocgia_lo();
  let phimle_lo = await dbhome.phimle_lo();
  res.render('home/gioithieu', {timkiem, theloai_lo:theloai_lo, quocgia_lo:quocgia_lo, phimle_lo:phimle_lo});
});
module.exports = router;

