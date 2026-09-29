//file organization
const portfolioData = {

    about: {
        title: "about",
        name: "robert clay grubbs",
        headline: "game scholar and artist",
        bio: "i study video games and make art and think a lot about thinking",
        avatar: "images/profile.jpg"
    },

    writing: {
        title: "writing",
        overview: "my academic work is typically concerned with formal aspects of narrative regardless of the medium, whilst my public facing work has a bit more variation",
        subsections: {
            academic: [
                { name: "FEZ", fullName: "Double-Binds and Anamorphism in FEZ's Reorientation", type: "pdf", url: "essays/Fez.pdf" },
                { name: "K0", fullName: "Iterative Hermeneutics in Katana ZERO", type: "pdf", url: "essays/K0.pdf" }
            ],
            public: [
                { name: "Seeing", fullName: "Seeing the Body in the World", type: "link", url: "https://tanner.utah.edu/news/seeing-the-body-in-the-world-environmental-storytelling-symposium/" },
                { name: "Backpack", fullName: "An Ode to the Everyday Backpack", type: "link", url: "https://www.deseret.com/education/2024/09/05/ode-to-backpacks/" },
                { name: "Dams", fullName: "Water Works", type: "link", url: "https://www.deseret.com/magazine/2024/06/15/water-works/" },
                { name: "Thunderstruck", fullName: "An Ode to Night Games", type: "link", url: "https://www.deseret.com/magazine/2024/07/15/ode-to-night-games/" },
                { name: "Games", fullName: "The Case for Video Games as Literature", type: "link", url: "https://www.deseret.com/2023/12/14/23963033/video-gaming-literature/" }
            ]
        }
    },

    art: {
        title: "art",
        overview: "my paintings and drawings typically rely on fluid based materials, such as sumi-ink and acrylics, whilst my sculpture is constructed with wire and trickline",
        subsections: {
            visual: [
                { name: "bloom", type: "image", url: "images/visual/bloom.jpg" },
                { name: "pianola", type: "image", url: "images/visual/pianola.jpg" },
                { name: "arcs", type: "image", url: "images/visual/arcs.jpg" },
                { name: "aggregates", type: "image", url: "images/visual/aggregates.jpg" },
                { name: "crossed", type: "image", url: "images/visual/crossed.jpg" },
                { name: "fantasy", type: "image", url: "images/visual/fantasy.jpg" },
                { name: "watchers", type: "image", url: "images/visual/watchers.jpg" },
                { name: "proliferation", type: "image", url: "images/visual/proliferation.jpg" },
                { name: "guidance", type: "image", url: "images/visual/guidance.jpg" },
                { name: "swarm", type: "image", url: "images/visual/swarm.jpg" },
                { name: "tension", type: "image", url: "images/visual/tension.jpg" },
                { name: "phosphors", type: "image", url: "images/visual/phosphors.jpg" },
                { name: "noise", type: "image", url: "images/visual/noise.jpg" },
                { name: "daydreaming", type: "image", url: "images/visual/daydreaming.jpg" }
            ],
            sculpture: [
                { name: "to have", type: "image", url: "images/sculpture/to have.jpg" },
                { name: "complementary", type: "image", url: "images/sculpture/complementary.jpg" }
            ]
        }
    },

    games: {
        title: "games",
        overview: "my game-like projects are typically short rule based or non-linear narrative focused experiments",
        subsections: {
            browser: [
                { name: "compulsions", type: "game", url: "games/how to talk to god/index.html" }
            ],
            download: [
                //just some empty placeholders sorry :(
                { name: "FEZ", type: "pdf", url: "essays/Fez.pdf" },
                { name: "K0", type: "pdf", url: "essays/K0.pdf" }
            ]
        }
    }
};

//current navigation or state vars
let currentCategory = "about";
let currentSubsection = "";
let currentItemIndex = 0;
let isFileOpen = false;

//grab items from the html doc
const mainCategorySelect = document.getElementById('mainCategorySelect');
const mainTitle = document.getElementById('mainTitle');
const subsectionTabs = document.getElementById('subsectionTabs');
const itemSelect = document.getElementById('itemSelect');
const contentDisplay = document.getElementById('contentDisplay');

const cardBorderBottom = document.querySelector('.card-border-bottom');

//functions

//grabs data for and injects the buttons at the top of the central display card
function renderSubsections() {
    //wipe out old optiosn
    subsectionTabs.innerHTML = '';

    //get the object of current menu
    const categoryObj = portfolioData[currentCategory];

    //check to see if there's anything to render and if not return
    if (!categoryObj.subsections) {
        subsectionTabs.style.display = 'none';
        return;
    }

    //otherwise, set subsection tabs visible
    subsectionTabs.style.display = 'flex';

    //get a list of all the arrays inside a subsection
    const subsectionKeys = Object.keys(categoryObj.subsections);

    subsectionKeys.forEach(key => {

        //build a button for each subsection
        const btn = document.createElement('button');

        //if its current subsection then set it active
        btn.className = `sub-tab-btn ${key === currentSubsection ? 'active' : ''}`;

        //set the button text context to the key names
        btn.textContent = key;

        //check for button click
        btn.addEventListener('click', () => {
            //set new subsection to key

            if (key === "download") {
                window.open("https://konjoue.itch.io/", "_blank");
                return;
            }

            currentSubsection = key;

            if (key === "academic" || key === "public") {
                isFileOpen = false;
            }
            else {
                isFileOpen = true;
            }
            //reset display item
            currentItemIndex = 0;
            //rerender
            renderSubsections();
            //rerender bottom display menu
            renderBottomDropdown();
        });

        //injects buttons into html
        subsectionTabs.appendChild(btn);
    });
}

function renderBottomDropdown() {
    //wipe
    itemSelect.innerHTML = '';

    //get the object of current menu
    const categoryObj = portfolioData[currentCategory];

    //check to see if there's anything to render and if not return
    if (!categoryObj.subsections || currentSubsection === "" || !isFileOpen) {
        cardBorderBottom.style.display = 'none';
        renderEmbed(); //render about page directly
        return;
    }

    //otherwise make visible
    cardBorderBottom.style.display = 'flex';

    //check out the array of items for current subsection
    const items = portfolioData[currentCategory].subsections[currentSubsection];

    //safety check in case subsections lacks items array
    if (!items) {
        renderEmbed();
        return;
    }

    //loop through items, set vals and inject into html
    //pulling weird errors here some times when subsection is changed, likely due to a lack of selected item
    items.forEach((item, index) => {
        const option = document.createElement('option');
        option.textContent = item.name;
        option.value = index;

        itemSelect.appendChild(option);
    });

    //make sure the dropdown has the correct value
    itemSelect.value = currentItemIndex;

    //now load the files
    renderEmbed();
}

//render the central item
function renderEmbed() {
    //wipe
    contentDisplay.innerHTML = '';

    const categoryObj = portfolioData[currentCategory];

    //special case for about me page
    if (currentCategory === 'about') {
        //create display card for about information
        const aboutCard = document.createElement('div');
        aboutCard.className = 'about-card-content';

        //modify the exact info
        aboutCard.innerHTML = `
             <div class="about-container">
                ${categoryObj.avatar ? `<img src="${categoryObj.avatar}" alt="Profile" class="profile-pic">` : ''}
                <h2>${categoryObj.name}</h2>
                <p class="headline"><strong>${categoryObj.headline}</strong></p>
                <p class="bio">${categoryObj.bio}</p>
            </div>
        `;
        //add to display
        contentDisplay.appendChild(aboutCard);
        return;
    }

    if (currentSubsection != "") {

        //get the right item if not about page
        const items = portfolioData[currentCategory].subsections?.[currentSubsection];

        //if need mini-directory, open it
        if (!isFileOpen)
        {
            const listContainer = document.createElement('div');
            listContainer.className = 'item-list';

            items.forEach((item, index) => {
                const link = document.createElement('button');
                link.className = 'list-item-btn';
                link.textContent = item.fullName || item.name; 

                link.onclick = () => {
                    if (item.type === "link") {
                        window.open(item.url, '_blank');
                    }
                    else {
                        currentItemIndex = index;
                        isFileOpen = true;
                        renderBottomDropdown();
                    }
                };
                listContainer.appendChild(link);
            });
            contentDisplay.appendChild(listContainer);
            return;
        }


        const item = items[currentItemIndex];

        //safety so if item doesn't exist, the function doesn't run!
        if (!item) return;

        //if statements to check item type
        if (item.type === "image") {
            const img = document.createElement('img');
            img.src = item.url; //img source path
            contentDisplay.appendChild(img); //inject
        }
        else if (item.type === "pdf") {
            const iframe = document.createElement('iframe');
            iframe.src = item.url;
            contentDisplay.appendChild(iframe);
        }
        else if (item.type === "game") {
            const frame = document.createElement('iframe');
            frame.src = item.url;

            frame.style.width = "100%";
            frame.style.height = "100%";
            frame.style.border = "none";
            
            iframe.style.overflow = 'hidden';
            iframe.setAttribute('scrolling', 'no');

            contentDisplay.appendChild(frame);
        }
    }
    else if (currentCategory != "about") {
        const overviewDiv = document.createElement('div');
        overviewDiv.className = 'overview-content';
        overviewDiv.innerHTML = `<p>${categoryObj.overview}</p>`;
        contentDisplay.appendChild(overviewDiv);
    }
}

function setupNavigation(dropdownId, prevBtnId, nextBtnId) {
    const select = document.getElementById(dropdownId);
    const prevBtn = document.getElementById(prevBtnId);
    const nextBtn = document.getElementById(nextBtnId);

    const shiftSelection = (offset) => {
        let newIndex = select.selectedIndex + offset;

        if (newIndex < 0)
        {
            newIndex = select.options.length - 1;
        }
        else if (newIndex >= select.options.length)
        {
            newIndex = 0;
        } 

        select.selectedIndex = newIndex;
        select.dispatchEvent(new Event('change'));
    }


    prevBtn.addEventListener('click', () => shiftSelection(-1));
    nextBtn.addEventListener('click', () => shiftSelection(1));

};

//event listeners and interactiom

//change based on main category movement
mainCategorySelect.addEventListener('change', (e) => {
    
    //e.target.value gets the string of the box just clicked
    currentCategory = e.target.value;

    //reset subsection for correct indexing
    const categoryObj = portfolioData[currentCategory];
    currentSubsection = "";
    currentItemIndex = 0;

    isFileOpen = false;

    mainTitle.textContent = portfolioData[currentCategory].title;

    renderSubsections();
    renderBottomDropdown();

});

//checking bottom drop down
itemSelect.addEventListener('change', (e) => {

    //the values of these are ints pushed manually to from renderfunction
    currentItemIndex = parseInt(e.target.value);

    //change embed if dropdown is modified
    renderEmbed();
});

//init
renderSubsections();
renderBottomDropdown();

setupNavigation('mainCategorySelect', 'prevBtnTop', 'nextBtnTop');
setupNavigation('itemSelect', 'prevBtnBot', 'nextBtnBot');