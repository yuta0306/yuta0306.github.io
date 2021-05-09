var TOC = () => {
    const blogTitle = document.getElementsByTagName('h1')[0];
    const blogSection = document.getElementsByTagName('h2');
    const Toc = document.getElementById('TOC');
    let sectionDOM = ''
    for (element of blogSection) {
        sectionDOM += `<li>${element.textContent}</li>`
    };
    let htmlContent = `
    <div class="TOC__container">
        <h3 class="TOC__header">目次</h3>
        <ol class="TOC TOC--h1">
            <li>${blogTitle.textContent}</li>
            <ol class="TOC TOC--h2">
                ${sectionDOM}
            </ol>
        </ol>
    </div>
    `
    Toc.innerHTML = htmlContent;
}

window.addEventListener('mousewheel', e => {
    
})


window.addEventListener('load', e => {
    TOC();
})
TOC();
