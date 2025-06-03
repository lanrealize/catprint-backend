// const { PicGo } = require('picgo')

// const utils = require('./utils/utils')

// const picgo = new PicGo('./config.json')

// console.log(picgo.getConfig())

// console.log(picgo.configPath)



// async function main() {
//     const res = await picgo.upload(['./icon.png'])
//     console.log(res) 
// }

// main()


// function thisIsAtest() {
//     return new Promise( (resolve, reject) => {
//         const a = 1
//         if (a === 1) {
//             setTimeout(() => {
//                 console.log('here')
//                 resolve('te')
//             }, 2000)
//             console.log('hi')
//         } else {
//             console.log('reject')
//             reject('reject')
//         }
//     } )
// }

// async function test2() {

//     try {
//         const result = thisIsAtest()
//         setTimeout(() => {
//             console.log(result)
//         }, 5000);
//         console.log(result)
//     } catch (e) {
//         console.log(e)
//     }

// }

// test2()

// thisIsAtest().then((res) => {
//     console.log(typeof(res))
//     console.log('pos1')
// }).catch((e) => console.log('pos2'))


// const p = new Promise( (resolve, reject) => {
//     const a = 1
//     if (a === 1) {
//         setTimeout(() => {
//             console.log('here')
//             resolve('te')
//         }, 2000)
//         console.log('hi')
//     } else {
//         console.log('reject')
//         reject('reject')
//     }
// } )

// async function main() {
//     const te = await p

//     console.log(typeof(te))

//     console.log(p)
// }

// main()


// const cutils = require('./utils/utils')

// async function test() {
//     try {
//         const fileName = await cutils.removeFile('C:/Users/zgx/Desktop/github/catprint-backend/images/sdf.txt')
//         console.log(fileName)
//     } catch (e) {
//         console.log(e)
//     }   
// }

// test()


// const sd = require('silly-datetime')

// const time = sd.format(new Date(), 'YY-MM-DD HH:mm:ss')

// console.log(time)




// fs.unlink('C:/Users/zgx/Desktop/github/catprint-backend/images/d.txt', (err) => {
//     if (err) throw err;
//     console.log('文件已删除');
//   });

// function parseDate(dateString) {
//     const [year, month, day, hours, minutes] = dateString.split('/').map(Number);
//     return new Date(year, month - 1, day, hours, minutes);
//   }
  
//   const dateString = "2023/01/31/3/32";
//   const parsedDate = parseDate(dateString);
  
//   console.log(parsedDate);

require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const wxToken = require("./utils/wxToken");
const schedule = require('node-schedule');
const User = require("./models/users.model");

mongoose.set('strictQuery', false)
mongoose.connect(process.env.DATA_BASE_URL, {
    authSource: "admin",
    user: process.env.DATA_BASE_USERNAME,
    pass: process.env.DATA_BASE_PASSWORD,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const db = mongoose.connection 
db.on('error', (error) => {console.log(error)})
db.once('open', () => {
    console.log('Connected to database');
    migrateImages()
})

async function migrateImages() {
  const users = await User.find({});
  console.log(users);

  for (const user of users) {
    let updated = false;

    // 更新 createdAlbums
    user.createdAlbums.forEach(album => {
      if (album.images) {
        album.images.forEach(image => {
          if (image.imageUrl?.startsWith('http://')) {
            image.imageUrl = image.imageUrl.replace('http://', 'https://');
            updated = true;
          }
        });
      }
    });

    // 更新 sharedAlbums
    user.sharedAlbums.forEach(album => {
      if (album.images) {
        album.images.forEach(image => {
          if (image.imageUrl?.startsWith('http://')) {
            image.imageUrl = image.imageUrl.replace('http://', 'https://');
            updated = true;
          }
        });
      }
    });

    // 4. 保存更新
    if (updated) {
      await user.save();
      console.log(`Updated user: ${user.openID}`);
    }
  }

  console.log('Migration completed!');
  process.exit(0);
}
