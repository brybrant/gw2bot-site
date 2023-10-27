import { professions, weapons, wvwMaps } from './encounterSchema'

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

function getWeapon (index) {
  if (Math.random() > 0.5) {
    return [
      weapons.twoHand[randInt(0, weapons.twoHand.length - 1)],
      ...index === 1 ? ['2Hand'] : []
    ]
  } else {
    return [
      weapons.oneHand[randInt(0, 5)],
      weapons.oneHand[randInt(1, weapons.oneHand.length - 1)]
    ]
  }
}

export function generateEncounters (count, user) {
  const encounters = []

  for (let i = 0; i < count; i++) {
    const duration = randInt(30, 300)

    let encounterDps = 0

    const players = []

    for (let p = 0; p < 10; p++) {
      const playerDps = randInt(100, 5000)

      encounterDps += playerDps

      players.push({
        account: p === 0 ? user : `${randName()}.${randInt(1000, 9999)}`,
        attributes: {
          condition: Math.random() > 0.7,
          concentration: Math.random() > 0.8,
          healing: Math.random() > 0.8,
          toughness: Math.random() > 0.9
        },
        ...{
          alacrity: randFloat(20, 60),
          fury: randFloat(45, 96),
          might: randFloat(6, 23),
          protection: randFloat(50, 100),
          quickness: randFloat(20, 55),
          resistance: randFloat(10, 80),
          resolution: randFloat(50, 94),
          vigor: randFloat(33, 75)
        },
        character: randName(),
        dps: playerDps,
        group: p < 5 ? 1 : 2,
        profession: professions[randInt(0, professions.length - 1)],
        ...{
          absorbed: Math.round(randFloat(50, 250) * duration),
          blocked: Math.round(duration / randFloat(2, 8)),
          cleanses: Math.round(duration / randFloat(0.5, 10)),
          evades: Math.round(duration / randFloat(10, 20)),
          resurrects: Math.round(duration / randFloat(50, 300)),
          strips: Math.round(duration / randFloat(0.5, 10))
        },
        weapons: [
          ...getWeapon(1),
          ...getWeapon(2)
        ]
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
          duration,
          details: {
            dps: encounterDps,
            wvw_map: wvwMaps[randInt(0, wvwMaps.length - 1)],
            players
          }
        }
      }
    })
  }

  return encounters
}
