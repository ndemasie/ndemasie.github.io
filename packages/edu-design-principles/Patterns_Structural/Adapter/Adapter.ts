type ResponseData = {
  name: string
  vorname: string
}[]

class UserApi {
  fetch(id?: string): ResponseData {
    const data = [{ vorname: 'Max', name: 'Munster' }] // db call
    return data
  }
}

export class Adapter extends UserApi {
  fetch(id?: string): ResponseData {
    //              Database has migrated and renamed fields
    const data = [{ firstname: 'Max', lastname: 'Munster' }] // db call

    const legacyFormat = data.map((_) => ({
      name: _.lastname,
      vorname: _.lastname,
    }))

    return legacyFormat
  }
}
