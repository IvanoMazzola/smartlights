import Dexie from 'dexie';

export class AppDatabase extends Dexie {

    users: Dexie.Table<IUser, number>;
    establishments: Dexie.Table<IEstablish, number>;

    constructor() {

        super('DatabaseService');

        // Define tables and indexes
        // (Here's where the implicit table props are dynamically created)
        this.version(1).stores({
            users: '++id,email,password',
            establishments: '++id, user, area, city, pod'
        });

        // The following lines are needed for it to work across typescipt using babel-preset-typescript:
        this.users = this.table('users');
        this.establishments = this.table('establishments');

        // Populate db
        this.table('users').put({ id: 1, email: 'dabbraccio.francesco@gmail.com', password: 'ivano' });
        this.table('users').put({ id: 2, email: 'x100mini@gmail.com', password: 'francesco' });

        // tslint:disable-next-line: max-line-length
        this.table('establishments').put({ id: 1, user: 'dabbraccio.francesco@gmail.com', area: 'North italy', city: 'Milan', POD: 'IT 001 E 12345678' });
        // tslint:disable-next-line: max-line-length
        this.table('establishments').put({ id: 2, user: 'dabbraccio.francesco@gmail.com', area: 'South italy', city: 'Vico Equense', POD: 'IT 002 E 12345678' });
        // tslint:disable-next-line: max-line-length
        this.table('establishments').put({ id: 3, user: 'x100mini@gmail.com', area: 'North italy', city: 'Turin', POD: 'IT 003 E 12345678' });
        // tslint:disable-next-line: max-line-length
        this.table('establishments').put({ id: 4, user: 'x100mini@gmail.com', area: 'Center italy', city: 'Frosinone', POD: 'IT 004 E 12345678' });
    }
}

export interface IUser {
    id?: number; // Primary key. Optional (autoincremented)
    email: string;
    password: string;
}

export interface IEstablish {
    id?: number;
    user: string;
    area: string;
    city: string;
    pod: string;
}

export let db = new AppDatabase();
