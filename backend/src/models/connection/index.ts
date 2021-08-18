import {connect, disconnect} from 'mongoose';

export async function openConnectionToMongoDB(connectionString: string){
    await connect(connectionString, {keepAlive: true, useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
}

export async function closeConnectionToMongoDB(){
    await disconnect();
}