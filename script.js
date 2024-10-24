document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loading-screen');
    const loadingBeam = document.querySelector('.loading-beam');
    const navItems = document.querySelectorAll('.nav-item');
    const windowContainer = document.getElementById('window-container');
    const addWindowBtn = document.getElementById('add-window');
    const openWindows = document.getElementById('open-windows');
    const missionInfo = document.getElementById('mission-info');
    const infoPanel = document.getElementById('info-panel');
    const windowBar = infoPanel.querySelector('.window-bar');
    const progressBeam = infoPanel.querySelector('.progress-beam');
    const leftBeam = document.getElementById('analog-beam-left');
    const rightBeam = document.getElementById('analog-beam-right');
    const profileWindow = document.querySelector('.profile-chip');
    const windows = document.querySelectorAll('.window:not(.profile-chip)');

    // Simulated loading
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
    }, 100);

    // Window management
    const windowsData = {
        profile: {
            title: 'Profile',
            content: `
                <div class="profile-chip">
                    <div class="window-bar">
                        <div class="window-title">Profile</div>
                    </div>
                    <div class="chip-content">
                        <img src="images/profile.png" alt="Aaqib Rajput" class="profile-image">
                    </div>
                </div>
            `
        },
        about: {
            title: 'About Me',
            content: `
                <div class="about-info">
                    <h2>AAQIB RAJPUT</h2>
                    <p>Karachi | +923133606015 | aaqibrajpoot09@gmail.com</p>
                    <h3>SUMMARY</h3>
                    <p>Computer Science graduate with a strong foundation in Front-End Development, skilled in building responsive, user-friendly websites using HTML, CSS, and JavaScript.</p>
                    <h3>EXPERIENCE</h3>
                    <p>Front-end Developer at 99webdesigns.net - Karachi, Pakistan (Jan to May 2024)</p>
                    
                    <p>UI/UX DESIGNER Intern at NFTP QUEST - Nawabshah, SD (Mar to Aug 2023)</p>
                    
                    
                    <h3>EDUCATION</h3>
                    <p>Certification in Graphic Designing from NFTP QUEST - Nawabshah, SD (Mar to Oct 2022)</p>
                    <p>Bachelor in Computer Science from Quaid e Awam University - Nawabshah (Batch Oct 2019)</p>
                </div>
            `
        },
        skills: {
            title: 'Skills',
            content: `
                <div class="skills-container">
                    <div class="skill">HTML</div>
                    <div class="skill">CSS</div>
                    <div class="skill">JavaScript</div>
                    <div class="skill">React</div>
                    <div class="skill">C#</div>
                    <div class="skill">Asp.net</div>
                    <div class="skill">WebAPIs</div>
                    <div class="skill">SQL</div>
                    <div class="skill">git</div>
                    <div class="skill">docker</div>
                    <div class="skill">UI Design</div>
                </div>
            `
        },
        projects: {
            title: 'Projects',
            content: `
                <div class="projects-info">
                    <div class="project">
                        <h2>Wholesale Book Store</h2>
                        <p>My University Final Year Project (2023) helped me build a strong foundation in Front-End Development.</p>
                    </div>
                    <div class="project">
                        <h2>The Engineers Food Lab</h2>
                        <p>A Ecommerce Website for a Food Lab (2022) helped me learn about UI/UX Designing and Back-End Development.</p>
                    </div>
                    <div class="project">
                        <p>Unfortunately, both are offline due to non-payment of hosting fees.</p>
                    </div>
                </div>
            `
        },
        contact: {
            title: 'Contact',
            content: `
                <div class="contact-info">
                    <h3>Contact Me</h3>
                    <p>Email: <a href="https://mail.google.com/mail/?view=cm&fs=1&to=aaqibrajpoot09@gmail.com&su=Contact%20from%20Portfolio" target="_blank">Send Email via Gmail</a></p>
                    <p>LinkedIn: <a href="https://www.linkedin.com/in/aqib-rajput-4948a7199/" target="_blank">LinkedIn Profile</a></p>
                    <p>GitHub: <a href="https://github.com/aaqib-rajpoot" target="_blank">GitHub Profile</a></p>
                </div>
            `
        },
        missionlog: {
            title: 'Message Log',
            content: `
                <div id="mission-log">
                    <div id="log-entries"></div>
                    <div id="log-progress">
                        <div id="log-beam"></div>
                    </div>
                </div>
            `
        }
    };

    // const windowSequence = ['profile', 'about', 'skills', 'projects', 'contact'];
    // let currentWindowIndex = -1;

    function createWindow(id) {
        const windowData = windowsData[id];
        const window = document.createElement('div');
        window.className = 'window';
        window.id = `window-${id}`;

        // Set initial dimensions
        const initialWidth = 600;
        const initialHeight = 400;

        // Calculate center position
        const centerX = Math.max(0, Math.floor((document.documentElement.clientWidth - initialWidth) / 2));
        const centerY = Math.max(0, Math.floor((document.documentElement.clientHeight - initialHeight) / 2));

        window.style.width = `${initialWidth}px`;
        window.style.height = `${initialHeight}px`;
        window.style.left = `${centerX}px`;
        window.style.top = `${centerY}px`;

        window.innerHTML = `
            <div class="window-header">
                <div class="window-title">${windowData.title}</div>
                <div class="window-controls">
                    <button class="minimize">&minus;</button>
                    <button class="maximize">&#9633;</button>
                    <button class="close">&times;</button>
                </div>
            </div>
            <div class="window-content">${windowData.content}</div>
            <div class="resize-handle top-left"></div>
            <div class="resize-handle top-right"></div>
            <div class="resize-handle bottom-left"></div>
            <div class="resize-handle bottom-right"></div>
            <div class="resize-handle top"></div>
            <div class="resize-handle right"></div>
            <div class="resize-handle bottom"></div>
            <div class="resize-handle left"></div>
        `;
        windowContainer.appendChild(window);
        initializeWindow(window);
        
        if (id === 'missionlog') {
            initializeMissionLog();
        }
        
        updateMissionLog();
        
        return window;
    }

    function initializeWindow(win) {
        const header = win.querySelector('.window-header');
        const minimizeBtn = win.querySelector('.minimize');
        const maximizeBtn = win.querySelector('.maximize');
        const closeBtn = win.querySelector('.close');

        makeDraggable(win, header);
        makeResizable(win);

        minimizeBtn.addEventListener('click', () => minimizeWindow(win));
        maximizeBtn.addEventListener('click', () => maximizeWindow(win));
        closeBtn.addEventListener('click', () => closeWindow(win));

        addToTaskbar(win);
    }

    function makeDraggable(el, header) {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

        header.onmousedown = dragMouseDown;

        function dragMouseDown(e) {
            e.preventDefault();
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            e.preventDefault();
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            el.style.top = (el.offsetTop - pos2) + "px";
            el.style.left = (el.offsetLeft - pos1) + "px";
        }

        function closeDragElement() {
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }

    function makeResizable(el) {
        const resizeHandles = el.querySelectorAll('.resize-handle');
        
        resizeHandles.forEach(handle => {
            handle.addEventListener('mousedown', initResize);
        });

        function initResize(e) {
            e.stopPropagation();
            const startX = e.clientX;
            const startY = e.clientY;
            const startWidth = parseInt(getComputedStyle(el).width, 10);
            const startHeight = parseInt(getComputedStyle(el).height, 10);
            const startLeft = el.offsetLeft;
            const startTop = el.offsetTop;
            const handle = e.target;

            document.addEventListener('mousemove', resize);
            document.addEventListener('mouseup', stopResize);

            function resize(e) {
                if (handle.classList.contains('right') || handle.classList.contains('bottom-right') || handle.classList.contains('top-right')) {
                    const width = startWidth + (e.clientX - startX);
                    el.style.width = `${width}px`;
                }
                if (handle.classList.contains('bottom') || handle.classList.contains('bottom-right') || handle.classList.contains('bottom-left')) {
                    const height = startHeight + (e.clientY - startY);
                    el.style.height = `${height}px`;
                }
                if (handle.classList.contains('left') || handle.classList.contains('top-left') || handle.classList.contains('bottom-left')) {
                    const width = startWidth - (e.clientX - startX);
                    if (width > 200) {
                        el.style.width = `${width}px`;
                        el.style.left = `${startLeft + (e.clientX - startX)}px`;
                    }
                }
                if (handle.classList.contains('top') || handle.classList.contains('top-left') || handle.classList.contains('top-right')) {
                    const height = startHeight - (e.clientY - startY);
                    if (height > 150) {
                        el.style.height = `${height}px`;
                        el.style.top = `${startTop + (e.clientY - startY)}px`;
                    }
                }
            }

            function stopResize() {
                document.removeEventListener('mousemove', resize);
                document.removeEventListener('mouseup', stopResize);
            }
        }
    }

    function minimizeWindow(win) {
        win.style.display = 'none';
    }

    function maximizeWindow(win) {
        if (win.style.top === '0px' && win.style.left === '0px' && win.style.width === '100%' && win.style.height === '100%') {
            win.removeAttribute('style');
        } else {
            win.style.top = '0';
            win.style.left = '0';
            win.style.width = '100%';
            win.style.height = '100%';
        }
    }

    function closeWindow(win) {
        win.remove();
        removeFromTaskbar(win);
    }

    function addToTaskbar(win) {
        const title = win.querySelector('.window-title').textContent;
        const taskbarItem = document.createElement('div');
        taskbarItem.classList.add('taskbar-item');
        taskbarItem.textContent = title;
        taskbarItem.addEventListener('click', () => {
            win.style.display = 'flex';
            win.style.zIndex = getTopZIndex() + 1;
        });
        openWindows.appendChild(taskbarItem);
    }

    function removeFromTaskbar(win) {
        const title = win.querySelector('.window-title').textContent;
        const taskbarItems = openWindows.querySelectorAll('.taskbar-item');
        taskbarItems.forEach(item => {
            if (item.textContent === title) {
                item.remove();
            }
        });
    }

    function getTopZIndex() {
        const windows = document.querySelectorAll('.window');
        return Math.max(
            ...Array.from(windows, win => parseInt(win.style.zIndex) || 0)
        );
    }

    // Event listeners
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const windowId = item.getAttribute('data-window');
            const existingWindow = document.getElementById(`window-${windowId}`);
            if (existingWindow) {
                existingWindow.style.display = 'flex';
                existingWindow.style.zIndex = getTopZIndex() + 1;
            } else {
                createWindow(windowId);
            }
            // Update the currentWindowIndex when a specific window is opened
            // currentWindowIndex = windowSequence.indexOf(windowId);
        });
    });

    // function openNextWindow() {
    //     currentWindowIndex = (currentWindowIndex + 1) % windowSequence.length;
    //     const windowId = windowSequence[currentWindowIndex];
    //     const existingWindow = document.getElementById(`window-${windowId}`);
        
    //     if (existingWindow) {
    //         existingWindow.style.display = 'flex';
    //         existingWindow.style.zIndex = getTopZIndex() + 1;
    //     } else {
    //         createWindow(windowId);
    //     }
    // }

    // Initialize tooltip
    // document.getElementById('next-window-name').textContent = windowsData[windowSequence[0]].title;

    // addWindowBtn.addEventListener('click', openNextWindow);
    addWindowBtn.addEventListener('click', () => {
        const windowTypes = Object.keys(windowsData);
        const randomType = windowTypes[Math.floor(Math.random() * windowTypes.length)];
        createWindow(randomType);
    });

    function scrollMissionLogToBottom() {
        const missionLog = document.getElementById('mission-log');
        if (missionLog) {
            missionLog.scrollTop = missionLog.scrollHeight;
        }
    }

    const missionSteps = [
        { timestamp: "2023-06-01 09:00", message: "Mission started: Embarking on web development journey." },
        { timestamp: "2023-06-15 14:30", message: "Milestone: Completed first responsive website." },
        { timestamp: "2023-07-01 11:15", message: "New tech: Started learning React.js." },
        { timestamp: "2023-07-20 16:45", message: "Project: Deployed first full-stack app." },
        { timestamp: "2023-08-05 10:00", message: "Ongoing: Exploring advanced JS concepts." }
    ];

    let currentStepIndex = 0;

    function updateMissionLog() {
        const logEntries = document.getElementById('log-entries');
        
        if (currentStepIndex < missionSteps.length) {
            const step = missionSteps[currentStepIndex];
            const entry = document.createElement('div');
            entry.className = 'log-entry';
            entry.innerHTML = `<span class="timestamp">${step.timestamp}</span> <span class="message">${step.message}</span>`;
            logEntries.appendChild(entry);
            
            logEntries.scrollTop = logEntries.scrollHeight;
            
            currentStepIndex++;
            
            if (currentStepIndex < missionSteps.length) {
                setTimeout(updateMissionLog, 2500); // Reduced from 5000ms to 2500ms
            }
        }
    }

    function initializeMissionLog() {
        currentStepIndex = 0;
        const logEntries = document.getElementById('log-entries');
        if (logEntries) {
            logEntries.innerHTML = '';
            updateMissionLog();
        }
    }

    updateMissionLog();

    const missionMessages = [
        "Initializing system...",
        "Loading user interface...",
        "Establishing secure connection...",
        "Accessing data archives...",
        "Analyzing system performance...",
        "Optimizing resource allocation...",
        "Scanning for potential threats...",
        "Updating security protocols...",
        "Synchronizing with remote servers...",
        "Preparing mission briefing..."
    ];

    let currentMessageIndex = 0;

    function updateMissionLog() {
        const logEntry = document.getElementById('log-entry');
        const timestamp = new Date().toLocaleTimeString();
        const message = missionMessages[currentMessageIndex];
        
        logEntry.innerHTML = `<span class="timestamp">${timestamp}</span> ${message}`;
        
        currentMessageIndex = (currentMessageIndex + 1) % missionMessages.length;
    }

    // Initialize the mission log with the first message
    document.addEventListener('DOMContentLoaded', updateMissionLog);

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

    // Start the beams when the page loads
    leftBeam.style.animationPlayState = 'running';
    rightBeam.style.animationPlayState = 'running';

    // Optionally, you can stop the beams after a certain time
    setTimeout(() => {
        leftBeam.style.animationPlayState = 'paused';
        rightBeam.style.animationPlayState = 'paused';
    }, 5000); // Stop after 5 seconds

    function startBeams() {
        // Start the beams when a menu item or add button is clicked
        leftBeam.style.animationPlayState = 'running';
        rightBeam.style.animationPlayState = 'running';

        // Stop the beams after the animation completes
        setTimeout(() => {
            leftBeam.style.animationPlayState = 'paused';
            leftBeam.style.animation = 'none'; // Reset animation
            rightBeam.style.animationPlayState = 'paused';
            rightBeam.style.animation = 'none'; // Reset animation
        }, 2000); // Duration of the animation
    }

    // Add event listeners to all menu items
    navItems.forEach(item => {
        item.addEventListener('click', startBeams);
    });

    // Add event listener to the add window button
    addWindowBtn.addEventListener('click', startBeams);

    // Function to position windows in a circle
    function positionWindowsInCircle() {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const radius = 200; // Distance from the center

        windows.forEach((window, index) => {
            const angle = (index / windows.length) * (2 * Math.PI);
            const x = centerX + radius * Math.cos(angle) - 175; // 175 is half of 350 (window width)
            const y = centerY + radius * Math.sin(angle) - 175; // 175 is half of 350 (window height)
            window.style.left = `${x}px`;
            window.style.top = `${y}px`;
        });
    }

    // Call the function to position windows
    positionWindowsInCircle();
});
