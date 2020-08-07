import enigma from 'enigma.js'
import schema from 'enigma.js/schemas/12.170.2.json'

let config = {
  host: 'localhost', 
  isSecure: false,
  port: 4848, 
  prefix: '',
  appId: 'Consumer sales.qvf' 
}

const session = enigma.create({
  schema, 
  url: `ws${config.isSecure ? 's' : ''}://${config.host}:${config.port}/${
    config.prefix ? `${config.prefix}/` : ''
  }app/engineData`
}) 

export async function openSession() {
  try {
    const qix = await session.open()
    try {
      const doc = await qix.openDoc(config.appId)
      return doc
    } catch (error) {
      console.log('Unable to open Doc: ', error)
    }
  } catch (error) {
    console.log('Unable to open Session: ', error)
  }
}

export function closeSession() {
  session.close()
}
