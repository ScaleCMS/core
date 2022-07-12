import './config/module-alias'
import { app } from '@/main/config/app'
import { env } from '@/main/config/env'

import mongoose from 'mongoose'

mongoose.connect(env.database.url, { dbName: env.database.name })
  .then(() => app.listen(env.port, () => console.log(`Server running at http://localhost:${env.port}`)))
  .catch(console.error)
