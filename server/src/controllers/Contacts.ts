import { Request, Response } from 'express'
import knex from '../database/connection'
import { client } from '../server'
import { Whatsapp } from 'venom-bot';
//import mockContacts from '../database/contacts'

interface User{
    whatsapp: string,
    name: string,
    pushname: string,
    formattedName: string,
    image: string
}

class ContactController {

    async index(request: Request, res: Response) {
         
        if(client === undefined){
            return res.status(400).json({message:'não há uma sessão iniciada'})
        }

        client.then((client: Whatsapp) => {
            start(client);
        })    
       
        async function start(client: Whatsapp) {
            const contacts = await client.getAllContacts();
            await save(contacts);
            return res.json(contacts);
        }

         async function save(contacts: any[]){
            
            const me = contacts.filter(contact => contact.isMe === true);
            let contactsIds: number[] = [];
            
            await contacts.forEach(async contact => {
                
                await knex('users').delete();
                
                const data = {
                    whatsapp: contact.id.user,
                    name: contact.id.user,
                    pushname: contact.pushname,
                    formatted_name: contact.formattedName,
                    is_user: contact.isUser,
                    is_me: contact.isMe,
                    is_my_contact: contact.isMyContact,
                    image: (contact.profilePicThumbObj && contact.profilePicThumbObj.eurl) 
                            ? contact.profilePicThumbObj.eurl
                            : null
                }
                            
                const ids = await knex('users').insert(data);

                if(!data.is_me)
                    contactsIds.push(ids[0]);

            });
            console.log(contactsIds);
        }
    }
}

export default ContactController
