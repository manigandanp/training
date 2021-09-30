const cheerio = require("cheerio");
const { crawl } = require("./crawl");

let url =
  "https://www.amazon.in/Samsung-Galaxy-Ocean-128GB-Storage/dp/B07HG8S7KP/";

crawl(url)
  .then((content) => {
    let result = {};

    let $ = cheerio.load(content);
    // console.log(content);
    console.log(`Parsing started for url ${url}`);

    //titel
    let title = $("#productTitle").text().trim();
    // additional Attributes
    result["title"] = title;
    let addAttrs = {};

    function iterator(i, el) {
      let columns = $("td", el);
      let key = $(columns[0]).text().trim();
      let value = $(columns[1]).text().trim();
      addAttrs[key] = value;
    }
    $('[data-feature-name="productOverview"] table tbody tr').map(iterator);
    result["addAttrs"] = addAttrs;
    // spectext

    let specTexts = $("#feature-bullets ul li")
      .map((i, el) => {
        let spectText = $(el).text().trim();
        return spectText;
      })
      .get();

    result["specTexts"] = specTexts;

    let imgUrl = $(".imgTagWrapper img").attr("src");
    result["imgUrl"] = imgUrl;

    let price = $("priceblock_ourprice").text();
    result["price"] = price;

    console.log(JSON.stringify(result, null, 2));
  })
  .catch((err) => console.log(err));
