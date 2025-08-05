import express, { type Request, type Response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectToDB from './config/connectToDB.js';
import getNotes from './models/getNotes.js';
import addNote from './models/addNote.js';
import NoteModel from './models/NoteModel.js';
import getNote from './models/getNote.js';
import updateNote from './models/updateNote.js';
import deleteNote from './models/deleteNote.js';

const app = express();
dotenv.config();
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
await connectToDB();

console.log(await NoteModel.find());

app.get('/', (req: Request, res: Response) => {
    res.send("Welcome to the notes backend!");
});

app.get('/getNotes', async (req: Request, res: Response) => {
    const response = await getNotes();
    res.json(response);
});

interface NotePayload {
    title: string;
    content: string;
}

app.post('/addNote', async (req: Request<{}, {}, NotePayload>, res: Response) => {
    const { title, content } = req.body;
    const response = await addNote(title, content);
    res.json(response);
});

interface NoteParam {
    id: string
}

app.get('/getNote/:id', async (req: Request<NoteParam>, res: Response) => {
    const response = await getNote(req.params.id);
    res.json(response);
});

interface updateParams {
    id: string;
}

interface UpdateBody {
    title: string;
    content: string;
}

app.put('/updateNote/:id', async (req: Request<updateParams, {}, UpdateBody>, res: Response) => {
    const { title, content } = req.body;
    const response = await updateNote(req.params.id, title, content);
    res.json(response);
});

app.delete('/deleteNote/:id', async (req: Request<updateParams>, res: Response) => {
    const response = await deleteNote(req.params.id);
    res.json(response);
});

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}.`));