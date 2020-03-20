(function () {
    const doc = document.documentElement;

    doc.classList.remove('no-js');
    doc.classList.add('js');

    // Reveal animations
    if (document.body.classList.contains('has-animations')) {
        /* global ScrollReveal */
        const sr = window.sr = ScrollReveal();

        sr.reveal('.hero-title, .hero-paragraph, .hero-cta', {
            duration: 1000,
            distance: '40px',
            easing: 'cubic-bezier(0.5, -0.01, 0, 1.005)',
            origin: 'bottom',
            interval: 150
        });

        sr.reveal('.feature, .pricing-table', {
            duration: 600,
            distance: '40px',
            easing: 'cubic-bezier(0.5, -0.01, 0, 1.005)',
            interval: 100,
            origin: 'bottom',
            viewFactor: 0.5
        });

        sr.reveal('.feature-extended-image', {
            duration: 600,
            scale: 0.9,
            easing: 'cubic-bezier(0.5, -0.01, 0, 1.005)',
            viewFactor: 0.5
        });
    }
}());

$(function () {
    let $content = $('#content');
    const data = {
        rss_url: 'https://medium.com/feed/@aseymens'
    };
    $.get('https://api.rss2json.com/v1/api.json', data, function (response) {
        if (response.status === 'ok') {
            let output = '';
            $.each(response.items, function (k, item) {
                let temp = item.description.split('</figure>');
                output += temp[0] + '</figure>';
                output += '<h2 style="margin:16px 0px 16px"><a href="' + item.link + '" >' + item.title + '</h2></a>';
                output += temp[1];
                return k < 0;
            });
            $content.html(output);
        }
    });
});
