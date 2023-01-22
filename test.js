// const { PicGo } = require('picgo')

// const picgo = new PicGo('./config.json')

// console.log(picgo.getConfig())

// console.log(picgo.configPath)



// async function main() {
//     const res = await picgo.upload(['./icon.png'])
//     console.log(res) 
// }

// main()


function thisIsAtest() {
    return new Promise( (resolve, reject) => {
        const a = 1
        if (a === 1) {
            setTimeout(() => {
                console.log('here')
                resolve('resolve')
            }, 2000)
            console.log('hi')
        } else {
            console.log('reject')
            reject('reject')
        }
    } )
}

async function test2() {

    try {
        const result = await thisIsAtest()
        console.log(typeof(result))
    } catch (e) {
        console.log(e)
    }

}

test2()

// thisIsAtest().then((res) => {
//     console.log(typeof(res))
//     console.log('pos1')
// }).catch((e) => console.log('pos2'))
