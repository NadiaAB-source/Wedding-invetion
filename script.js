//==================================================
// ELEMENTS
//==================================================

const hero = document.getElementById("hero");
const invitation = document.getElementById("invitation");

const envelope = document.querySelector(".envelope");
const flap = document.querySelector(".flap");
const seal = document.querySelector(".seal");
const letter = document.querySelector(".letter");

const music = document.getElementById("music");
const openSound = document.getElementById("openSound");
const musicBtn = document.getElementById("musicBtn");

let opened = false;
let playing = false;


//==================================================
// MUSIC
//==================================================

if(music){

    music.volume = 0.35;

}

function startMusic(){

    if(playing || !music) return;

    music.play().then(()=>{

        playing = true;

        musicBtn.innerHTML = "🔊";

        musicBtn.classList.add("playing");

    }).catch(()=>{

        playing = false;

    });

}

function stopMusic(){

    if(!music) return;

    playing = false;

    music.pause();

    music.currentTime = 0;

    musicBtn.innerHTML = "🎵";

    musicBtn.classList.remove("playing");

}

musicBtn.addEventListener("click",()=>{

    if(playing){

        stopMusic();

    }else{

        startMusic();

    }

});


//==================================================
// ENVELOPE HOVER
//==================================================

if(window.matchMedia("(hover:hover)").matches){

    envelope.addEventListener("mouseenter",()=>{

        if(opened) return;

        envelope.animate([

            { transform:"translateY(0)" },

            { transform:"translateY(-10px)" }

        ],{

            duration:300,

            easing:"ease-out",

            fill:"forwards"

        });

    });

    envelope.addEventListener("mouseleave",()=>{

        if(opened) return;

        envelope.animate([

            { transform:"translateY(-10px)" },

            { transform:"translateY(0)" }

        ],{

            duration:300,

            fill:"forwards"

        });

    });

}


//==================================================
// AUTO START
//==================================================

window.addEventListener("load",()=>{

    setTimeout(()=>{

        openInvitation();

    },600);

});


//==================================================
// START SEQUENCE
//==================================================

function openInvitation(){

    if(opened) return;

    opened = true;

    envelope.style.pointerEvents = "none";

    startMusic();

    if(openSound){

        openSound.currentTime = 0;

        openSound.play().catch(()=>{});

    }

    breakSeal();

}


//==================================================
// BREAK SEAL
//==================================================

function breakSeal(){

    // Glow

    seal.animate([

        {

            transform:"translateX(-50%) scale(1)",

            filter:"drop-shadow(0 0 0 rgba(212,175,55,0))"

        },

        {

            transform:"translateX(-50%) scale(1.08)",

            filter:"drop-shadow(0 0 20px rgba(212,175,55,.8))"

        }

    ],{

        duration:300,

        fill:"forwards"

    });

    // Break

    setTimeout(()=>{

        seal.animate([

            {

                transform:"translateX(-50%) scale(1.08) rotate(0deg)",

                opacity:1

            },

            {

                transform:"translateX(-50%) scale(.9) rotate(-10deg)",

                opacity:1

            },

            {

                transform:"translateX(-50%) scale(.15) rotate(180deg)",

                opacity:0

            }

        ],{

            duration:350,

            easing:"ease-in-out",

            fill:"forwards"

        });

    },300);

    // Open envelope

    setTimeout(()=>{

        openEnvelope();

    },650);

}


//==================================================
// OPEN ENVELOPE
//==================================================

function openEnvelope(){

    // Flap

    flap.animate([

        {

            transform:"rotateX(0deg)"

        },

        {

            transform:"rotateX(180deg)"

        }

    ],{

        duration:700,

        easing:"ease-in-out",

        fill:"forwards"

    });

    // Letter

    setTimeout(()=>{

        letter.animate([

            {

                transform:"translateY(130px)"

            },

            {

                transform:"translateY(-190px)"

            }

        ],{

            duration:700,

            easing:"cubic-bezier(.2,.9,.25,1)",

            fill:"forwards"

        });

    },180);

    // Glow

    envelope.animate([

        {

            filter:"drop-shadow(0 20px 40px rgba(0,0,0,.15))"

        },

        {

            filter:"drop-shadow(0 35px 80px rgba(212,175,55,.30))"

        }

    ],{

        duration:900,

        fill:"forwards"

    });

    // Continue

    setTimeout(showInvitation,1700);

}

//==================================================
// SHOW INVITATION
//==================================================

function showInvitation(){

    hero.animate([

        {

            opacity:1,

            transform:"scale(1)"

        },

        {

            opacity:0,

            transform:"scale(.97)"

        }

    ],{

        duration:700,

        easing:"ease-in-out",

        fill:"forwards"

    });

    setTimeout(()=>{

        hero.style.display = "none";

        invitation.style.display = "flex";

        invitation.animate([

            {

                opacity:0,

                transform:"translateY(80px)"

            },

            {

                opacity:1,

                transform:"translateY(0)"

            }

        ],{

            duration:1000,

            easing:"ease-out",

            fill:"forwards"

        });

        setTimeout(()=>{

            invitation.scrollIntoView({

                behavior:"smooth",

                block:"center"

            });

        },250);

    },700);

}
