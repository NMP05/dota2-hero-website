const grid = document.getElementById("heroGrid")
// Fetch all heroes from OpenDota API
fetch("https://api.opendota.com/api/heroes")
.then(response => response.json())
.then(heroes => {

    heroes.forEach(hero => {
        const card = document.createElement("div")
        card.className = "heroCard"

        card.innerHTML = `
            <img src="https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${hero.name.replace('npc_dota_hero_','')}.png">
            <p>${hero.localized_name}</p>
        `

        card.onclick = () => {
            window.location = `hero.html?hero=${hero.id}&name=${hero.localized_name}`
        }

        grid.appendChild(card)
    })

})
.catch(err => console.error("Error fetching heroes:", err))
