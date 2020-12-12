const axios = require("axios");
const cheerio = require("cheerio");

const News = require("./src/app/models/News");

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/crawler', {useNewUrlParser: true});
const item = {};

const titles = [];
const images = [];
const contents = [];

const getDanTriData = async () => {
  const rawPage = await axios.get("https://dantri.com.vn/");
  const pageData = rawPage.data;
  // dùng jquery lấy từ dom về
  const $ = cheerio.load(pageData);
  const newTitles = $(".news-item__title");
  newTitles.each(function () {
    // find tìm thấy a lấy data từ title trong dom
    const title = $(this).find("a").attr("title");

    titles.push(title);
  });
  const newTitlesImg = $(".news-item__avatar");
  newTitlesImg.each(function () {
    // find tìm thấy a lấy data từ title trong dom
    const image = $(this).find("img").attr("src");

    images.push(image);
  });
  const newContent = $(".news-item__content");
  newContent.each(function () {
    // find tìm thấy a lấy data từ title trong dom
    const content = $(this).find("a").text();
    contents.push(content);
  });

  const temp = titles.map((item, index) => {
    const news = {
      titles: item,
      image: images[index],
      content: contents[index],
    };
    return news;
  });

  console.log(temp);

  //News.create(item);
  for (let i = 0; i <= temp.length; i++) {
    News.create(temp[i]);
  }
};

getDanTriData();
