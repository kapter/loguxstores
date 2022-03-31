import { Server } from '@logux/server'

const server = new Server(
  Server.loadOptions(process, {
    subprotocol: '1.0.0',
    supports: '1.x',
    fileUrl: import.meta.url
  })
)
let counter=0;

server.auth(({ userId, token }) => {
  // Allow only local users until we will have a proper authentication
  return true;
})

server.channel('counter', {
  access (ctx) {
    // User can subscribe only to own data
    // return ctx.params.id === ctx.userId
    console.log('channel');
    return true;
  },
  async load (ctx) {
    // Creating action to set user name and sending it to subscriber
    return { type: 'counter', value: counter }
  }
})


server.type('INC', {
  access () {
    console.log('type');
    return true
  },
  resend () {
    return 'counter';
  },
  async process (ctx) {
    // Don’t forget to keep action atomic
    counter += 1;
    console.log(counter);
    ctx.sendBack({ type: 'counter', counter })
  }
})

server.listen()
