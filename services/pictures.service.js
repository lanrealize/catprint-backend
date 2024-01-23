const User = require("../models/users.model");

async function getImageFromAlbum(openID, albumID, picID, type) {
  try {
    const user = await User.findOne(
      { openID: openID, [`${type}.id`]: albumID },
      { [`${type}.$`]: 1 }
    );

    if (!user || !user[type] || user[type].length === 0) {
      throw new Error("用户或相册不存在");
    }

    const album = user[type][0];

    const image = album.images.find((img) => img.id === picID);

    if (!image) {
      throw new Error("图片不存在");
    }

    return image;
  } catch (error) {
    console.error("发生错误：", error);
    throw error;
  }
}

module.exports = {
  getImageFromAlbum: getImageFromAlbum,
};
