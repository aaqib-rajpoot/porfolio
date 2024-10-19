document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loading-screen');
    const loadingBeam = document.querySelector('.loading-beam');
    const loadingText = document.querySelector('.loading-text');
    const navItems = document.querySelectorAll('.nav-item');
    const planets = document.querySelectorAll('.planet');
    const analogBeamLeft = document.getElementById('analog-beam-left');
    const analogBeamRight = document.getElementById('analog-beam-right');
    const missionInfo = document.getElementById('mission-info');
    const infoPanel = document.getElementById('info-panel');
    const windowBar = infoPanel.querySelector('.window-bar');
    const progressBeam = infoPanel.querySelector('.progress-beam');

    // Simulated fast loading
    let loadProgress = 0;
    const loadingInterval = setInterval(() => {
        loadProgress += 5;
        if (loadProgress >= 100) {
            loadProgress = 100;
            clearInterval(loadingInterval);
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
        loadingBeam.style.width = `${loadProgress}%`;
        
        if (loadProgress < 33) {
            loadingText.textContent = "INITIALIZING";
        } else if (loadProgress < 66) {
            loadingText.textContent = "CALIBRATING";
        } else {
            loadingText.textContent = "LAUNCHING";
        }
    }, 100);

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const planetId = item.getAttribute('data-planet');
            navigateToPlanet(planetId);
        });
    });

    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('close-btn')) {
            const chip = e.target.closest('.chip');
            if (chip) {
                const planet = chip.closest('.planet');
                if (planet) {
                    planet.style.opacity = '0';
                    setTimeout(() => {
                        planet.style.display = 'none';
                    }, 500);
                }
            } else if (e.target.closest('#info-panel')) {
                document.getElementById('info-panel').style.display = 'none';
            }
        }
    });

    windowBar.addEventListener('click', function(e) {
        if (!e.target.classList.contains('close-btn')) {
            const rect = windowBar.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            progressBeam.style.setProperty('--beam-x', `${x}px`);
            progressBeam.style.setProperty('--beam-y', `${y}px`);

            // Restart the animations
            progressBeam.style.animation = 'none';
            progressBeam.offsetHeight; // Trigger reflow
            progressBeam.style.animation = null;
        }
    });

    function navigateToPlanet(planetId) {
        planets.forEach(planet => {
            planet.style.opacity = '0';
            setTimeout(() => {
                planet.style.display = 'none';
            }, 500);
        });

        analogBeamLeft.style.opacity = '1';
        analogBeamLeft.style.animation = 'moveBeamLeft 1s ease-in-out';
        analogBeamRight.style.opacity = '1';
        analogBeamRight.style.animation = 'moveBeamRight 1s ease-in-out';

        setTimeout(() => {
            const planet = document.getElementById(planetId);
            planet.style.display = 'flex';
            setTimeout(() => {
                planet.style.opacity = '1';
            }, 50);

            const delayedTexts = planet.querySelectorAll('.delayed-text');
            delayedTexts.forEach((text, index) => {
                setTimeout(() => {
                    text.style.opacity = '1';
                }, index * 200);
            });

            setTimeout(() => {
                analogBeamLeft.style.opacity = '0';
                analogBeamRight.style.opacity = '0';
                analogBeamLeft.style.animation = 'none';
                analogBeamRight.style.animation = 'none';
            }, 1000);
        }, 1000);

        updateMissionInfo(planetId);
    }

    function updateMissionInfo(planetId) {
        const messages = {
            about: "Accessing personal data banks...",
            projects: "Loading project schematics...",
            skills: "Compiling skill matrix...",
            contact: "Establishing secure communication channel...",
            blog: "Retrieving latest thought processes..."
        };
        missionInfo.textContent = messages[planetId] || "Unknown sector...";
    }
});
