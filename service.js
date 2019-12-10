  function studentService() {
      async function getData() {
          return Promise.resolve('data');
      }

      async function getMoreData(data) {
          return Promise.resolve(data + 'more data');
      }

      async function getAll() {
          const data = await getData();
          const moreData = await getMoreData(data);
          return Promise(`All the data: ${data}, ${moreData}`);
      }
  }

  module.exports = studentService