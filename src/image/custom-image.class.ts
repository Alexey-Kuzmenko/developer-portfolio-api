export class CustomImage {
    originalname: string;
    buffer: Buffer;

    constructor(file: Express.Multer.File | CustomImage) {
        this.originalname = file.originalname;
        this.buffer = file.buffer;
    }
}