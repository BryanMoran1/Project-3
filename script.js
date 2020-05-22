const loader = document.querySelector('.loader');
const script = document.querySelector('.script');

function init(){
    setTimeout(()=> {
        loader.style.opacity = 0;
        loader.style.display = 'none';

        script.style.display = 'block';
        script.style.opacity = 1;
    }, 2000);
}

init();

jQuery(document).ready(function ($) {
    function createBookListItem(book) {
        var $li = $('<li>');
        $li.addClass('list-group-item hover-invert cursor-pointer');
        $li.html(book.title);
        $li.data('bookId', book.id);
        return $li;
    }
    

    var request = axios.get('http://csc225.mockable.io/books');
    request.then(function (response) {
        response.data.forEach(function (book) {
            $('#book-list').prepend(createBookListItem(book));

        });
        $('.list-group-item').on('click', function () {
            $('.list-group-item').removeClass('active');
            var bookId = $(this).data('bookId');
            $(this).addClass('active');
            axios.get('http://csc225.mockable.io/books/' + bookId).then(function (response) {
                console.log(response.data.cover);
                var $img = $('<img>').attr('src', response.data.cover).attr('alt', response.data.title);
                $('#cover').html($img);
            });
        });
    });
    console.log('hello!');

});