var TOC = () => {
    const windowWidth = window.innerWidth;
    const blog = document.getElementsByTagName('main')[0];
    let Toc;
    if (windowWidth > 1000) {
        Toc = document.getElementById('TOC');
    } else {
        Toc = document.getElementById('TOC__mobile');
    }
    Toc.classList.toggle('active');
    
    const blogTitle = blog.getElementsByTagName('h1')[0];
    const blogSection = blog.getElementsByTagName('h2');
    const blogMiniSection = blog.getElementsByTagName('h3');
    
    blogTitle.id = blogTitle.textContent;
    let sectionDOM = ''
    for (element of blogSection) {
        element.id = element.textContent;
        sectionDOM += `<li><a href="#${element.textContent}">${element.textContent}</a></li>`
    };
    let htmlContent = `
    <div class="TOC__container">
        <h3 class="TOC__header">目次</h3>
        <ol class="TOC TOC--h1">
            <li><a href="#${blogTitle.textContent}">${blogTitle.textContent}</a></li>
            <ol class="TOC TOC--h2">
                ${sectionDOM}
            </ol>
        </ol>
    </div>
    `
    Toc.innerHTML = htmlContent;
    Toc.style.padding = '.3rem'; 
    Toc.style.border = '3px dashed rgba(144, 144, 144, .6)';
}
var fixTOC = () => {
    const windowWidth = window.innerWidth;
    if (windowWidth > 1000) {
        const Toc = document.getElementById('TOC');
        Toc.style.position = 'fixed';
        Toc.style.bottom = `0`;
    }
}

window.addEventListener('load', e => {
    TOC();
    fixTOC();
})
TOC();
fixTOC();