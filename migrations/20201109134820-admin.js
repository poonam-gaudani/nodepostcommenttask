module.exports = {
  async up(db, client) {
    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});
      const role=await db.collection('roles').findOne({role:'admin'});
      const user={
        role:role._id,
        name:'admin',
        email:'mehulpatel@gmail.com',
        password:'$2a$10$U.JIz8jtaejqKrJRmpq3NuzsyIHz.WxMLk42o6jLbkqsFa0alP6Fa',
        createdAt:new Date(),
        updatedAt:new Date(),
        __v : 0
      }
      await db.collection('user').insertOne(user);
  },

  async down(db, client) {
    await db.collection('user').deleteOne({email:'mehulpatel@gmail.com'})
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  }
};
