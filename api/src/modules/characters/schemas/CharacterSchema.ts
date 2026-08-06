import { Schema, model } from "mongoose";

const CharacterSchema = new Schema({

    accountId: {

        type: Schema.Types.ObjectId,

        ref: "Account",

        required: true

    },

    profileId: {

        type: Number,

        required: true,

        unique: true

    },

    name: {

        type: String,

        required: true,

        unique: true

    },

    race: {

        type: String,

        required: true

    },

    sex: {

        type: String,

        enum: ["male", "female"],

        required: true

    },

    level: {

        type: Number,

        default: 1

    },

    position: {

        x: {

            type: Number,

            default: 22627

        },

        y: {

            type: Number,

            default: -8694

        },

        z: {

            type: Number,

            default: -3595

        }

    },

    rotation: {

        x: {

            type: Number,

            default: 0

        },

        y: {

            type: Number,

            default: 0

        },

        z: {

            type: Number,

            default: 0

        }

    },

    world: {

        type: String,

        default: "0x3C"

    },

    cell: {

        type: String,

        default: null

    },

    health: {

        type: Number,

        default: 100

    },

    magicka: {

        type: Number,

        default: 100

    },

    stamina: {

        type: Number,

        default: 100

    },

    gold: {

        type: Number,

        default: 0

    },

    experience: {

        type: Number,

        default: 0

    },

    appearance: {

        type: Schema.Types.Mixed,

        default: {}

    },

    inventory: {

        type: [

            String

        ],

        default: []

    },

    equipment: {

        head: {

            type: String,

            default: null

        },

        body: {

            type: String,

            default: null

        },

        hands: {

            type: String,

            default: null

        },

        feet: {

            type: String,

            default: null

        },

        shield: {

            type: String,

            default: null

        },

        weapon: {

            type: String,

            default: null

        },

        ring: {

            type: String,

            default: null

        },

        necklace: {

            type: String,

            default: null

        }

    },

    skills: {

        type: Schema.Types.Mixed,

        default: {}

    },

    attributes: {

        health: {

            type: Number,

            default: 100

        },

        magicka: {

            type: Number,

            default: 100

        },

        stamina: {

            type: Number,

            default: 100

        }

    },

    stats: {

        playTime: {

            type: Number,

            default: 0

        },

        deaths: {

            type: Number,

            default: 0

        },

        kills: {

            type: Number,

            default: 0

        }

    },

    quests: {

        active: {

            type: [

                String

            ],

            default: []

        },

        completed: {

            type: [

                String

            ],

            default: []

        }

    },

    factions: {

        type: [

            String

        ],

        default: []

    },

    location: {

        region: {

            type: String,

            default: ""

        },

        city: {

            type: String,

            default: ""

        }

    },

    isDead: {

        type: Boolean,

        default: false

    },

    jail: {

        isJailed: {

            type: Boolean,

            default: false

        },

        releaseAt: {

            type: Date,

            default: null

        },

        jailName: {

            type: String,

            default: null

        }

    },

    housing: {

        owned: {

            type: [

                String

            ],

            default: []

        },

        current: {

            type: String,

            default: null

        }

    },

    bank: {

        gold: {

            type: Number,

            default: 0

        }

    },

    weight: {

        type: Number,

        default: 0

    },

    maxWeight: {

        type: Number,

        default: 300

    },

    reputation: {

        whiterun: {

            type: Number,

            default: 0

        },

        solitude: {

            type: Number,

            default: 0

        },

        windhelm: {

            type: Number,

            default: 0

        },

        markarth: {

            type: Number,

            default: 0

        },

        riften: {

            type: Number,

            default: 0

        },

        dawnstar: {

            type: Number,

            default: 0

        },

        falkreath: {

            type: Number,

            default: 0

        },

        morthal: {

            type: Number,

            default: 0

        },

        winterhold: {

            type: Number,

            default: 0

        }

    },

    skillPoints: {

        type: Number,

        default: 0

    },

    perkPoints: {

        type: Number,

        default: 0

    },


    lastSave: {

        type: Date,

        default: Date.now

    },


    lastLogin: {

        type: Date,

        default: null

    },

    lastLogout: {

        type: Date,

        default: null

    }

}, {

    timestamps: true

});

export const CharacterModel = model(
    "Character",
    CharacterSchema
);