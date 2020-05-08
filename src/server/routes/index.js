const express = require('express');
const router = express.Router();

// const data = {
//   list0: {
//     endpoints: [
//       {
//         hrefid: 'endpoint-0-0',
//         method: 'GET',
//         address: '/api/genres',
//         shortdesc: 'Get the list of all genres',
//         parent: '#endpoint-list0', // empty string if dont want automatic toggle
//         playgroundvars: {
//           longdesc: 'Retrieve the list of all available genres.',
//           table: []
//         }
//       },
//       {
//         hrefid: 'endpoint-0-1',
//         method: 'POST',
//         address: '/api/genres',
//         shortdesc: 'Create a genre',
//         parent: '#endpoint-list0',
//         playgroundvars: {
//           longdesc: 'Create a genre. It requires just a name.',
//           table: [{name: 'Name', description: 'Name of the genre', type: 'text'}]
//         }
//       },
//       {
//         hrefid: 'endpoint-0-2',
//         method: 'PUT',
//         address: '/api/genres/:id',
//         shortdesc: 'Update a specific genre',
//         parent: '#endpoint-list0',
//         playgroundvars: {
//           longdesc: 'Update a specific genre. It requires the ID of the genre to update.',
//           table: [
//             {name: 'Id', description: 'ID of the genre to update', type: 'text'},
//             {name: 'Name', description: 'New name of the genre', type: 'text'}
//           ]
//         }
//       },
//       {
//         hrefid: 'endpoint-0-3',
//         method: 'DELETE',
//         address: '/api/genres/:id',
//         shortdesc: 'Delete a specific genre',
//         parent: '#endpoint-list0',
//         playgroundvars: {
//           longdesc: 'Delete a specific genre.',
//           table: [{name: 'Id', description: 'ID of the genre to delete', type: 'text'}]
//         }
//       },
//       {
//         hrefid: 'endpoint-0-4',
//         method: 'GET',
//         address: '/api/genres/:id',
//         shortdesc: 'Get a specific genre',
//         parent: '#endpoint-list0',
//         playgroundvars: {
//           longdesc: 'Retrieve a specific genre by ID.',
//           table: [{name: 'Id', description: 'ID of the genre to retrieve', type: 'text'}]
//         }
//       }
//     ]
//   },
//   list1: {
//     endpoints: [
//       {
//         hrefid: 'endpoint-1-0',
//         method: 'GET',
//         address: '/api/movies',
//         shortdesc: 'Get a list of all movies',
//         parent: '#endpoint-list1',
//         playgroundvars: {
//           longdesc: 'Retrieve the list of all movies in the database.',
//           table: []
//         }
//       },
//       {
//         hrefid: 'endpoint-1-1',
//         method: 'POST',
//         address: '/api/movies',
//         shortdesc: 'Create a movie',
//         parent: '#endpoint-list1',
//         playgroundvars: {
//           longdesc: 'Create a movie.',
//           table: [
//             {name: 'title', description: 'Title of the new movie', type: 'text'},
//             {name: 'genreId', description: 'ID of the genre for this movie', type: 'text'},
//             {name: 'numberInStock', description: 'Number in stock', type: 'text'},
//             {name: 'dailyRentalRate', description: 'Daily rental rate', type: 'text'}
//           ]
//         }
//       },
//       {
//         hrefid: 'endpoint-1-2',
//         method: 'PUT',
//         address: '/api/movies/:id',
//         shortdesc: 'Update a specific movie',
//         parent: '#endpoint-list1',
//         playgroundvars: {
//           longdesc: 'Update a specific movie.',
//           table: [
//             {name: 'Id', description: 'ID of the movie to update', type: 'text'},
//             {name: 'title', description: 'New title', type: 'text'},
//             {name: 'genreId', description: 'Id of the new genre', type: 'text'},
//             {name: 'numberInStock', description: 'New number in stock', type: 'text'},
//             {name: 'dailyRentalRate', description: 'New daily rental rate', type: 'text'}
//           ]
//         }
//       },
//       {
//         hrefid: 'endpoint-1-3',
//         method: 'DELETE',
//         address: '/api/movies/:id',
//         shortdesc: 'Delete a specific movie',
//         parent: '#endpoint-list1',
//         playgroundvars: {
//           longdesc: 'Delete a specific movie.',
//           table: [
//             {name: 'Id', description: 'ID of the movie to update', type: 'text'}
//           ]
//         }
//       },
//       {
//         hrefid: 'endpoint-1-4',
//         method: 'GET',
//         address: '/api/movies/:id',
//         shortdesc: 'Get a specific movie',
//         parent: '#endpoint-list1',
//         playgroundvars: {
//           longdesc: 'Retrieve a specific movie by ID.',
//           table: [
//             {name: 'Id', description: 'ID of the movie to update', type: 'text'}
//           ]
//         }
//       },
//     ]
//   },
//   list2: {
//     endpoints: [
//       {
//         hrefid: 'endpoint-2-0',
//         method: 'GET',
//         address: '/api/customers',
//         shortdesc: 'Get the list of all customers',
//         parent: '#endpoint-list2',
//         playgroundvars: {
//           longdesc: 'Retrieve the list of all customers.',
//           table: []
//         }
//       },
//       {
//         hrefid: 'endpoint-2-1',
//         method: 'POST',
//         address: '/api/customers',
//         shortdesc: 'Create a customer',
//         parent: '#endpoint-list2',
//         playgroundvars: {
//           longdesc: 'Create a new customer.',
//           table: [
//             {name: 'Name', description: 'Name of the new customer', type: 'text'},
//             {name: 'isGold', description: 'Tick if customer is a Gold customer', type: 'checkbox'},
//             {name: 'Phone', description: 'Telephone number of the customer', type: 'text'}
//           ]
//         }
//       },
//       {
//         hrefid: 'endpoint-2-2',
//         method: 'PUT',
//         address: '/api/customers/:id',
//         shortdesc: 'Update a specific customer',
//         parent: '#endpoint-list2',
//         playgroundvars: {
//           longdesc: 'Update a specific customer.',
//           table: [
//             {name: 'Id', description: 'Id of the customer to update', type: 'text'},
//             {name: 'Name', description: 'Name of the new customer', type: 'text'},
//             {name: 'isGold', description: 'Tick if customer is a Gold customer', type: 'checkbox'},
//             {name: 'Phone', description: 'Telephone number of the customer', type: 'text'}
//           ]
//         }
//       },
//       {
//         hrefid: 'endpoint-2-3',
//         method: 'DELETE',
//         address: '/api/customers/:id',
//         shortdesc: 'Delete a specific customer',
//         parent: '#endpoint-list2',
//         playgroundvars: {
//           longdesc: 'Delete a specific customer.',
//           table: [
//             {name: 'Id', description: 'Id of the customer to delete', type: 'text'}
//           ]
//         }
//       },
//       {
//         hrefid: 'endpoint-2-4',
//         method: 'GET',
//         address: '/api/customers/:id',
//         shortdesc: 'Retrieve a specific customer',
//         parent: '#endpoint-list2',
//         playgroundvars: {
//           longdesc: 'Retrieve a specific customer by ID.',
//           table: [
//             {name: 'Id', description: 'Id of the customer to retrieve', type: 'text'}
//           ]
//         }
//       }
//     ]
//   },
//   list3: {
//     endpoints: [
//       {
//         hrefid: 'endpoint-3-0',
//         method: 'GET',
//         address: '/api/rentals',
//         shortdesc: 'Get the list of all rentals',
//         parent: '#endpoint-list3',
//         playgroundvars: {
//           longdesc: 'Retrieve the list of all rentals.',
//           table: []
//         }
//       },
//       {
//         hrefid: 'endpoint-3-1',
//         method: 'POST',
//         address: '/api/rentals',
//         shortdesc: 'Create a rental',
//         parent: '#endpoint-list3',
//         playgroundvars: {
//           longdesc: 'Create a new rental. It requires IDs of the customer and the movie.',
//           table: [
//             {name: 'Customer Id', description: 'Id of the customer for this rental', type: 'text'},
//             {name: 'Movie Id', description: 'Id of the movie for this rental', type: 'text'}
//           ]
//         }
//       },
//       {
//         hrefid: 'endpoint-3-2',
//         method: 'GET',
//         address: '/api/rentals/:id',
//         shortdesc: 'Get a specific rental',
//         parent: '#endpoint-list3',
//         playgroundvars: {
//           longdesc: 'Retrieve a specific rental by ID.',
//           table: [
//             {name: 'Id', description: 'Id of the customer to retrieve', type: 'text'}
//           ]
//         }
//       }
//     ]
//   },
//   list4: {
//     endpoints: [
//       {
//         hrefid: 'endpoint-4-0',
//         method: 'POST',
//         address: '/api/returns',
//         shortdesc: 'Create a return',
//         parent: '#endpoint-list4',
//         playgroundvars: {
//           longdesc: 'Register the return of a video. It sets dateReturned and rentalFee on the actual rental. It requires the customerId and the movieId of the rental.',
//           table: [
//             {name: 'Customer Id', description: 'Id of the customer for the rental to return', type: 'text'},
//             {name: 'Movie Id', description: 'Id of the movie for the rental to return', type: 'text'}
//           ]
//         }
//       }
//     ]
//   },
//   list5: {
//     endpoints: [
//       {
//         hrefid: 'endpoint-5-0',
//         method: 'GET',
//         address: '/api/users/me',
//         shortdesc: 'Get the current user information.',
//         parent: '#endpoint-list5',
//         playgroundvars: {
//           longdesc: 'Retrieve information of the current user.',
//           table: []
//         }
//       },
//       {
//         hrefid: 'endpoint-5-1',
//         method: 'POST',
//         address: '/api/users',
//         shortdesc: 'Create a new user',
//         parent: '#endpoint-list5',
//         playgroundvars: {
//           longdesc: 'Create a new user. It requires name, email and password.',
//           table: [
//             {name: 'Name', description: 'Name of the new user', type: 'text'},
//             {name: 'Email', description: 'Email of the new user', type: 'text'},
//             {name: 'Password', description: 'Password of the new user', type: 'password'}
//           ]
//         }
//       }
//     ]
//   }
// };

// router.get('/', (req, res) => {
//   res.render('index', data);
// });
router.get('/', (req, res) => {
  res.sendFile(__dirname + '../../public/index.html');
});


module.exports = router;
