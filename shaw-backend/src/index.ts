import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import multer from 'multer';
import sqlite3 from 'sqlite3';
import csvParser from 'csv-parser';

export const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const db = new sqlite3.Database(':memory:');

interface CsvData {
    name?: string;
    city?: string;
    country?: string;
    favorite_sport?: string;
}

db.serialize(() => {

    db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      city TEXT,
      country TEXT,
      favorite_sport TEXT
    )
  `);
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.post('/api/files', upload.single('file'), (req, res) => {
    const file = req.file;

    if (!file || !file.buffer) {
        return res.status(400).json({ error: 'Invalid file upload' });
    }


    const csvData: CsvData[] = [];


    const bufferString = file.buffer.toString();
    const rows = bufferString.split('\n');


    const headers = rows[0].split(',');


    for (let i = 1; i < rows.length; i++) {
        const values = rows[i].split(',');

        // Verifique se todas as propriedades estão presentes antes de adicionar ao array
        if (values.length === headers.length) {
            const rowData: CsvData = {};
            for (let j = 0; j < headers.length; j++) {
                rowData[headers[j]] = values[j];
            }
            csvData.push(rowData);
        }
    }

    // Store the CSV data in the database (SQLite)
    db.serialize(() => {
        db.run('CREATE TABLE IF NOT EXISTS csv_data (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, city TEXT, country TEXT, favorite_sport TEXT)');
        const stmt = db.prepare('INSERT INTO csv_data (name, city, country, favorite_sport) VALUES (?, ?, ?, ?)');
        csvData.forEach((data) => {
            stmt.run(data.name, data.city, data.country, data.favorite_sport);
        });
        stmt.finalize();
    });


    res.status(200).json({ message: 'File uploaded successfully', data: csvData });
});

app.get('/api/users', (req, res) => {
    const searchTerm = req.query.q;
    if (!searchTerm) {
        return res.status(400).json({ error: 'Missing search query parameter' });
    }

    db.all('SELECT * FROM csv_data WHERE name LIKE ? OR city LIKE ? OR country LIKE ? OR favorite_sport LIKE ?', [`%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }

        res.status(200).json(rows);
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
