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

      // adds a burger, or shows an error
      checkLength(name);
      $(this).val('');
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

  // used to set the burger to devoured in the db. reloads the page to re-sync all items from the db.
  function updateBurger(input) {
    // Send the PUT request.
    $.ajax('/api/burgers/' + input.id.id, { type: 'PUT', data: input }).then(function() {
      // Reload the page to get the updated list
      location.reload();
    });
  }

  // posts the burger to the db, and displays it
  function createBurger(value) {
    $.post('/api/burgers', value, function(data) {
      $('#burger-container').append(`
      <div class="btn btn-primary devour-btn mb-3 d-block" data-id="${
        data.id
      }" data-burger_name="${value.name}" data-devoured="0">
        <p>${data.id}. ${value.name} <span class="badge badge-light">Devour it</span></p>
      </div> 
      `);
    });
  }

  // checks if the length is valid. either creates a new burger or shows an alert.
  function checkLength(input) {
    return input.name.length < 25 ? createBurger(input) : alert();
  }

  // used for when an invalid length is entered
  function alert() {
    $('.alert-danger').remove();
    $('#submit-btn').before(
      $(`
      <div class="alert alert-danger alert-dismissible mx-auto fade show" role="alert">
        Burger name is too long
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    `)
    );
  }
});
