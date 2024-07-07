const redis = require('redis');
const redisUrl = require('redis-url');

import config from '../config';
import services from './services';

let isRedisConnected = true;
let objStorage = {} as { [key: string|number]: any }; // Backup alternative mechanism // if redis not connected

const redisConfig = redisUrl.parse(config.redis.redisUrl);
let redisClient = {} as any;

if(config.environment !== 'test'){ // Do need to connect to redis in test environment // because jest/tests are running // using in-memory objStorage as cache db
    redisClient = redis.createClient({
        host: redisConfig.hostname,
        port: redisConfig.port,
    });
    if (redisConfig.password) {
        redisClient.auth(redisConfig.password);
    }

    (async function(){
        const redisInfo = "redis:" + redisConfig.hostname + ":" + redisConfig.port;

        try {
            await redisClient.connect();
            console.log(redisInfo + ' connected');
        }
        catch(error){
            isRedisConnected = false;
            console.log(redisInfo + " not connected. Using object storage variable instead.");
            //console.log(error);
        }

        redisClient.on('error', (error: Error) => {
            isRedisConnected = false;
            console.log(redisInfo + " not connected. Using object storage variable instead.");
            //console.error(error);
        });
    })();
}
else {
    isRedisConnected = false;
}

export default {
    async get(key: string) {
        if(!key){
            //console.log("Redis getter: Invalid key.", key);
            return undefined;
        }

        if(!isRedisConnected){
            if(objStorage[key]) return objStorage[key];
            
            return undefined;
        }

        try {
            const data = await redisClient.get(key);
            if(!!data && data != null) return data;

            return undefined;
        }
        catch(e){
            console.error("Error happened in redisClient", e);

            return undefined;
        }
    },

    async set(key: string, data: any, expiresIn = config.redis.dataExpiresIn) {
        if(!key || !data){
            console.error("Redis setter: Invalid key or data.");
            return false;
        }

        if(!isRedisConnected){
            objStorage[key] = data;
            if(expiresIn >= 60 * 60) expiresIn = 60 * 60 * 1000;
            else expiresIn = expiresIn * 1000;
            services.setTimeout(key, function(){ delete objStorage[key] }, expiresIn); // Default expiresIn max forced = one hour if using setTimeout // to Prevent Memory Leak
            
            return true;
        }

        try {
            await redisClient.set(key, data);
            await redisClient.expire(key, expiresIn);

            return true;
        }
        catch(error){
            console.error("Error happened in redisClient", error);

            return false;
        }
    }
}