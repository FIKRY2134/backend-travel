module.exports = {
    success: (data, info = 'Request was successful') => {
      return {
        code: 0,
        info,
        data
      };
    },
    error: (info = 'Request failed', data = null) => {
      return {
        code: 1,
        info,
        data
      };
    }
  };
  