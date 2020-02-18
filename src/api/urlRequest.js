
const mode = process.env.NODE_ENV
let url = ''
if( mode === 'development' ) {
    url = 'http://localhost:5000'
}

export default url