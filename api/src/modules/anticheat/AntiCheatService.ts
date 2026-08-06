import AntiCheatEvent from "./models/AntiCheatEvent";


export class AntiCheatService
{


    async createEvent(data:any)
    {

        const event =
            await AntiCheatEvent.create(
                data
            );


        return event;

    }

}