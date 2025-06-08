const url ="https://api.tvmaze.com/shows/84/episodes?specials=1";
const txtinfo = document.getElementById("txtinfo");
function getEpisode(){
    fetch(url)
        .then(response=>{
            if(response.ok){
                return response.json();
            }else{
                throw new Error('API request failed');
            }
        })
        .then(data =>{
            const totalEpisodes = data.length;
            let episodeNum = Math.floor(Math.random() * totalEpisodes);
            let episode = data[episodeNum];

            txtinfo.innerHTML=`<h2>${episode.name},     Season: ${episode.season} 
             Episode: ${episode.number}</h2>
             <img src="${episode.image.medium}" alt="${episode.name}"/>
                \n ${episode.summary}
            `;

            
        })
    .catch(error => {
        console.error(error); 
    });
}