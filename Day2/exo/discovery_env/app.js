//If .env is not placed at the root of the project
//require('dotenv').config({ path: '/custom/path/to/.env' })

require('dotenv').config()
if(process.env.APP_EN === 'production'){
    console.log("Je suis en production");
}else{
    console.log("Je suis en développement");
}
