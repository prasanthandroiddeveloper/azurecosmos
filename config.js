const config = {
  endpoint: "https://azurecosmoskapturas.documents.azure.com:443/",
  key: "E6IHZTLqEf8eaIgqrweRDXRcQXHWinRIoCMaD7Gyqr854S5yxzXXgRu3Fo6M4gP94kKQgRPUHp9l7J5RQ5wuyg==",
  databaseId: "Tasks",
  containerId: "Items",
  partitionKey: { kind: "Hash", paths: ["/category"] },
};

module.exports = config;
