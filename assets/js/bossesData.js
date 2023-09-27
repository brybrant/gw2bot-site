/*
  Boss IDs:
https://github.com/baaron4/GW2-Elite-Insights-Parser/blob/master/GW2EIEvtcParser/ParserHelpers/ArcDPSEnums.cs#L1013

  Boss Icons:
https://github.com/baaron4/GW2-Elite-Insights-Parser/blob/master/GW2EIEvtcParser/ParserHelpers/ParserIcons.cs#L100

https://wiki.guildwars2.com/index.php?title=Category:Miniature_icons
*/
const bosses = {
  'Raids': [
    {
      name: 'Spirit Vale',
      encounters: [
        {
          ids: [15438],
          icon: 'https://wiki.guildwars2.com/images/f/fb/Mini_Vale_Guardian.png',
          name: 'Vale Guardian',
          api_name: 'vale_guardian'
        },
        {
          ids: [15429],
          icon: 'https://wiki.guildwars2.com/images/d/d1/Mini_Gorseval_the_Multifarious.png',
          name: 'Gorseval the Multifarious',
          api_name: 'gorseval'
        },
        {
          ids: [15375],
          icon: 'https://wiki.guildwars2.com/images/5/54/Mini_Sabetha.png',
          name: 'Sabetha the Saboteur',
          api_name: 'sabetha'
        }
      ]
    },
    {
      name: 'Salvation Pass',
      encounters: [
        {
          ids: [16123],
          icon: 'https://wiki.guildwars2.com/images/1/12/Mini_Slothasor.png',
          name: 'Slothasor',
          api_name: 'slothasor'
        },
        {
          ids: [16088, 16137, 16125],
          icon: 'https://i.imgur.com/oeDU3JB.png',
          name: 'Bandit Trio',
          api_name: 'bandit_trio'
        },
        {
          ids: [16115],
          icon: 'https://wiki.guildwars2.com/images/5/5d/Mini_Matthias_Abomination.png',
          name: 'Matthias Gabrel',
          api_name: 'matthias'
        }
      ]
    },
    {
      name: 'Stronghold of the Faithful',
      encounters: [
        {
          ids: [16253],
          icon: 'https://wiki.guildwars2.com/images/b/b5/Mini_McLeod_the_Silent.png',
          name: 'Siege the Stronghold (Escort)',
          api_name: 'escort'
        },
        {
          ids: [16235],
          icon: 'https://wiki.guildwars2.com/images/e/ea/Mini_Keep_Construct.png',
          name: 'Keep Construct',
          api_name: 'keep_construct'
        },
        {
          ids: [16246],
          icon: 'https://wiki.guildwars2.com/images/4/4b/Mini_Xera.png',
          name: 'Xera',
          api_name: 'xera'
        }
      ]
    },
    {
      name: 'Bastion of the Penitent',
      encounters: [
        {
          ids: [17194],
          icon: 'https://wiki.guildwars2.com/images/b/b8/Mini_Cairn_the_Indomitable.png',
          name: 'Cairn the Indomitable',
          api_name: 'cairn'
        },
        {
          ids: [17172],
          icon: 'https://wiki.guildwars2.com/images/c/c8/Mini_Mursaat_Overseer.png',
          name: 'Mursaat Overseer',
          api_name: 'mursaat_overseer'
        },
        {
          ids: [17188],
          icon: 'https://wiki.guildwars2.com/images/f/f0/Mini_Samarog.png',
          name: 'Samarog',
          api_name: 'samarog'
        },
        {
          ids: [17154],
          icon: 'https://wiki.guildwars2.com/images/e/e0/Mini_Ragged_White_Mantle_Figurehead.png',
          name: 'Deimos',
          api_name: 'deimos'
        }
      ]
    },
    {
      name: 'Hall of Chains',
      encounters: [
        {
          ids: [19767],
          icon: 'https://wiki.guildwars2.com/images/d/d4/Mini_Desmina.png',
          name: 'Soulless Horror (Desmina)',
          api_name: 'soulless_horror'
        },
        {
          ids: [19828],
          icon: 'https://wiki.guildwars2.com/images/c/c4/Silver_River_of_Souls_Trophy.png',
          name: 'River of Souls',
          api_name: 'river_of_souls'
        },
        {
          ids: [19691],
          icon: 'https://wiki.guildwars2.com/images/3/37/Mini_Broken_King.png',
          name: 'Broken King',
          api_name: 'statues_of_grenth'
        },
        {
          ids: [19536],
          icon: 'https://i.imgur.com/bb7VOtW.png',
          name: 'Eater of Souls',
          api_name: 'statues_of_grenth'
        },
        {
          ids: [19651, 19844],
          icon: 'https://i.imgur.com/Rr8ToDY.png',
          name: 'Eye of Fate and Eye of Judgement',
          api_name: 'statues_of_grenth'
        },
        {
          ids: [19450],
          icon: 'https://wiki.guildwars2.com/images/e/e4/Mini_Dhuum.png',
          name: 'Voice in the Void (Dhuum)',
          api_name: '"voice_in_the_void'
        }
      ]
    },
    {
      name: 'Mythwright Gambit',
      encounters: [
        {
          ids: [43974, 44885],
          icon: 'https://wiki.guildwars2.com/images/1/19/Bronze_Conjured_Amalgamate_Trophy.png',
          name: 'Conjured Amalgamate',
          api_name: 'conjured_amalgamate'
        },
        {
          ids: [21105, 21089],
          icon: 'https://i.imgur.com/NdpoMGs.png',
          name: 'Twin Largos (Nikare and Kenut)',
          api_name: 'twin_largos'
        },
        {
          ids: [20934],
          icon: 'https://wiki.guildwars2.com/images/f/f2/Mini_Qadim.png',
          name: 'Qadim',
          api_name: 'qadim'
        }
      ]
    },
    {
      name: 'The Key of Ahdashim',
      encounters: [
        {
          ids: [21964],
          icon: 'https://wiki.guildwars2.com/images/f/fc/Mini_Air_Djinn.png',
          name: 'Cardinal Sabir',
          api_name: 'sabir'
        },
        {
          ids: [22006],
          icon: 'https://wiki.guildwars2.com/images/a/a0/Mini_Earth_Djinn.png',
          name: 'Cardinal Adina',
          api_name: 'adina'
        },
        {
          ids: [22000],
          icon: 'https://wiki.guildwars2.com/images/8/8b/Mini_Qadim_the_Peerless.png',
          name: 'Qadim the Peerless',
          api_name: 'qadim_the_peerless'
        }
      ]
    }
  ],
  'Fractals of the Mists': [
    {
      name: 'Nightmare Fractal',
      encounters: [
        {
          ids: [17021],
          icon: 'https://i.imgur.com/szBjyva.png',
          name: 'MAMA'
        },
        {
          ids: [17028],
          icon: 'https://wiki.guildwars2.com/images/d/d0/Mini_Toxic_Warlock.png',
          name: 'Siax'
        },
        {
          ids: [16948],
          icon: 'https://wiki.guildwars2.com/images/5/5e/Mini_Toxic_Hybrid.png',
          name: 'Ensolyss'
        }
      ]
    },
    {
      name: 'Shattered Observatory',
      encounters: [
        {
          ids: [17632],
          icon: 'https://i.imgur.com/N202B0m.png',
          name: 'Skorvald the Shattered'
        },
        {
          ids: [17949],
          icon: 'https://i.imgur.com/sCQxF5g.png',
          name: 'Artsariiv'
        },
        {
          ids: [17759],
          icon: 'https://i.imgur.com/xw2e83k.png',
          name: 'Arkk'
        }
      ]
    },
    {
      name: 'Sunqua Peak',
      encounters: [
        {
          ids: [23254],
          icon: 'https://i.imgur.com/R5w3sXS.png',
          name: 'Ai, Keeper of the Peak'
        }
      ]
    },
    {
      name: 'Silent Surf',
      encounters: [
        {
          ids: [25572, 25577],
          icon: 'https://wiki.guildwars2.com/images/3/31/Mini_Kanaxai.png',
          name: 'Kanaxai, Scythe of House Aurkus'
        }
      ]
    }
  ],
  'Strike Missions': [
    {
      name: 'Shiverpeaks Pass',
      encounters: [
        {
          ids: [22154],
          icon: 'https://wiki.guildwars2.com/images/f/f4/Mini_Icebrood_Construct.png',
          name: 'Legendary Icebrood Construct'
        }
      ]
    },
    {
      name: 'Voice of the Fallen and Claw of the Fallen',
      encounters: [
        {
          ids: [22343, 22481, 22315],
          icon: 'https://i.imgur.com/ENCeHIg.png',
          name: 'The Voice and The Claw'
        }
      ]
    },
    {
      name: 'Fraenir of Jormag',
      encounters: [
        {
          ids: [22492, 22436],
          icon: 'https://i.imgur.com/v81xayj.png',
          name: 'Fraenir of Jormag'
        }
      ]
    },
    {
      name: 'Boneskinner',
      encounters: [
        {
          ids: [22521],
          icon: 'https://wiki.guildwars2.com/images/8/8e/Mini_Boneskinner.png',
          name: 'Boneskinner'
        }
      ]
    },
    {
      name: 'Whisper of Jormag',
      encounters: [
        {
          ids: [22711],
          icon: 'https://wiki.guildwars2.com/images/c/c0/Mini_Whisper_of_Jormag.png',
          name: 'Whisper of Jormag'
        }
      ]
    },
    {
      name: 'Aetherblade Hideout',
      encounters: [
        {
          ids: [24033, 24768, 25247],
          icon: 'https://wiki.guildwars2.com/images/c/cd/Mini_Holographic_Scarlet.png',
          name: 'Captain Mai Trin & Echo Of Scarlet Briar'
        }
      ]
    },
    {
      name: 'Xunlai Jade Junkyard',
      encounters: [
        {
          ids: [23957],
          icon: 'https://i.imgur.com/PhChXQ4.png',
          name: 'Ankka'
        }
      ]
    },
    {
      name: 'Kaineng Overlook',
      encounters: [
        {
          ids: [24485, 24266],
          icon: 'https://i.imgur.com/9qzjr9H.png',
          name: 'Minister Li'
        }
      ]
    },
    {
      name: 'Harvest Temple',
      encounters: [
        {
          ids: [43488, 1378, 24375],
          icon: 'https://i.imgur.com/wwJk2AG.png',
          name: 'The Dragonvoid'
        }
      ]
    },
    {
      name: 'Old Lion\'s Court',
      encounters: [
        {
          ids: [25413, 25415, 25419],
          icon: 'https://i.imgur.com/4PWffRa.png',
          name: 'Watchknight Triumvirate'
        }
      ]
    },
    {
      name: 'Cosmic Observatory',
      encounters: [
        {
          ids: [25705],
          icon: 'https://wiki.guildwars2.com/images/5/52/Mini_Dagda.png',
          name: 'Dagda'
        }
      ]
    },
    {
      name: 'Temple of Febe',
      encounters: [
        {
          ids: [25989],
          icon: 'https://wiki.guildwars2.com/images/e/e0/Mini_Cerus.png',
          name: 'Cerus'
        }
      ]
    },
    {
      name: 'Secret Lair of the Snowmen',
      encounters: [
        {
          ids: [21333],
          icon: 'https://wiki.guildwars2.com/images/d/d9/Mini_Freezie.png',
          name: 'Freezie'
        }
      ]
    }
  ],
  'Other': [
    {
      name: 'Training Golems',
      encounters: [
        {
          ids: [16199],
          icon: 'https://wiki.guildwars2.com/images/8/8f/Mini_Professor_Mew.png',
          name: 'Standard Kitty Golem'
        },
        {
          ids: [19645],
          icon: 'https://wiki.guildwars2.com/images/c/cb/Mini_Mister_Mittens.png',
          name: 'Medium Kitty Golem'
        },
        {
          ids: [19676],
          icon:
            'https://wiki.guildwars2.com/images/4/47/Mini_Baron_von_Scrufflebutt.png',
          name: 'Large Kitty Golem'
        },
        {
          ids: [16178, 16202, 16169],
          icon: 'https://wiki.guildwars2.com/images/3/33/Mini_Snuggles.png',
          name: 'Massive Kitty Golem'
        },
        {
          ids: [16177],
          icon: 'https://wiki.guildwars2.com/images/c/cb/Mini_Mister_Mittens.png',
          name: 'Average Kitty Golem'
        },
        {
          ids: [16198],
          icon: 'https://wiki.guildwars2.com/images/3/33/Mini_Snuggles.png',
          name: 'Vital Kitty Golem'
        }
      ]
    }
  ],
  'WvW': [
    {
      name: 'World vs World',
      encounters: [
        {
          ids: [1],
          icon: 'https://wiki.guildwars2.com/images/4/40/Mini_Chest_of_the_Mists.png',
          name: 'World vs World'
        }
      ]
    }
  ]
}

export default bosses