function error (status, text) {
        let err = new Error(text);
        err.status = status;
        return err;
      }
      
module.exports = error;
      