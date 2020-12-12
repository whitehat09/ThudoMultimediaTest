const cheerio = require("cheerio");
const axios = require("axios").default;
const News = require("../models/News");
const { mongooseToObject } = require("../../util/mongoose");

const { mutipleMongooseToObject } = require('../../util/mongoose');

const mongoose = require("../../util/mongoose");
class NewsController {
  // [Get]  / news
  index(req, res, next) {
    // const getDanTriData = async () => {
    //     const rawPage = await axios.get("https://dantri.com.vn/");
    //     const pageData = rawPage.data;
    //     // dùng jquery lấy từ dom về
    //     const $ = cheerio.load(pageData);
    //     const newTitles = $('.news-item__title');
    //     newTitles.each(function () {
    //       // find tìm thấy a lấy data từ title trong dom
    //       const title =$(this).find('a').attr('title');
    //       console.log(title);
    //       return title;
    //     });
    //           const newTitlesImg = $('.news-item__avatar');
    //     newTitlesImg.each(function () {
    //       // find tìm thấy a lấy data từ title trong dom
    //       const image =$(this).find('img').attr('src');
    //       console.log(image);
    //       return image;
    //     });
    //     const newContent = $('.news-item__content');
    //     newContent.each(function () {
    //       // find tìm thấy a lấy data từ title trong dom
    //       const content = $(this).find('a').text();
    //       console.log(content);
    //       return content;
    //     });
    //     return title , image , content;
    //   };
    //   getDanTriData();
    News.find({})
      .then((news) => {
        res.render('news/news',{
          news:mutipleMongooseToObject(news),
        });
      })
      .catch(next);
  }

  upData(req, res, next) {
    res.render("news/dantri");
  }
}
module.exports = new NewsController();
