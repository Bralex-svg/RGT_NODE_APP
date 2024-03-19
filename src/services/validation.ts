function validateData(schema: any, data: any): boolean {
    for (const key in schema) {
      if (schema.hasOwnProperty(key)) {
        if (schema[key].allowNull === false && data[key] == null) {
          return false;
        }
      }
    }
    return true;
  }

  export  {validateData};