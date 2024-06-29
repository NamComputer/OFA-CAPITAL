import { USER } from "./users";




export const POSTS = [
    
    {
        imageURL:'https://www.topcv.vn/images/cv/screenshots/thumbs/cv-template-thumbnails-v1.2/basic_5.png?v=1.0.3',
        user:USER[0].user,
        likes:2,
        caption:'Checkout my CV, please call me: 18001091',
        profile_picture:USER[0].image,
        comments:[
            {
                user:'Nam',
                comment:'Amazing! Good job'
            },
            {
                user:'Vinh',
                comment:'Amazing!'
            },
        ]
    },
    {
        imageURL:'https://dxwd4tssreb4w.cloudfront.net/vcv/confidential/c4c87802f4cadd024416c22a12314e88.png?_=1645622482',
        user:USER[1].user,
        likes:12,
        caption:'Checkout my CV, please contact me at abc@gmail.com',
        profile_picture:USER[1].image,
        comments:[
            {
                user:'An',
                comment:'CV tốt quá em ơi! Liên hệ ngay công ty của chị nhé'
            },
            {
                user:'Bảo',
                comment:'Liên hệ ngay với anh'
            },
        ]
    }
]