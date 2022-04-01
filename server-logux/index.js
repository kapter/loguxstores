import { Server } from '@logux/server'

const server = new Server(
  Server.loadOptions(process, {
    subprotocol: '1.0.0',
    supports: '1.x',
    fileUrl: import.meta.url
  })
)
let counter=1;
server.auth(({ userId, token }) => {
  // Allow only local users until we will have a proper authentication
  return true;
})

server.channel('counter', {
  access (ctx) {
    // User can subscribe only to own data
    // return ctx.params.id === ctx.userId
    console.log(ctx.params);
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
    console.log('resend');
    return 'counter';
  },
  async process (ctx,action,meta) {
    // Don’t forget to keep action atomic
    console.log(action);
    console.log(counter);
    counter += 1;
    ctx.sendBack({ type: 'counter', value: counter });
  }
})

server.channel('point/:id', {
  access (ctx) {
    // User can subscribe only to own data
    // return ctx.params.id === ctx.userId
    console.log(ctx.params);
    console.log('channel');
    return true;
  },
  async load (ctx) {
    // Creating action to set user name and sending it to subscriber
    return { type: 'orders', orders: [{"id":1}]}
  }
})


server.type('orders_changed', {
  access () {
    return true
  },
  resend (ctx,action) {
    return 'point/'+action.pointId;
  },
  async process (ctx,action,meta) {

  }
})
server.listen()
