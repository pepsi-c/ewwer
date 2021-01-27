const discord = require('discord.js');
const canvas = require('canvas')
const { Canvas, Image, ImageData } = require('canvas')
const faceAPI = require('face-api.js')
const fetch = require('node-fetch')

module.exports = {
    name: "face",
    aliases: ["facialrecognition", "fr"],
    category: "Images",
    description: "Detect facial features from an image.",
    usage: "$face",
    run: async (bot, message, args) => {

        faceAPI.nets.ssdMobilenetv1.loadFromDisk('./commands/images/weights')
        faceAPI.nets.faceLandmark68Net.loadFromDisk('./commands/images/weights')
        faceAPI.nets.faceExpressionNet.loadFromDisk('./commands/images/weights')
        faceAPI.nets.ageGenderNet.loadFromDisk('./commands/images/weights')
        faceAPI.nets.tinyFaceDetector.loadFromDisk('./commands/images/weights')
        faceAPI.nets.faceRecognitionNet.loadFromDisk('./commands/images/weights')

        faceAPI.env.monkeyPatch({ Canvas, Image, ImageData });

        const userImage = message.attachments.first()
        if(!userImage) return message.channel.send('Please provide an image!')

        try {

            message.channel.send('Please Wait...')

            const image = await canvas.loadImage(userImage.url)

            const detectFace = await faceAPI.detectAllFaces(image, new faceAPI.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions().withAgeAndGender()

            const canvas1 = canvas.createCanvas(userImage.width, userImage.height);
            const background = await canvas.loadImage(userImage.url);
            canvas1.getContext('2d').drawImage(background, 0, 0, canvas1.width, canvas1.height);



            const minProbability = 0.05
            await faceAPI.draw.drawDetections(canvas1, detectFace);
            await faceAPI.draw.drawFaceExpressions(canvas1, detectFace, minProbability)
            await faceAPI.draw.drawFaceLandmarks(canvas1, detectFace)

            detectFace.forEach( async detection => {
                const box = detection.detection.box
                const drawBox = new faceAPI.draw.DrawBox(box, { label: Math.round(detection.age) + " Years Old | " + detection.gender })
                drawBox.draw(canvas1)

                const expressionsArray = detection.expressions.asSortedArray()
                const file = new discord.MessageAttachment(canvas1.toBuffer(), 'faceRec.png');
                const embed = new discord.MessageEmbed()
                .attachFiles([file])
                .setImage(`attachment://faceRec.png`)
                .setColor('BLACK')
                .setAuthor('Atlantis', bot.user.avatarURL())
                .setTitle('Facial Recognition')
                .addField('Apx. Age', Math.round(detection.age))
                .addField('Gender', detection.gender.charAt(0).toUpperCase() + detection.gender.slice(1) + ` (${detection.genderProbability.toFixed(2)})`)
                .addField('Expression', expressionsArray[0].expression.charAt(0).toUpperCase() + expressionsArray[0].expression.slice(1) + ` (${expressionsArray[0].probability.toString().slice(0, 4)})`)
                //await message.channel.send(attachment)

                message.channel.send(embed)

        })
            } catch (error) {
                message.channel.send('Error!')
                console.log(error)
            }
        

    }

};

