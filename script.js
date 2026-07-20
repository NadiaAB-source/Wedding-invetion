//==================================================
// ELEMENTS
//==================================================

const hero = document.getElementById("hero");

const envelope = document.querySelector(".envelope");

const flap = document.querySelector(".flap");

const seal = document.querySelector(".seal");

const letter = document.querySelector(".letter");

const invitation = document.getElementById("invitation");

const music = document.getElementById("music");

const openSound = document.getElementById("openSound");

const musicBtn = document.getElementById("musicBtn");

let opened = false;

let playing = false;


//==================================================
// MUSIC
//==================================================

music.volume = .35;

function startMusic(){

    if(playing) return;

    playing = true;

    music.play().catch(()=>{});

    musicBtn.innerHTML="🔊";

    musicBtn.classList.add("playing");

}

function stopMusic(){

    playing = false;

    music.pause();

    musicBtn.innerHTML="🎵";

    musicBtn.classList.remove("playing");

}

musicBtn.addEventListener("click",()=>{

    if(playing){

        stopMusic();

    }

    else{

        startMusic();

    }

});


//==================================================
// ENVELOPE HOVER
//==================================================

envelope.addEventListener("mouseenter",()=>{

    if(opened) return;

    envelope.animate([

        {

            transform:"translateY(0px)"

        },

        {

            transform:"translateY(-12px)"

        }

    ],{

        duration:350,

        fill:"forwards",

        easing:"ease-out"

    });

});


envelope.addEventListener("mouseleave",()=>{

    if(opened) return;

    envelope.animate([

        {

            transform:"translateY(-12px)"

        },

        {

            transform:"translateY(0px)"

        }

    ],{

        duration:350,

        fill:"forwards"

    });

});


//==================================================
// CLICK ONLY THE SEAL
//==================================================

seal.addEventListener("click",()=>{

    if(opened) return;

    opened = true;

    envelope.style.pointerEvents="none";

    startMusic();

    if(openSound){

        openSound.currentTime = 0;

        openSound.play().catch(()=>{});

    }

    breakSeal();

});


//==================================================
// BREAK SEAL
//==================================================

function breakSeal(){

    seal.animate([

        {

            transform:"translateX(-50%) scale(1)",

            opacity:1

        },

        {

            transform:"translateX(-50%) scale(1.2)",

            opacity:1

        },

        {

            transform:"translateX(-50%) scale(.2) rotate(180deg)",

            opacity:0

        }

    ],{

        duration:800,

        easing:"ease-in-out",

        fill:"forwards"

    });

    setTimeout(openEnvelope,500);

}

//==================================================
// OPEN ENVELOPE
//==================================================

function openEnvelope(){

    // Open flap

    flap.animate([

        {

            transform:"rotateX(0deg)"

        },

        {

            transform:"rotateX(180deg)"

        }

    ],{

        duration:1000,

        easing:"ease-in-out",

        fill:"forwards"

    });

    // Pull invitation card

    setTimeout(()=>{

        letter.animate([

            {

                transform:"translateY(130px)"

            },

            {

                transform:"translateY(-185px)"

            }

        ],{

            duration:1800,

            easing:"cubic-bezier(.18,.85,.25,1)",

            fill:"forwards"

        });

    },450);

    // Glow envelope

    envelope.animate([

        {

            filter:"drop-shadow(0 20px 40px rgba(0,0,0,.15))"

        },

        {

            filter:"drop-shadow(0 30px 70px rgba(212,175,55,.35))"

        }

    ],{

        duration:1400,

        fill:"forwards"

    });

    // Continue

    setTimeout(showInvitation,2600);

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

            transform:"scale(.96)"

        }

    ],{

        duration:900,

        fill:"forwards",

        easing:"ease-in"

    });

    setTimeout(()=>{

        hero.style.display="none";

        invitation.style.display="flex";

        invitation.animate([

            {

                opacity:0,

                transform:"translateY(120px)"

            },

            {

                opacity:1,

                transform:"translateY(0px)"

            }

        ],{

            duration:1600,

            easing:"ease-out",

            fill:"forwards"

        });

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    },900);

}



//==================================================
// CARD ENTRANCE
//==================================================

const observer = new IntersectionObserver(entries=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.animate([

                {

                    opacity:0,

                    transform:"translateY(35px)"

                },

                {

                    opacity:1,

                    transform:"translateY(0)"

                }

            ],{

                duration:800,

                easing:"ease-out",

                fill:"forwards"

            });

        }

    });

},{threshold:.15});



//==================================================
// OBSERVE ELEMENTS
//==================================================

window.addEventListener("load",()=>{

    document.querySelectorAll(

        ".card h1,.card h2,.card h3,.card h4,.card p,.divider,.info,.notes,.dua,.buttons"

    ).forEach(el=>{

        observer.observe(el);

    });

});



//==================================================
// HEART ANIMATION
//==================================================

const heart = document.querySelector(".card h1 span");

if(heart){

    setInterval(()=>{

        heart.animate([

            {
                transform:"scale(1)"
            },

            {
                transform:"scale(1.25)"
            },

            {
                transform:"scale(1)"
            }

        ],{

            duration:900,

            easing:"ease-in-out"

        });

    },2200);

}


//==================================================
// BUTTON EFFECT
//==================================================

document.querySelectorAll(".btn").forEach(btn=>{

    btn.addEventListener("mouseenter",()=>{

        btn.animate([

            {
                transform:"translateY(0px) scale(1)"
            },

            {
                transform:"translateY(-6px) scale(1.04)"
            }

        ],{

            duration:220,

            fill:"forwards"

        });

    });

    btn.addEventListener("mouseleave",()=>{

        btn.animate([

            {
                transform:"translateY(-6px) scale(1.04)"
            },

            {
                transform:"translateY(0px) scale(1)"
            }

        ],{

            duration:220,

            fill:"forwards"

        });

    });

});


//==================================================
// CARD SHADOW
//==================================================

const card = document.querySelector(".card");

if(card){

    setInterval(()=>{

        card.animate([

            {

                boxShadow:

                "0 35px 80px rgba(0,0,0,.12)"

            },

            {

                boxShadow:

                "0 45px 110px rgba(212,175,55,.18)"

            },

            {

                boxShadow:

                "0 35px 80px rgba(0,0,0,.12)"

            }

        ],{

            duration:5000

        });

    },5200);

}


//==================================================
// HERO PARALLAX
//==================================================

document.addEventListener("mousemove",(e)=>{

    if(opened) return;

    const x=(window.innerWidth/2-e.clientX)/80;

    const y=(window.innerHeight/2-e.clientY)/80;

    envelope.style.transform=

    `rotateY(${x}deg)
     rotateX(${-y}deg)`;

});

document.addEventListener("mouseleave",()=>{

    if(opened) return;

    envelope.style.transform=

    "rotateX(0deg) rotateY(0deg)";

});


//==================================================
// DISABLE RIGHT CLICK ON DECORATIONS
//==================================================

document.querySelectorAll(

".envFlowerLeft,.envFlowerRight,.flowerTop,.flowerBottom"

).forEach(img=>{

    img.addEventListener("contextmenu",(e)=>{

        e.preventDefault();

    });

});


//==================================================
// PRELOAD IMAGES
//==================================================

[
"assets/images/paper.png",
"assets/images/stamp.png",
"assets/images/leaf1.png",
"assets/images/leaf2.png",
"assets/images/leaf3.png",
"assets/images/leaf4.png",
"assets/images/peony1.png",
"assets/images/peony2.png",
"assets/images/peony3.png",
"assets/images/peony4.png",
"assets/images/corner.png"

].forEach(src=>{

    const img=new Image();

    img.src=src;

});


//==================================================
// END
//==================================================

console.log(

"%cLuxury Wedding Invitation Ready 🌸",

"color:#b88b2b;font-size:16px;font-weight:bold;"

);



//==================================================
// GOLD SPARKLES
//==================================================

const particleContainer=document.querySelector(".gold-particles");

function createParticle(){

    const p=document.createElement("div");

    p.className="particle";

    p.style.left=Math.random()*100+"vw";

    p.style.animationDuration=(3+Math.random()*2)+"s";

    p.style.opacity=.3+Math.random()*.6;

    particleContainer.appendChild(p);

    setTimeout(()=>p.remove(),12000);

}

setInterval(createParticle,200);


//==================================================
// FLOATING FLOWERS
//==================================================

const flowerContainer=document.querySelector(".floating-flowers");

const flowers=[

"assets/images/peony1.png",
"assets/images/peony2.png",
"assets/images/leaf1.png",
"assets/images/leaf4.png"

];

function createFlower(){

    const img=document.createElement("img");

    img.src=flowers[Math.floor(Math.random()*flowers.length)];

    img.className="floatingFlower";

    img.style.left=Math.random()*100+"vw";

    img.style.width=(40+Math.random()*35)+"px";

    img.style.animationDuration=(5+Math.random()*3)+"s";

    img.style.transform=`rotate(${Math.random()*360}deg)`;

    flowerContainer.appendChild(img);

    setTimeout(()=>img.remove(),30000);

}

setInterval(createFlower,1500);