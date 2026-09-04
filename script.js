const themeToggleBtn = document.getElementById('themeToggle');

themeToggleBtn.addEventListener('click', () => 
{
    document.body.classList.toggle('dark-mode');
});

// --------------------- document reader --------------
// get reader elements
const pageContainer = document.getElementById('pageContainer');
const docBtns = document.querySelectorAll(' .doc-btn');
const docViewer = document.getElementById('docViewer');
const closeBtn = document.getElementById('closeBtn');


//if any button is clicked, get the file path and set it as the source of the iframe, then show the page container
docBtns.forEach(btn => 
{
    btn.addEventListener('click', () =>
    {
        const filePath = btn.getAttribute('data-file');
        docViewer.src = filePath;

        pageContainer.classList.add('active');
    });
});


//if the close button is clicked, hide the page container and clear the iframe source
if (closeBtn)
{
    closeBtn.addEventListener('click', () =>
    {
        pageContainer.classList.remove('active');
        docViewer.src = '';
    });
}
