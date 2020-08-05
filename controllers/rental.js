const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const connection = require("../db/mysql_connection.js");

// @desc   모든 책 불러오는 api
// @url     GET /api/v1/rental
// @request offset, limit (?offset=0&limit=25)
// @response success: [ {id, title, author, limit_age}, cnt]
exports.getAllrental = async (req, res, next) => {
  let offset = req.query.offset;
  let limit = req.query.limit;

  if (!offset || !limit) {
    res.status(400).json({ message: "파라미터 셋팅 에러" });
    return;
  }

  let query = `select * from book limit ${offset}, ${limit}`;

  try {
    [rows] = await connection.query(query);
    let count = rows.length;

    res.status(200).json({ success: true, rows: rows, count: count });
  } catch (e) {
    res.status(500).json({ success: false, error: "가져올수 없음" });
  }
};

// @desc    책 한권을 선택하여 대여하는 api
// @url     GET /api/v1/rental/search
// @request offset, limit (?offset=0&limit=25)
// @response success, error, items : [{ id, title, limit_age }, cnt]
exports.getrental = async (req, res, next) => {
  let user_id = req.user.user_id;
  let age;
  let offset = req.query.offset;
  let limit = req.query.limit;

  if (!offset || !limit) {
    res.status(400).json({ message: "파라미터 셋팅 에러" });
    return;
  }

  if (!keyword) {
    keyword = "";
  }

  let query = `select * from movie where title like '%${keyword}%' limit ${offset}, ${limit};`;
  console.log(query);

  try {
    [rows] = await connection.query(query);
    res.status(200).json({ success: true, items: rows, cnt: rows.length });
  } catch (e) {
    res.status(500).json({ success: false, error: e });
  }
};
