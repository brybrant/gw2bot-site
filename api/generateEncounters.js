function randInt (min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function randFloat (min, max) {
  min *= 100
  max *= 100
  return Math.round(Math.random() * (max - min) + min) / 100
}

function randName () {
  let name = String.fromCharCode(65 + Math.floor(Math.random() * 26))

  const nameLength = randInt(7, 20)

  for (let i = 0; i < nameLength; i++) {
    if (i % 7 === 6 && Math.random() > 0.5) {
      name += ' ' + String.fromCharCode(65 + Math.floor(Math.random() * 26))
      i += 2
      continue
    }
    name += String.fromCharCode(97 + Math.floor(Math.random() * 26))
  }

  return name
}

const wvwMaps = [
  'Armistice Bastion',
  'Blue Alpine Borderlands',
  'Edge of the Mists',
  'Eternal Battlegrounds',
  'Green Alpine Borderlands',
  'Obsidian Sanctum',
  'Red Desert Borderlands'
]

const professions = [
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

export function generateEncounters (count, user) {
  const encounters = []

  for (let i = 0; i < count; i++) {
    const userDps = randInt(100, 5000)

    let encounterDps = userDps

    const players = [{
      account: user,
      boons: {
        alacrity: randFloat(20, 60),
        fury: randFloat(45, 96),
        might: randFloat(6, 23),
        protection: randFloat(50, 100),
        quickness: randFloat(20, 55),
        resolution: randFloat(50, 100),
        vigor: randFloat(33, 75)
      },
      character: randName(),
      dps: userDps,
      group: 1,
      profession: professions[randInt(0, 35)]
    }]

    for (let p = 0; p < 9; p++) {
      const playerDps = randInt(100, 5000)

      encounterDps += playerDps

      players.push({
        account: `${randName()}.${randInt(1000, 9999)}`,
        boons: {
          alacrity: randFloat(20, 60),
          fury: randFloat(45, 96),
          might: randFloat(6, 23),
          protection: randFloat(50, 100),
          quickness: randFloat(20, 55),
          resolution: randFloat(50, 100),
          vigor: randFloat(33, 75)
        },
        character: randName(),
        dps: playerDps,
        group: p < 4 ? 1 : 2,
        profession: professions[randInt(0, 35)]
      })
    }

    encounters.push({
      insertOne: {
        document: {
          boss_id: 1,
          date: new Date(
            2023,
            randInt(0, 11),
            randInt(1, 28),
            randInt(0, 23),
            randInt(0, 59),
            randInt(0, 59)
          ),
          permalink: `#test${i}`,
          success: true,
          duration: randInt(30, 300),
          details: {
            dps: encounterDps,
            wvw_map: wvwMaps[randInt(0, 6)],
            players
          }
        }
      }
    })
  }

  return encounters
}
