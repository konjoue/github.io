//file organization
const portfolioData = {
    writing: {
        title: "writing",
        subsections: {
            published: [
                { name: "FEZ", type: "pdf", url: "essays/Fez.pdf" },
                { name: "K0", type: "pdf", url: "essays/K0.pdf" }
            ],
            unpublished: [
                { name: "FEZ", type: "pdf", url: "essays/Fez.pdf" },
                { name: "K0", type: "pdf", url: "essays/K0.pdf" }
            ]
        }
    },

    art: {
        title: "art",
        subsections: {
            paintingDrawing: [
                { name: "FEZ", type: "pdf", url: "essays/Fez.pdf" },
                { name: "K0", type: "pdf", url: "essays/K0.pdf" }
            ]
            sculpture [
                { name: "FEZ", type: "pdf", url: "essays/Fez.pdf" },
                { name: "K0", type: "pdf", url: "essays/K0.pdf" }
            ]
        }
    },

    games: {
        title: "games",
        subsections: {
            browser: [
                { name: "FEZ", type: "pdf", url: "essays/Fez.pdf" },
                { name: "K0", type: "pdf", url: "essays/K0.pdf" }
            ]
            download [
                { name: "FEZ", type: "pdf", url: "essays/Fez.pdf" },
                { name: "K0", type: "pdf", url: "essays/K0.pdf" }
            ]
        }
    }
};

//current navigation or state vars
let currentCategory = "writing";
let currentSubsection = "published";
let currentItemIndex = 0;

//grab items from the html doc
const mainCategorySelect = document.getElementsById('mainCategorySelect');
const mainTitle = document.getElementsById('mainTitle');
const subsectionTabs = document.getElementsById('subsectionTabs');
const itemSelect = document.getElementsById('itemSelect');
const contentDisplay = document.getElementsById('contentDisplay');

//functions

//grabs data for and injects the buttons at the top of the central display card
function renderSubsections() {
    //wipe out old optiosn
    subsectionTabs.innerHTML = '';

    //get the object of current menu
    const categoryObj = portfolioData[currentCategory];

    //get a list of all the arrays inside a subsection
    const subsectionKeys = Object.keys(categoryObj.subsections);

    subsectionKeys.forEach(key => {

        //build a button for each subsection
        const btn = document.createElement('button');

        //if its current subsection then set it active
        btn.className = 'sub-tab-btn ${key === currentSubsection ? 'active' : ''}';

        //set the button text context to the key names
        btn.textContent = key;

        //check for button click
        btn.addEventListener('click', () => {
            //set new subsection to key
            currentSubsection = key;

            console.log("2. Tab Clicked! New Subsection is:", currentSubsection);

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

    //check out the array of items for current subsection
    const items = portfolioData[currentCategory].subsections[currentSubsection];

    //loop through items, set vals and inject into html
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

    //get the right item
    const items = portfolioData[currentCategory].subsections[currentSubsection];
    const item = items[currentItemIndex];

    console.log("3. Attempting to render item:", item);

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
    else if (item.type === "link") {
        const link = document.createElement('a');
        link.href = item.url;
        link.target = "_blank"; //opens a new tab
        link.textContent = 'click to read ${item.name} ↗'
        contentDisplay.appendChild(link);
    }
}

//event listeners and interactiom

//change based on main category movement
mainCategorySelect.addEventListener('change', (e) => {
    
    //e.target.value gets the string of the box just clicked
    currentCategory = e.target.value;

    console.log("1. Top Dropdown Changed! New Category is:", currentCategory);

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