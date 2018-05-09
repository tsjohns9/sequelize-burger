$(document).ready(function() {
  // sends new burger to the db
  $('#burger-submit').keyup(function(e) {
    // gets textarea value when enter is pressed
    if (e.keyCode === 13) {
      const burgerName = {
        name: $(this)
          .val()
          .trim()
      };
      $(this).val('');
      // adds a burger, or shows an error
      checkLength(burgerName);
    }
  });

  $(document).on('keyup', '.customer-submit', function(e) {
    // gets textarea value when enter is pressed
    if (e.keyCode === 13) {
      const updateById = {
        id: {
          id: $(this).attr('data-id')
        },
        devoured: { devoured: 1 },
        name: $(this)
          .val()
          .trim()
      };
      $(this).val('');
      // updateBurger(updateById);
    }
  });

  //************************************* */
  // when customer name is added
  // create row for new customer
  // update burger status to devoured
  // add foreign key to burger
  // render customer name to screen when page loads
  //************************************* */

  // used to set the burger to devoured. reloads the page to re-sync all items from the db.
  const updateBurger = input => {
    $.ajax('/api/burgers/' + input.id.id, { type: 'PUT', data: input }).then(() =>
      location.reload()
    );
  };

  // posts the burger to the db, and displays it
  const createBurger = value => {
    // removes error message if one exists on a valid post
    $('.alert-danger').remove();
    $.post('/api/burgers', value, function(data) {
      $('#burger-container').append(`
        <div class="item-container text-center text-white mx-auto w-100 mb-3 d-block">
          <div class="bg-primary padding rounded-top" data-id="${
            data.id
          }" data-burger_name="${value.name}" data-devoured="0">
            <p class="m-0">${data.id}. ${value.name}</p>
          </div>
          <textarea name="customer-name" class="submit-btn customer-submit rounded-bottom p-2" cols="0" rows="1" placeholder="Who's gonna eat it?"></textarea>
        </div>
      `);
    });
  };

  // checks if the length is valid. either creates a new burger or shows an alert.
  const checkLength = input =>
    input.name.length > 0 && input.name.length < 25 ? createBurger(input) : alert();

  // used for when an invalid length is entered
  const alert = () => {
    // removes error message if one exists. Otherwise it will append a new one each time
    $('.alert-danger').remove();
    $('#submit-btn').before(
      $(`
        <div class="alert alert-danger alert-dismissible mx-auto fade show" role="alert">
          Invalid burger name
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      `)
    );
  };
});
