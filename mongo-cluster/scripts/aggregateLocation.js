db.business.update(
  {},
  [
    {
      $set: {
        location: {
          type: "Point",
          coordinates: [
            "$longitude",
            "$latitude"
          ]
        }
      }
    },
    {
      $unset: [
        "longitude",
        "latitude"
      ]
    }
  ],
  { multi: true }
)

db.business.createIndex( { location : "2dsphere" } )