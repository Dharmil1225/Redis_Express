import * as dotenv from 'dotenv'
dotenv.config()
export const envConfig = {
    app:{
        port: process.env.PORT
    },
    database:{
        port: process.env.DB_PORT,
        host: process.env.DB_HOST,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    },
    elasticSearch:{
        index: process.env.ELASTICSEARCH_INDEX
    }
}