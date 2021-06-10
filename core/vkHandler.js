const vkConnect = require('./vkConnect');

async function goods() {
    let vk = await vkConnect();
    return await vk.call('market.get', {
        owner_id: -process.env.GROUP_ID,
    });
}

async function news() {
    let vk = await vkConnect();
    return await vk.call('wall.get', {
        owner_id: -process.env.GROUP_ID,
    });
}

async function info() {
    let vk = await vkConnect();
    return await vk.call('groups.getById', {
        group_ids: process.env.GROUP_ID,
        fields: "description,contacts,cover"
    })
}

async function users(user_ids) {
    let vk = await vkConnect();
    let ids = user_ids.join(',');
    return await vk.call('users.get', {
        user_ids: ids,
        fields: "photo_400_orig"
    })
}

module.exports = {
    getGoods: goods,
    getNews: news,
    getInfo: info,
    getUsers: users,
}