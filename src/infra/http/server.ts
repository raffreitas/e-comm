import { app } from './app'
;(async () => {
  await app.ready()
  app
    .listen({
      port: 3000,
    })
    .then(() => {
      console.log(`🚀 Server is running on http://localhost:3000`)
    })
    .catch(() => {
      console.log(`❌ Server failed to start`)
    })
})()
