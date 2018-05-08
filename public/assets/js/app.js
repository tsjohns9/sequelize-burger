$(document).ready(function() {
  // sends new burger to the db
  $('#submit-btn').keyup(function(e) {
    // gets textarea value when enter is pressed
    if (e.keyCode === 13) {
      const name = {
        name: $('#submit-btn')
          .val()
          .trim()
      };
      $(this).val('');
      // adds a burger, or shows an error
      checkLength(name);
    }
  });

  // devoured btn click event
  $(document).on('click', '.devour-btn', function() {
    // creates an object to contain our id and devoured status. done this way to easily pass into the sql query
    const updateById = {
      id: { id: $(this).attr('data-id') },
      devoured: { devoured: 1 }
    };
    updateBurger(updateById);
  });

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
      <div class="btn btn-primary devour-btn mb-3 d-block" data-id="${
        data.id
      }" data-burger_name="${value.name}" data-devoured="0">
        <p>${data.id}. ${value.name}</p>
        <span class="badge badge-light p-2">Devour it</span>
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
