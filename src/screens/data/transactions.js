import { USER } from "./users";

export const TRANSACTIONS = [
    {
    overallDate:"March 23, 2022",
    detailTransactions : [
    {
        imageURL:'https://cdn.unenvironment.org/2022-03/field-ge4d2466da_1920.jpg',
        user:USER[0].user,
        profile_picture:USER[0].image,
        dateStamp:"March 23",
        timeStamp:"06:20 AM",
        value: '$12'
    },
    {
        imageURL:'https://cdn-prod.medicalnewstoday.com/content/images/articles/325/325466/man-walking-dog.jpg',
        user:USER[1].user,
        profile_picture:USER[1].image,
        dateStamp:"March 24",
        timeStamp:"09:10 PM",
        value: '-$108'
    }]
},
{
    overallDate:"March 24, 2022",
    detailTransactions : [
    {
        imageURL:'https://cdn.unenvironment.org/2022-03/field-ge4d2466da_1920.jpg',
        user:USER[0].user,
        profile_picture:USER[0].image,
        dateStamp:"March 25",
        timeStamp:"06:20 AM",
        value: '$12'
    },
    {
        imageURL:'https://cdn-prod.medicalnewstoday.com/content/images/articles/325/325466/man-walking-dog.jpg',
        user:USER[1].user,
        profile_picture:USER[1].image,
        dateStamp:"March 26",
        timeStamp:"09:10 PM",
        value: '-$108'
    }]
}
]