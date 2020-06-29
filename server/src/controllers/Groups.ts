import { Request, Response } from 'express'
import knex from '../database/connection'
import { client } from '../server'
import { Whatsapp } from 'venom-bot';


class GroupsController {

    async index(request: Request, res: Response) {

        if(client === undefined){
            return res.status(400).json({message:'não há uma sessão iniciada'})
        }

        client.then(async (client: Whatsapp) => {
            const groups = await start(client);
            res.json(groups);
        });
                
        async function start(client: Whatsapp): Promise<any> {
            
            const groups = await client.getAllGroups();
           
            const serializedGroups =  groups.map(async item => {

                const result =   {
                    user: item.id.user,
                    name: item.contact.name,
                    image: item.contact.profilePicThumbObj.eurl,
                    participants: await serializedParticipants(item.groupMetadata.participants) 
                }

                return  result;
            });

            return  Promise.all(serializedGroups);
            
        }

        async function getUser( whatsapp: string){
            const user = await knex('users').where('whatsapp', whatsapp).first()
            return user
        }

        async function serializedParticipants(participants: any[]): Promise<any>{

            const serialized = participants.map( async  (item) => {
                const user = await getUser(item.id.user);
                
                return {
                    name: user ? user.name : item.id.user,
                    pushname: user ? user.pushname : item.id.user,
                    image: user ? user.image : null,
                    is_my_contact: user ? user.is_my_contact : null,
                    isAdmin: item.isAdmin
                }
            })

            return Promise.all( serialized)
        }

        
        
        
    }
}

export default GroupsController

/** 
app.get('/groups', async (req: Request, res: Response) => {

    client.then((client: Whatsapp) => {
        start(client);
    });

    async function start(client: Whatsapp) {
        const chats = await client.getAllGroups();
        res.send(chats);
      }
    
});
*/