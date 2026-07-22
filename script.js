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

    playing = true;

    music.play().then(()=>{

        musicBtn.innerHTML="🔊";

        musicBtn.classList.add("playing");

    }).catch(()=>{

        playing=true;

    });

}

function stopMusic(){

    if(!music) return;

    playing=false;

    music.pause();

    musicBtn.innerHTML="🎵";

    musicBtn.classList.remove("playing");

}


//==================================================
// ENVELOPE HOVER
//==================================================

if(window.matchMedia("(hover:hover)").matches){

    envelope.addEventListener("mouseenter",()=>{

        if(opened) return;

        envelope.animate([

            {

                transform:"translateY(0px)"

            },

            {

                transform:"translateY(-10px)"

            }

        ],{

            duration:400,

            easing:"ease-out",

            fill:"forwards"

        });

    });

    envelope.addEventListener("mouseleave",()=>{

        if(opened) return;

        envelope.animate([

            {

                transform:"translateY(-10px)"

            },

            {

                transform:"translateY(0px)"

            }

        ],{

            duration:400,

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

    // Music (may be blocked on iPhone)
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

    // Glow before breaking

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

        duration:400,

        fill:"forwards"

    });

    // Break animation

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

                transform:"translateX(-50%) scale(.15) rotate(280deg)",

                opacity:0

            }

        ],{

            duration:450,

            easing:"ease-in-out",

            fill:"forwards"

        });

    },400);

    // Open envelope after seal breaks

    setTimeout(()=>{

        openEnvelope();

    },800);

}

//==================================================
// OPEN ENVELOPE
//==================================================

function openEnvelope(){

    // Open the flap

    flap.animate([

        {

            transform:"rotateX(0deg)"

        },

        {

            transform:"rotateX(280deg)"

        }

    ],{

        duration:1200,

        easing:"ease-in-out",

        fill:"forwards"

    });

    // Pull the invitation out

    setTimeout(()=>{

        letter.animate([

            {

                transform:"translateY(130px)"

            },

            {

                transform:"translateY(-190px)"

            }

        ],{

            duration:1200,

            easing:"cubic-bezier(.2,.9,.25,1)",

            fill:"forwards"

        });

    },280);

    // Envelope glow

    envelope.animate([

        {

            filter:"drop-shadow(0 20px 40px rgba(0,0,0,.15))"

        },

        {

            filter:"drop-shadow(0 35px 80px rgba(212,175,55,.30))"

        }

    ],{

        duration:1200,

        fill:"forwards"

    });

    // Continue animation

    setTimeout(showInvitation,11200);

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

        duration:1200,

        easing:"ease-in-out",

        fill:"forwards"

    });

    setTimeout(()=>{

        hero.style.display="none";

        invitation.style.display="flex";
        setTimeout(()=>{

    invitation.scrollIntoView({

        behavior:"smooth",

        block:"center"

    });

},450);

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

            duration:1300,

            easing:"ease-out",

            fill:"forwards"

        });



    },1200);

}


//==================================================
// SCROLL REVEAL
//==================================================

const observer = new IntersectionObserver(entries=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.animate([

                {

                    opacity:0,

                    transform:"translateY(30px)"

                },

                {

                    opacity:1,

                    transform:"translateY(0)"

                }

            ],{

                duration:1200,

                easing:"ease-out",

                fill:"forwards"

            });

        }

    });

},{threshold:0.15});


//==================================================
// REGISTER ELEMENTS
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

const heart=document.querySelector(".card h1 span");

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

            duration:1200,

            easing:"ease-in-out"

        });

    },2200);

}


//==================================================
// BUTTON HOVER (Desktop Only)
//==================================================

if(window.matchMedia("(hover:hover)").matches){

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

}


//==================================================
// CARD GLOW
//==================================================

const card=document.querySelector(".card");

if(card){

    setInterval(()=>{

        card.animate([

            {

                boxShadow:

                "0 35px 80px rgba(0,0,0,.12)"

            },

            {

                boxShadow:

                "0 45px 110px rgba(212,175,55,.20)"

            },

            {

                boxShadow:

                "0 35px 80px rgba(0,0,0,.12)"

            }

        ],{

            duration:4500

        });

    },5000);

}


//==================================================
// IMAGE PRELOAD
//==================================================

[
"assets/images/paper.png",
"assets/images/stamp.png",
"assets/images/corner.png",
"assets/images/leaf1.png",
"assets/images/leaf2.png",
"assets/images/leaf3.png",
"assets/images/leaf4.png",

"assets/images/peony3.png",
"assets/images/peony4.png"

].forEach(src=>{

    const img=new Image();

    img.src=src;

});


//==================================================
// GOLD PARTICLES
//==================================================

const particleContainer=document.querySelector(".gold-particles");

function createParticle(){

    const p=document.createElement("div");

    p.className="particle";

    p.style.left=Math.random()*100+"vw";

    p.style.animationDuration=(3+Math.random()*2)+"s";

    p.style.opacity=.3+Math.random()*.6;

    particleContainer.appendChild(p);

    setTimeout(()=>{

        p.remove();

    },6000);

}

setInterval(createParticle,120);


//==================================================
// FLOATING FLOWERS
//==================================================

const flowerContainer=document.querySelector(".floating-flowers");

const flowerImages=[


"assets/images/leaf1.png",
"assets/images/leaf2.png",
"assets/images/leaf3.png",
"assets/images/leaf4.png"

];

function createFlower(){

    const img=document.createElement("img");

    img.className="floatingFlower";

    img.src=flowerImages[

        Math.floor(

            Math.random()*flowerImages.length

        )

    ];

    img.style.left=Math.random()*100+"vw";

    img.style.width=(55+Math.random()*35)+"px";

    img.style.opacity=.12+Math.random()*.15;

    img.style.animationDuration=(5+Math.random()*2)+"s";

    img.style.transform=

        `rotate(${Math.random()*360}deg)`;

    flowerContainer.appendChild(img);

    setTimeout(()=>{

        img.remove();

    },8000);

}

setInterval(createFlower,500);


//==================================================
// REMOVE RIGHT CLICK
//==================================================

document.querySelectorAll(

".envFlowerLeft,.envFlowerRight,.flowerTop,.flowerBottom"

).forEach(img=>{

    img.addEventListener("contextmenu",e=>{

        e.preventDefault();

    });

});


//==================================================
// READY
//==================================================

console.log(

"%cWedding Invitation Loaded 🌸",

"color:#b88b2b;font-size:15px;font-weight:bold;"

);

