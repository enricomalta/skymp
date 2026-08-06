export interface CreateCharacterDto {

    accountId: string;

    profileId: number;

    name: string;

    race: string;

    appearance: any;

    sex: "male" | "female";

    inventory: string[];

    equipment: {

        head: string | null;

        body: string | null;

        hands: string | null;

        feet: string | null;

        shield: string | null;

        weapon: string | null;

        ring: string | null;

        necklace: string | null;

    };

    skills: Record<string, number>;

    attributes: {

        health: number;

        magicka: number;

        stamina: number;

    };

    stats: {

        playTime: number;

        deaths: number;

        kills: number;

    };

    quests: {

        active: string[];

        completed: string[];

    };

    factions: string[];

    location: {

        region: string;

        city: string;

    };

    isDead: boolean;

    jail: {

        isJailed: boolean;

        releaseAt: Date | null;

        jailName: string | null;

    };

    housing: {

        owned: string[];

        current: string | null;

    };

    bank: {

        gold: number;

    };

    weight: number;

    maxWeight: number;

    reputation: {

        whiterun: number;

        solitude: number;

        windhelm: number;

        markarth: number;

        riften: number;

        dawnstar: number;

        falkreath: number;

        morthal: number;

        winterhold: number;

    };

    skillPoints: number;

    perkPoints: number;

    lastSave: Date;

    lastLogin: Date | null;

    lastLogout: Date | null;

}