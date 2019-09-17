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
            plants: '++id, user, area, city, address, pod, long, lat, consumption, status, connection'
        });

        // The following lines are needed for it to work across typescipt using babel-preset-typescript:
        this.users = this.table('users');
        this.plants = this.table('plants');

        // Populate db
        this.table('users').put({ id: 1, email: 'dabbraccio.francesco@gmail.com', password: 'ivano' });
        this.table('users').put({ id: 2, email: 'x100mini@gmail.com', password: 'francesco' });
        this.table('users').put({ id: 3, email: 'a', password: 'b' });

        this.table('plants').put({ id: 1, user: 'dabbraccio.francesco@gmail.com', area: 'North Italy', city: 'Milan', address: 'Via Carlo Poma, 17', long: '9.216140', lat: '45.465410', pod: 'IT 001 E 12345678', consumption: 'Low', status: 'OFF', connection: false });
        this.table('plants').put({ id: 2, user: 'dabbraccio.francesco@gmail.com', area: 'South Italy', city: 'Vico Equense', address: 'Via Nicotera, 16', long: '14.427550', lat: '40.661440', pod: 'IT 002 E 12345678', consumption: 'Medium', status: 'ON', connection: true });

        this.table('plants').put({ id: 3, user: 'x100mini@gmail.com', area: 'North Italy', city: 'Turin', address: 'Corso Raffaello, 7/Bis', long: '7.676250', lat: '45.052350', pod: 'IT 003 E 12345678', consumption: 'High', status: 'OFF', connection: false });
        this.table('plants').put({ id: 4, user: 'x100mini@gmail.com', area: 'Center Italy', city: 'Frosinone', address: 'Via Maria, 63', long: '13.350750', lat: '41.648870', pod: 'IT 004 E 12345678', consumption: 'Low', status: 'OFF', connection: true });
        this.table('plants').put({ id: 5, user: 'x100mini@gmail.com', area: 'South Italy', city: 'Canosa di Puglia', address: 'Via Santa Lucia, 45', long: '16.068840', lat: '41.217960', pod: 'IT 005 E 12345678', consumption: 'High', status: 'ON', connection: false });

        this.table('plants').put({ id: 6, user: 'a', area: 'North Italy', city: 'Turin', address: 'Corso Raffaello, 7/Bis', long: '7.676250', lat: '45.052350',  pod: 'IT 003 E 12345679', consumption: 'High', status: 'OFF', connection: false });
        this.table('plants').put({ id: 7, user: 'a', area: 'Center Italy', city: 'Frosinone', address: 'Via Maria, 63', long: '13.350750', lat: '41.648870', pod: 'IT 004 E 12345680', consumption: 'Low', status: 'OFF', connection: true });
        this.table('plants').put({ id: 8, user: 'a', area: 'South Italy', city: 'Canosa di Puglia', address: 'Via Santa Lucia, 45', long: '16.068840', lat: '41.217960', pod: 'IT 005 E 12345681', consumption: 'High', status: 'ON', connection: false });
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
    address: string;
    long: string;
    lat: string;
    pod: string;
    consumption: string;
    status: string;
    connection: boolean;
}

export let db = new AppDatabase();
