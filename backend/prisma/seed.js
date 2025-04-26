"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    await prisma.song.createMany({
        data: [
            { title: 'Blinding Lights', artist: 'The Weeknd', type: 'Pop' },
            { title: 'Imagine', artist: 'John Lennon', type: 'Rock' },
            { title: 'Take Five', artist: 'Dave Brubeck', type: 'Pop' },
            { title: 'Hum Apke Bina', artist: 'Arijit Singh', type: 'Classic' },
            { title: 'Jaadu', artist: 'Sachet-Parampara', type: 'Classic' },
            { title: 'Mushkil Hai', artist: 'Sachin-Jigar', type: 'Rock' },
            { title: 'Tareefan', artist: 'Jubin Nautiyal', type: 'Rock' },
            { title: 'Koi Unko', artist: 'Nakash Aziz', type: 'Pop' },
            { title: 'Sajde', artist: 'Arijit Singh', type: 'Rock' },
            { title: 'Gulaab', artist: 'Mitraz', type: 'Rock' },
            { title: 'Aaj Ki Raat', artist: 'Neha Kakkar', type: 'Pop' },
            { title: 'Khoobsurat', artist: 'Vishal Mishra', type: 'Classic' },
            { title: 'Mere Mehboob', artist: 'Sachin-Jigar', type: 'Pop' },
        ]
    });
}
main()
    .catch((e) => console.error(e))
    .finally(() => prisma.$disconnect());
//# sourceMappingURL=seed.js.map