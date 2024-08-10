const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaVBhSkcwSHRnY0dFSTJSeDBMbjl6MFE3TjBscFZ1TFowK0l1YmkxOEIzUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicU9la3pjNUZzQXpGZFFHOXlRS1QwaHVJbGdOVGpYQnlUTlZNN3QwRFVBWT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJlTFJCb0NGUkJ0R2ZnZHF1bUViajgvczh1MUxsbmh6RVNNTlRyL3F2eldFPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJkU215NnlzUHl6UHdVYVlVN3VQSW1WZDJUTDFKRXJqSEZLK3Rpc2xoZFNvPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjBBbzdNanB4OU8rNUJYZGRzQzNZRkVsS2JJNncrY1RBRVNNVmdvVkJLSFU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlpSRnppVW9VNHhTcEVqTUVwVm1oRWxySEx0NW52YUdzMlpudnYxenRkeDQ9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidUZoQjFncGc0N0F2SzdNRURwKzVROE0xTnQrRXNFUm5tWWx5ajFVM1JrOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiM1VMckVJNGlsdDhEZUpxZzhjbXdiZm82bDd5WWg1S0tGNm02Q0FLSlJEWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjZGVUVnNFFTcTIxUVAxV29HRndZNDBuSW9Vc21sNjBYYTdNNjVoZEZJdlBUTUwybnRpY2xyRWdhb1ZzZmd2bVNvdzBWa0liZUNGL095UkVwQm1rK0RBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTc1LCJhZHZTZWNyZXRLZXkiOiJpZFNKOTBDUVkwNU5pTkt5V1oyMkdFTW91T0V4NzY4Z253eE1LczVoKzZRPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJVYkFncGR6QlNzS2R5NC1yOTV6U3NBIiwicGhvbmVJZCI6IjU2MGJiYTIwLTMxOGQtNDFkZS05NGM0LWQ2ZDA4NTM5NDkzZSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ4RXljOVk1azl5SGFTK1V1dG9QblFwWWVpWTA9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidkp3M3JsdHNiOW9QNXJPVCs5UUpsQ1UxV29rPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlNFQzkxODRQIiwibWUiOnsiaWQiOiIyNjM3ODcwNTgxMzk6NDVAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ1ByMThzY0JFSnVUM2JVR0dBNGdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6Ik1pdXRPcjVIcHdXZmxuSFRvdXJtSlVYMzF3WGhXTW0zM25sTHF3RlAwVkE9IiwiYWNjb3VudFNpZ25hdHVyZSI6Ik4vUWlDdWhtYytDbksrZys5cm9aWENQYkZBQ0loVHprTS9BWXBEMU1NSGpleGNTWDgxSnVUZEYwR0JPOEdUOUYyWmdabFczZUp4aG1peUgwVlJjbEFBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJ2bjM4RXBjZ1FiVG1wSEkxSTQxM25lK3dpL0RLZTRUM0hoUG9LNitYd1FLSkVpMWV4TlVIQ3lPTWVqK0RPdWd3WlhQV1RrejZpZ055ZXROdGNuZzFEdz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI2Mzc4NzA1ODEzOTo0NUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJUSXJyVHErUjZjRm41WngwNkxxNWlWRjk5Y0Y0VmpKdDk1NVM2c0JUOUZRIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIzMjg3OTc2LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQU9LSyJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Wilbert",
    NUMERO_OWNER : process.env.OWNER_NUM || "263787058139",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'All.my ex',
    URL : process.env.BOT_MENU_LINKS || 'https://whatsapp.com/channel/0029VadrCtF5Ui2T75SYLM1f',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    TZ : process.env.TIME_ZONE || 'Etc/GMT',
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    BOOM_MESSAGE_LIMIT : process.env.BOOM_MESSAGE_LIMIT || 100,
    PORT : process.env.PORT || 8000,
    LINK : process.env.LINK || '',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa" : "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
