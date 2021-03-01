import callableFunction from '../../helpers/callable-functions'
import { Remarkable } from 'remarkable-typescript'
import * as functions from 'firebase-functions'

const registerDevice = callableFunction<'registerDevice'>(async (code) => {
  const client = new Remarkable()

  try {
    const token = await client.register({
      code,
      deviceId: `readonmarkable-${Math.floor(
        Math.random() * 10000000000
      ).toString(16)}`,
    })

    return token
  } catch (e) {
    console.warn(e)
    throw new functions.https.HttpsError('invalid-argument', 'Invalid code')
  }
})

export default registerDevice
