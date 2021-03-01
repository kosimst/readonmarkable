import callableFunction from '../../helpers/callable-functions'
import { Remarkable } from 'remarkable-typescript'
import * as functions from 'firebase-functions'

const registerDevice = callableFunction<'registerDevice'>(async (code) => {
  const client = new Remarkable()

  try {
    const token = await client.register({ code })

    return token
  } catch {
    throw new functions.https.HttpsError('invalid-argument', 'Invalid code')
  }
})

export default registerDevice
