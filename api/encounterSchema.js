export const professions = [
  'Guardian', 'Dragonhunter', 'Firebrand', 'Willbender',
  'Revenant', 'Herald', 'Renegade', 'Vindicator',
  'Warrior', 'Berserker', 'Spellbreaker', 'Bladesworn',
  'Engineer', 'Scrapper', 'Holosmith', 'Mechanist',
  'Ranger', 'Druid', 'Soulbeast', 'Untamed',
  'Thief', 'Daredevil', 'Deadeye', 'Specter',
  'Elementalist', 'Tempest', 'Weaver', 'Catalyst',
  'Mesmer', 'Chronomancer', 'Mirage', 'Virtuoso',
  'Necromancer', 'Reaper', 'Scourge', 'Harbinger'
]

export const weapons = {
  oneHand: [
    'Scepter',
    'Axe',
    'Dagger',
    'Mace',
    'Pistol',
    'Sword',
    'Focus',
    'Shield',
    'Torch',
    'Warhorn'
  ],
  twoHand: [
    'Greatsword',
    'Hammer',
    'Longbow',
    'Rifle',
    'Shortbow',
    'Staff'
  ]
}

export const wvwMaps = [
  'Armistice Bastion',
  'Blue Alpine Borderlands',
  'Edge of the Mists',
  'Eternal Battlegrounds',
  'Green Alpine Borderlands',
  'Obsidian Sanctum',
  'Red Desert Borderlands'
]

const weaponSchema = {
  type: String,
  options: [...weapons.oneHand, ...weapons.twoHand, '2Hand', 'Unknown']
}

const playerSchema = {
  type: Object,
  schema: {
    account: {
      type: String
    },
    attributes: {
      type: Object,
      schema: {
        condition: {
          type: Boolean
        },
        concentration: {
          type: Boolean
        },
        healing: {
          type: Boolean
        },
        toughness: {
          type: Boolean
        }
      }
    },
    alacrity: {
      type: Number,
      float: true
    },
    fury: {
      type: Number,
      float: true
    },
    might: {
      type: Number,
      float: true
    },
    protection: {
      type: Number,
      float: true
    },
    quickness: {
      type: Number,
      float: true
    },
    resistance: {
      type: Number,
      float: true
    },
    resolution: {
      type: Number,
      float: true
    },
    vigor: {
      type: Number,
      float: true
    },
    character: {
      type: String
    },
    commander: {
      type: Boolean
    },
    dps: {
      type: Number
    },
    group: {
      type: Number
    },
    profession: {
      type: String,
      options: professions
    },
    absorbed: {
      type: Number
    },
    blocked: {
      type: Number
    },
    cleanses: {
      type: Number
    },
    evades: {
      type: Number
    },
    resurrects: {
      type: Number
    },
    strips: {
      type: Number
    },
    weapons: {
      type: Array,
      length: {
        min: 1,
        max: 4
      },
      schema: weaponSchema
    }
  }
}

export const encounterSchema = {
  dps: {
    type: Number
  },
  boss_health: {
    type: Number,
    optional: true
  },
  wvw_map: {
    type: String,
    options: wvwMaps,
    optional: true
  },
  players: {
    type: Array,
    length: {
      min: 1,
      max: 50
    },
    schema: playerSchema
  }
}
