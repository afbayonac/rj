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
      {resources: '/', permissions: ['GET']}
    ]
  }
]
