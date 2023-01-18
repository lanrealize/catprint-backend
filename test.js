const { PicGo } = require('picgo')

const picgo = new PicGo('./config.json')

console.log(picgo.getConfig())

console.log(picgo.configPath)



async function main() {
    const res = await picgo.upload(['./icon.png'])
    console.log(res) 
}

main()
