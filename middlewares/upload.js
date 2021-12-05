import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Multer 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', "public/image"))
    },
    filename: function (req, file, cb) {
        cb(null, `IVIV-${file.originalname}`)
    }
});


export default multer({ storage: storage });