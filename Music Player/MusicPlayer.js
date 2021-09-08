const music_button = document.querySelector('audio');
const play_button = document.getElementById('play');
const img = document.querySelector('img');
const artist = document.getElementById('artist');
const title = document.getElementById('song_title');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
let progress = document.getElementById('progress');
let current_time = document.getElementById('current_time');
let song_duration = document.getElementById('duration');
let isPlaying = false;

// accessing the song by creating an array of objects

const songs =[
    {
        name:"otnicka_peaky",
        title:"Peaky Blinder",
        artist :"Otnicka",
       
    },
    {
        name:"Runaway",
        title:"Runaway",
        artist : "Aurora",

    },

    {
        name:"Babel",
        title:"Babel",
        artist : "Gustavo Bravetty",
    },

    {
        name:"Astronaut",
        title:"Astronaut in the Ocean",
        artist : "Masked Wolf",
    },
    
];

// play
const playMusic = ()=>{

    isPlaying = true;
    music_button.play();
    play_button.classList.replace("fa-play","fa-pause");
    img.classList.add("anime");

}

// Pause
const pauseMusic = ()=>
{
    isPlaying = false;
    music_button.pause();
    play_button.classList.replace("fa-pause","fa-play");
    img.classList.remove("anime");
}

play_button.addEventListener('click', ()=>{

    // if isplaying is true then pause else play
    if(isPlaying)
    {
       pauseMusic();
    }
    else{
        playMusic();
    }
})


const loadSong = (songs)=>
{
    title.textContent= songs.title;
    artist.textContent = songs.artist;
    music_button.src = `Music/${songs.name}.mp3`;
    img.src =`images/${songs.name}.JPG`;
}

// Load Music
let songIndex = 0;
const nextSong = ()=>
{
    songIndex = (songIndex+1) % (songs.length);
    loadSong(songs[songIndex]);
    playMusic();
}

const prevSong = () =>
{
    songIndex = (songIndex-1 + songs.length) % songs.length;
    loadSong(songs[songIndex]);
playMusic();

}

// PROGRESS BAR 

// we want to update the time of the song on progress bar so thats why have to use the - timeupdate event
music_button.addEventListener('timeupdate',(event)=>{
   
     const {duration,currentTime} = event.srcElement;
    let progress_time = (currentTime / duration)*100;
    progress.style.width=`${progress_time}%`;
    
    // Music duration Update

        // for duration
    let min_duration = Math.floor(duration / 60);
    let sec_duration = Math.floor(duration % 60);
    let tot_duration = `${min_duration}:${sec_duration}`;
    if(duration) // for this statement we wont get NAN 
    {   
    song_duration.textContent = `${tot_duration}`;
        }


        //for current time
    let current_sec = Math.floor(currentTime%60);
    let current_min = Math.floor(currentTime / 60); 
    let curr_duration = `${current_min}:${current_sec}`;
    
    current_time.textContent = `${curr_duration}`;


     //when songs end stop the effect
    /* when the music is ended we can simply stop our Music player by using this following steps */
    /*
     if(curr_duration == tot_duration)
     {
        
         song_duration.textContent= `${tot_duration}`;
         current_time.textContent=`0:0`;
         progress.style.width=`0%`;
         pauseMusic();
     }
*/

/*
    or we can call run our next song >> we have a event "ended" which stops the song automatically */
});

 
music_button.addEventListener('ended',nextSong);
 
next.addEventListener("click",nextSong);

prev.addEventListener("click",prevSong);

