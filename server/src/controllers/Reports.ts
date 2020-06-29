import { Request, Response } from 'express'
import knex from '../database/connection'
import { client } from '../server'
import { Whatsapp } from 'venom-bot';

import pdf from 'html-pdf';
import ejs from 'ejs';
import path  from 'path';
import fs from 'fs';

//const mockContacts = require('../database/contacts');


class ReportsController {

    async contacts(request: Request, res: Response) {
        
        let html;

        const contacts = await knex('users').select('*')
        const me = await knex('users').where('is_me',true).first()
        
        //const contacts = mockContacts.default[0];
        //const me = await contacts.filter((item: { isMe: boolean; }) =>  item.isMe === true)[0];
        
        ejs.renderFile(path.resolve(__dirname, '..', 'templates', 'contacts.ejs'),
            { contacts: contacts, me: me }, (error, result) => {
            if(error){
                console.log(error);
                return res.status(400).json({message:'não foi possível gerar o template para o pdf.'});
            }else{
                html = result;
            }
        })

        const options: Object = {
            format: 'A4',
            paginationOffset: 1,
            "border": {
                "top": "5px",            // default is 0, units: mm, cm, in, px
                "right": "0",
                "bottom": "5px",
                "left": "0"
            },
            "header": {
                "height": "10mm",
                "contents": `<div style="text-align: center;">${me.whatsapp}</div>`
            },
            "footer": {
                "margin-top": "0",
                "height": "10mm",
                "contents": {
                    default: '<span style="display: inline; float: right; font-size: 8pt; margin-right: 10px;">Página: {{page}}/{{pages}}</span>', // fallback value
                }
            },
        }

        const fileName =  `${me.name}.pdf`
        
        pdf.create( String(html), options )
            .toFile( `./pdfs/${fileName}`, function(error, result){
                if (error) return res.status(500).json({error});
                res.json({fileName});
            });
        }
} 

export default ReportsController
