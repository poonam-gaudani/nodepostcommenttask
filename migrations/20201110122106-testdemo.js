module.exports = {
  async up(db, client) {
    const roles=[
      {
        role:'abcdeh',
        createdAt:new Date(),
        updatedAt:new Date(),
        __v : 0
      },
      {
        role:'pqrsdpk',
        createdAt:new Date(),
        updatedAt:new Date(),
        __v : 0
      },
      {
        role:'pqrsp',
        createdAt:new Date(),
        updatedAt:new Date(),
        __v : 0
      }
    ]
    await db.collection('roles').insertMany(roles);
  },
  async down(db, client) {
    await db.collection('roles').deleteMany({role:'abcdeh'},{role:'pqrsdpk'},{role:'pqrsp'});
  }
};
