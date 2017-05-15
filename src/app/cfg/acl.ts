export const aclist = [
  {
    roles: 'guest',
    allows: [
        {resources: '/users', permissions: ['POST']},
        {resources: '/users/verify', permissions: ['GET']},
        {resources: '/auth', permissions: ['POST']},
        {resources: '/auth/facebook', permissions: ['GET']},
        {resources: '/auth/facebook/callback', permissions: ['GET']}
    ]
  },
  {
    roles: 'user',
    allows: [
      {resources: '/', permissions: ['GET']},
      {resources: '/users/:idusers', permissions: ['POST', 'GET']},
      {resources: '/remates', permissions: ['GET']},
      {resources: '/remates/:idremates', permissions: ['GET']}
    ]
  },{
    roles: 'scraper',
    allows: [
      {resources: '/remates', permissions: ['POST']},
      {resources: '/remates/:idremates', permissions: ['POST']}
    ]
  }, {
    roles: 'admin',
    allows: []
  }
]

// dinamicId persimisos
// restringe el un recurso dado en funcion del Id usuario que hace la peticon
// contrario de aclist que deniega el ingreso check jwt ->_id param :usersid
// example: solo se puede actulizar a si msimo

export const rlcByUserId = [
  {
    roles: ['user', 'scraper'],
    deny: [
      { resources: '/users/:idusers', restrict: ['POST', 'GET']}
    ]
  }
]
