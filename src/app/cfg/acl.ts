export const aclist = [
  {
    roles: 'guest',
    allows: [
        {resources: '/auth', permissions: ['POST']},
        {resources: '/auth/facebook', permissions: ['GET']},
        {resources: '/auth/facebook/callback', permissions: ['GET']}
    ]
  },
  {
    roles: 'client',
    allows: [
      {resources: '/', permissions: ['GET']}
    ]
  }
]
