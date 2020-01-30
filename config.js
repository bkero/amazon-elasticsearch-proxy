module.exports = {
  endpoint: process.env.ENDPOINT,
  region: process.env.REGION || "us-west-2",
  port: process.env.PORT || 9200,
  bindAddress: process.env.BINDADDRESS || "0.0.0.0",
  username: process.env.USERNAME,
  password: process.env.PASSWORD
};
