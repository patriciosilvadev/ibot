import { Request, Response } from 'express'
import knex from '../database/connection'
import { client } from '../server'
import { create as venom, Whatsapp } from 'venom-bot';
import fs from 'fs';

interface User{
    whatsapp: string,
    name: string,
    pushname: string,
    formattedName: string,
    image: string
}

function initVenom(): void{
    client =  venom('session', (base64Qr, asciiQR) => {
        console.log(asciiQR);
        exportQR(base64Qr, 'images/qr.png');
    });

}

function exportQR(qrCode: string, path: string) {
    qrCode = qrCode.replace('data:image/png;base64,', '');
    const imageBuffer = Buffer.from(qrCode, 'base64');
    fs.writeFileSync(path, imageBuffer);
}

class VenomController {

    
    async create(request: Request, res: Response) {
        await initVenom();
        res.send("ok");
    }
    
    async status(request: Request, res: Response) {
        await fs.stat('tokens/session.data.json', (err, stats) => {

            if (err) return res.status(400).json({status: false});
            if (client !== undefined) return res.json({status: true});
    
            return res.status(400).json({status: true});    
        });
    }

    async update(request: Request, res: Response) {
        await fs.unlink('images/qr.png', function (err) {
            if (err) console.log(err);
        });
        
        await fs.rmdirSync('tokens', { recursive: true });
        await initVenom();
        res.send("ok");
    }


}

export default VenomController
