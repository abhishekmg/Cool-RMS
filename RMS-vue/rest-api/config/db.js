if(process.env.NODE_ENV === 'production'){
    module.exports = {mongoURI: 'mongodb://mg:mg1234@ds151523.mlab.com:51523/rms-db'}
  } else {
    module.exports = {mongoURI: 'mongodb://localhost/kitchen'}
  }