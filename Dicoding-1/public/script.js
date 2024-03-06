/* landing page transition */

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry)
        if (entry.isIntersecting){
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    })
} )

const hiddenElements = document.querySelectorAll('.transition')
hiddenElements.forEach((el) => observer.observe(el));

/* dropdown category */

const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(dropdown => {
    const select = dropdown.querySelector('.select');
    const caret = dropdown.querySelector('.caret');
    const menu = dropdown.querySelector('.menu');
    const options = dropdown.querySelectorAll('.menu li');
    const selected = dropdown.querySelector('.selected');

    select.addEventListener('click', () => {
        select.classList.toggle('select-clicked');

        caret.classList.toggle('caret-rotate');

        menu.classList.toggle('menu-open');
    });

    options.forEach(option => {
        option.addEventListener('click', () => {
            const selectedOption = option.innerText;
            selected.innerText = selectedOption;

            select.classList.remove('select-clicked');

            caret.classList.remove('caret-rotate');

            menu.classList.remove('menu-open');

            options.forEach(option => {
                option.classList.remove('active');
            });

            option.classList.add('active');

            document.querySelectorAll('article').forEach(article => {
                article.classList.add('hidden');
            });

            document.getElementById(selectedOption.toLowerCase()).classList.remove('hidden');
        });
    });
});