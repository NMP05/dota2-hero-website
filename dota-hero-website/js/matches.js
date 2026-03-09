const params = new URLSearchParams(window.location.search)

const heroID = params.get("hero")
const heroName = params.get("name")

document.getElementById("heroTitle").innerText = "Hero: " + heroName
document.getElementById("heroImage").src = `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${heroName.toLowerCase().replace(/ /g, "_")}.png`;

// Load matches when button is clicked
async function loadMatches() {

    const playerID = document.getElementById("playerID").value
    if (!playerID) {
        alert("Please enter Player ID")
        return
    }

    const url = `https://api.opendota.com/api/players/${playerID}/matches?hero_id=${heroID}`

    const response = await fetch(url)
    const matches = await response.json()

    displayMatches(matches)
    
    async function loadPlayerProfile(playerID) {
        const url = `https://api.opendota.com/api/players/${playerID}`
        const response = await fetch(url)
        const profile = await response.json()

        const profileDiv = document.createElement("div")
        profileDiv.style.margin = "20px 0"
        profileDiv.innerHTML = `
        <h3>Player Profile</h3>
        <p><strong>Name:</strong> ${profile.profile?.personaname || "Unknown"}</p>
        <p><strong>MMR Estimate:</strong> ${profile.mmr_estimate?.estimate || "N/A"}</p>
        <p><strong>Total Wins:</strong> ${profile.wins || "N/A"}</p>
        <p><strong>Total Losses:</strong> ${profile.losses || "N/A"}</p>
    `
        document.body.prepend(profileDiv)
    }

    loadPlayerProfile(playerID)
}



//display matches win/lose
function displayMatches(matches) {
    const container = document.getElementById("matches")
    container.innerHTML = ""

    matches.slice(0, 10).forEach(match => {
        const win = (match.player_slot < 128 && match.radiant_win) ||
            (match.player_slot >= 128 && !match.radiant_win)
        const resultText = win ? "WIN" : "LOSE"
        const resultClass = win ? "winBadge" : "loseBadge"

        const card = document.createElement("div")
        card.className = "matchCard"

        const heroImg = document.createElement("img")
        heroImg.className = "matchHeroImg"
        heroImg.src = `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${heroName.toLowerCase().replace(/ /g, "_")}.png`

        const info = document.createElement("div")
        info.className = "matchInfo"
        info.innerHTML = `
            <p><strong>Kills:</strong> ${match.kills} &nbsp; 
               <strong>Deaths:</strong> ${match.deaths} &nbsp; 
               <strong>Assists:</strong> ${match.assists}</p>
        `

        const resultBadge = document.createElement("div")
        resultBadge.className = resultClass
        resultBadge.innerText = resultText

        card.appendChild(heroImg)
        card.appendChild(info)
        card.appendChild(resultBadge)

        container.appendChild(card)
    })
}

//display winrate
function displayMatches(matches) {
    const container = document.getElementById("matches")
    container.innerHTML = ""

    if (matches.length === 0) {
        container.innerHTML = "<p>No matches found for this hero.</p>"
        return
    }

    let wins = 0

    matches.slice(0, 10).forEach(match => {
        const win = (match.player_slot < 128 && match.radiant_win) ||
            (match.player_slot >= 128 && !match.radiant_win)
        if (win) wins++

        const resultText = win ? "WIN" : "LOSE"
        const resultClass = win ? "winBadge" : "loseBadge"

        const card = document.createElement("div")
        card.className = "matchCard"

        const heroImg = document.createElement("img")
        heroImg.className = "matchHeroImg"
        heroImg.src = `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${heroName.toLowerCase().replace(/ /g, "_")}.png`

        const info = document.createElement("div")
        info.className = "matchInfo"
        info.innerHTML = `
            <p><strong>Kills:</strong> ${match.kills} &nbsp; 
               <strong>Deaths:</strong> ${match.deaths} &nbsp; 
               <strong>Assists:</strong> ${match.assists}</p>
        `

        const resultBadge = document.createElement("div")
        resultBadge.className = resultClass
        resultBadge.innerText = resultText

        card.appendChild(heroImg)
        card.appendChild(info)
        card.appendChild(resultBadge)

        container.appendChild(card)
    })

    // Show win rate
    const winRate = ((wins / matches.slice(0, 10).length) * 100).toFixed(1)
    const rateDiv = document.createElement("div")
    rateDiv.innerHTML = `<h3>Win Rate: ${winRate}%</h3>`
    rateDiv.style.margin = "20px 0"
    container.prepend(rateDiv)
}