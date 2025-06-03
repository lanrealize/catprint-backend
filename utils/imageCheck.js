// utils/imageCompress.js
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const wxToken = require("./wxToken");
const request = require("request");
const fsUtils = require("../utils/utils");

/**
 * 压缩图片以满足微信安全接口要求
 * @param {string} filePath - 原始图片路径
 * @param {object} [options] - 压缩选项
 * @param {number} [options.maxWidth=750] - 最大宽度
 * @param {number} [options.maxHeight=1334] - 最大高度
 * @param {number} [options.quality=80] - 压缩质量(1-100)
 * @param {number} [options.maxSize=1024000] - 最大文件大小(1MB)
 * @returns {Promise<string>} - 压缩后的图片路径
 */
async function compressImage(filePath, options = {}) {
  const {
    maxWidth = 750,
    maxHeight = 1334,
    quality = 80,
    maxSize = 1024 * 1024 // 1MB
  } = options;

  try {
    // 创建输出路径
    const ext = path.extname(filePath);
    const outputPath = path.join(
      path.dirname(filePath),
      `compressed_${Date.now()}${ext}`
    );

    // 分阶段压缩（尺寸+质量）
    let compressed = sharp(filePath)
      .resize({
        width: maxWidth,
        height: maxHeight,
        fit: 'inside',
        withoutEnlargement: true
      })
      .jpeg({ quality });

    // 写入文件
    await compressed.toFile(outputPath);

    // 检查文件大小
    const stats = fs.statSync(outputPath);
    if (stats.size > maxSize) {
      // 二次压缩质量
      const reduceQuality = Math.max(10, quality - 30);
      await sharp(outputPath)
        .jpeg({ quality: reduceQuality })
        .toFile(outputPath);
    }

    return outputPath;
  } catch (error) {
    console.error('图片压缩失败:', error);
    throw new Error('IMAGE_COMPRESS_FAILED');
  }
}

async function contentCheck(filePath) {
  // 1. compress image
  compressedFilePath = await compressImage(filePath, {
    maxWidth: 750,
    maxHeight: 1334,
    quality: 70
  });

  const access_token = await wxToken.getValidToken();
  if (!access_token) {
    throw new Error('Get wxapi access_token failed.');
  }

  const formData = {
    media: fs.createReadStream(compressedFilePath)
  };
  const checkUrl = `https://api.weixin.qq.com/wxa/img_sec_check?access_token=${access_token}`;

  return new Promise((resolve, reject) => {
    request.post(
      {url: checkUrl,
      formData: formData}, 
      (err, response, body) => {
      fsUtils.removeFile(compressedFilePath);
      if (err) reject(err);
      else resolve(JSON.parse(body));
    });
  });
}

module.exports = { contentCheck };