const fs=require('fs');


function removeFile(filePath){
    return new Promise((resolve, reject)=>{
        fs.unlink(filePath, (err) => {
            if(err){
                reject(err)
            }
            resolve(filePath)
        });
    })
}


module.exports = {
    removeFile: removeFile
}