// utils/serializeData.js

const serializeData = (data) => {
    if (!data || typeof data !== "object") return data;
  
    if (Array.isArray(data)) {
      return data.map(serializeData);
    }
  
    return Object.keys(data).reduce((result, key) => {
      const value = data[key];
  
      if (value instanceof Date) {
        result[key] = value.toISOString();
      } else if (value && typeof value === "object" && value._id) {
        result[key] = serializeData({ ...value, _id: value._id.toString() });
      } else {
        result[key] = serializeData(value);
      }
  
      return result;
    }, {});
  };
  
  export default serializeData;
  