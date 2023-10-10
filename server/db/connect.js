import mongoose from "mongoose";

const connect = (url) => {
  return mongoose
    .connect(url)
    .then(() => console.log("DB Connected"))
    .catch((err) => console.log(err));
};

export default connect;
