import Dexie from 'dexie';

export class AppDatabase extends Dexie {

    users: Dexie.Table<IUser, number>;


    constructor() {

        super('DatabaseService');

        // Define tables and indexes
        // (Here's where the implicit table props are dynamically created)
        this.version(1).stores({
            users: '++id,email,password'
        });

        // The following lines are needed for it to work across typescipt using babel-preset-typescript:
        this.users = this.table('users');

        // Populate db
        this.table('users').put({ id: 1, email: 'dabbraccio.francesco@gmail.com', password: 'ivano' });
        this.table('users').put({ id: 2, email: 'x100mini@gmail.com', password: 'francesco' });

    }
}

export interface IUser {
    id?: number; // Primary key. Optional (autoincremented)
    email: string;
    password: string;
}

export let db = new AppDatabase();
