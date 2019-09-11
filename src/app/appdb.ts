import Dexie from 'dexie';

export class AppDatabase extends Dexie {

    users: Dexie.Table<IUser, number>;
    plants: Dexie.Table<IPlant, number>;

    constructor() {

        super('DatabaseService');

        // this.delete();

        // Define tables and indexes
        // (Here's where the implicit table props are dynamically created)
        this.version(1).stores({
            users: '++id,email,password',
            plants: '++id, user, area, city, pod, consumption, status'
        });

        // The following lines are needed for it to work across typescipt using babel-preset-typescript:
        this.users = this.table('users');
        this.plants = this.table('plants');

        // Populate db
        this.table('users').put({ id: 1, email: 'dabbraccio.francesco@gmail.com', password: 'ivano' });
        this.table('users').put({ id: 2, email: 'x100mini@gmail.com', password: 'francesco' });
        this.table('users').put({ id: 3, email: 'a', password: 'b' });

        this.table('plants').put({ id: 1, user: 'dabbraccio.francesco@gmail.com', area: 'North Italy', city: 'Milan', pod: 'IT 001 E 12345678', consumption: 'Low', status: 'OFF' });
        this.table('plants').put({ id: 2, user: 'dabbraccio.francesco@gmail.com', area: 'South Italy', city: 'Vico Equense', pod: 'IT 002 E 12345678', consumption: 'Medium', status: 'ON' });
        this.table('plants').put({ id: 3, user: 'x100mini@gmail.com', area: 'North Italy', city: 'Turin', pod: 'IT 003 E 12345678', consumption: 'High', status: 'OFF' });
        this.table('plants').put({ id: 4, user: 'x100mini@gmail.com', area: 'Center Italy', city: 'Frosinone', pod: 'IT 004 E 12345678', consumption: 'Low', status:  'OFF'});
        this.table('plants').put({ id: 5, user: 'x100mini@gmail.com', area: 'South Italy', city: 'Canosa di Puglia', pod: 'IT 005 E 12345678', consumption: 'High', status:  'ON'});

        this.table('plants').put({ id: 3, user: 'a', area: 'North Italy', city: 'Turin', pod: 'IT 003 E 12345678', consumption: 'High', status: 'OFF' });
        this.table('plants').put({ id: 4, user: 'a', area: 'Center Italy', city: 'Frosinone', pod: 'IT 004 E 12345678', consumption: 'Low', status:  'OFF'});
        this.table('plants').put({ id: 5, user: 'a', area: 'South Italy', city: 'Canosa di Puglia', pod: 'IT 005 E 12345678', consumption: 'High', status:  'ON'});
    }
}

export interface IUser {
    id?: number; // Primary key. Optional (autoincremented)
    email: string;
    password: string;
}

export interface IPlant {
    id?: number;
    user: string;
    area: string;
    city: string;
    pod: string;
    consumption: string;
    status: string;
}

export let db = new AppDatabase();
