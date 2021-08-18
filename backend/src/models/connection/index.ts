import {connect, disconnect} from 'mongoose';

export async function openConnectionToMongoDB(connectionString: string): Promise<void>{
    await connect(connectionString, {keepAlive: true, useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
}

export async function closeConnectionToMongoDB(): Promise<void>{
    await disconnect();
}