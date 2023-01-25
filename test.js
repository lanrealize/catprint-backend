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
                resolve('te')
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
        const result = thisIsAtest()
        setTimeout(() => {
            console.log(result)
        }, 5000);
        console.log(result)
    } catch (e) {
        console.log(e)
    }

}

test2()

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


