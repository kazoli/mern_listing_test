export const errorHandler = (error: any): string => {
  switch (error.response.data.statusCode) {
    case 500:
      //show error on console
      console.log(
        // prettier-ignore
        (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) ||
        error.message ||
        error.toString()
      );
      return "Internal Server Error";
    default:
      return (
        // prettier-ignore
        (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) ||
        error.message ||
        error.toString()
      );
  }
};
