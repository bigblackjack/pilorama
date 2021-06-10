var express = require('express');
var router = express.Router();
const handler = require('../core/vkHandler');

/* GET home page. */
router.get('/', async function(req, res, next) {

  let info = (await handler.getInfo())[0];
  let goods = await handler.getGoods();
  let news = await handler.getNews();

  let contacts = [];
  info.contacts.forEach((contact) => contacts.push(contact.user_id))
  let users = await handler.getUsers(contacts);

  info["views"] = 0;
  info["likes"] = 0;
  info["comments"] = 0;

  let attachments = [];
  for(let n of news.response.items) {

    info["views"] += n.views.count;
    info["likes"] += n.likes.count;
    info["comments"] += n.comments.count;

    if(!("attachments" in n)) continue;
    for(let attachment of n.attachments) {
      if(attachment.type !== "photo") continue;
      let src = attachment.photo.sizes[attachment.photo.sizes.length - 1].url
      attachments.push(src);
    }
  }

  res.render('index', {
    info: info,
    goods: goods.items,
    news: news.response.items,
    contacts: users,
    attachments: attachments,
  });
});

module.exports = router;
