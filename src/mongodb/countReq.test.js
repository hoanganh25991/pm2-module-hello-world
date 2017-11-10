import countReq from "./countReq"
const _ = console.log

const wait = countReq()
wait.then(total => _(total))
